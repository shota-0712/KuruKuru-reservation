import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 環境変数
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const APP_URL = process.env.VITE_APP_URL || "http://localhost:3000";
const STRIPE_PRICE_SETUP = process.env.STRIPE_PRICE_SETUP || "";

// Stripe価格ID（Stripeダッシュボードで作成後に設定）
const STRIPE_PRICES: Record<string, string> = {
  standard: process.env.STRIPE_PRICE_STANDARD || "",
  business: process.env.STRIPE_PRICE_BUSINESS || "",
  pro: process.env.STRIPE_PRICE_PRO || "",
};

// Stripeクライアント
const stripe = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY) : null;

// Supabaseクライアント（サーバーサイド用）
const supabase =
  SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
    ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
    : null;

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Webhook用のraw body parser（他のルートより先に設定）
  app.post(
    "/api/stripe/webhook",
    express.raw({ type: "application/json" }),
    async (req, res) => {
      if (!stripe || !supabase) {
        return res.status(500).json({ error: "Stripe or Supabase not configured" });
      }

      const sig = req.headers["stripe-signature"] as string;
      let event: Stripe.Event;

      try {
        event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET);
      } catch (err) {
        console.error("Webhook signature verification failed:", err);
        return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
      }

      // イベント処理
      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object as Stripe.Checkout.Session;
          const userId = session.metadata?.userId;
          const planId = session.metadata?.planId;
          const customerId = session.customer as string;
          const setupFeePaid = session.metadata?.setupFee === "true";

          if (userId && planId) {
            const updates: Record<string, string | boolean> = {
              stripe_customer_id: customerId,
              subscription_status: "active",
              subscription_plan: planId,
              updated_at: new Date().toISOString(),
            };

            if (setupFeePaid) {
              updates.setup_fee_paid = true;
            }

            await supabase
              .from("profiles")
              .update(updates)
              .eq("id", userId);
          }
          break;
        }

        case "customer.subscription.updated": {
          const subscription = event.data.object as Stripe.Subscription;
          const customerId = subscription.customer as string;
          
          // subscription statusをマッピング
          let status: "active" | "canceled" | "past_due" | "none" = "none";
          if (subscription.status === "active") status = "active";
          else if (subscription.status === "canceled") status = "canceled";
          else if (subscription.status === "past_due") status = "past_due";

          await supabase
            .from("profiles")
            .update({
              subscription_status: status,
              updated_at: new Date().toISOString(),
            })
            .eq("stripe_customer_id", customerId);
          break;
        }

        case "customer.subscription.deleted": {
          const subscription = event.data.object as Stripe.Subscription;
          const customerId = subscription.customer as string;

          await supabase
            .from("profiles")
            .update({
              subscription_status: "canceled",
              updated_at: new Date().toISOString(),
            })
            .eq("stripe_customer_id", customerId);
          break;
        }
      }

      res.json({ received: true });
    }
  );

  // JSON body parser（他のAPIルート用）
  app.use(express.json());

  // Stripeチェックアウトセッション作成
  app.post("/api/stripe/create-checkout-session", async (req, res) => {
    if (!stripe || !supabase) {
      return res.status(500).json({ error: "Stripe or Supabase not configured" });
    }

    const { planId, userId } = req.body;

    if (!planId || !STRIPE_PRICES[planId]) {
      return res.status(400).json({ error: "Invalid plan" });
    }

    if (!userId) {
      return res.status(400).json({ error: "User ID required" });
    }

    try {
      // ユーザー情報を取得
      const { data: profile } = await supabase
        .from("profiles")
        .select("email, stripe_customer_id, setup_fee_paid")
        .eq("id", userId)
        .single();

      let customerId = profile?.stripe_customer_id;

      // Stripeカスタマーがなければ作成
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: profile?.email,
          metadata: { userId },
        });
        customerId = customer.id;
      }

      const shouldChargeSetup = Boolean(STRIPE_PRICE_SETUP) && !profile?.setup_fee_paid;
      const lineItems = [
        {
          price: STRIPE_PRICES[planId],
          quantity: 1,
        },
      ];

      if (shouldChargeSetup) {
        lineItems.push({
          price: STRIPE_PRICE_SETUP,
          quantity: 1,
        });
      }

      // チェックアウトセッション作成
      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "subscription",
        success_url: `${APP_URL}/mypage?success=true`,
        cancel_url: `${APP_URL}/mypage?canceled=true`,
        metadata: {
          userId,
          planId,
          setupFee: shouldChargeSetup ? "true" : "false",
        },
      });

      res.json({ url: session.url });
    } catch (err) {
      console.error("Error creating checkout session:", err);
      res.status(500).json({ error: "Failed to create checkout session" });
    }
  });

  // Stripeカスタマーポータルセッション作成
  app.post("/api/stripe/create-portal-session", async (req, res) => {
    if (!stripe || !supabase) {
      return res.status(500).json({ error: "Stripe or Supabase not configured" });
    }

    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID required" });
    }

    try {
      // ユーザーのStripe顧客IDを取得
      const { data: profile } = await supabase
        .from("profiles")
        .select("stripe_customer_id")
        .eq("id", userId)
        .single();

      if (!profile?.stripe_customer_id) {
        return res.status(400).json({ error: "No Stripe customer found" });
      }

      // ポータルセッション作成
      const session = await stripe.billingPortal.sessions.create({
        customer: profile.stripe_customer_id,
        return_url: `${APP_URL}/mypage`,
      });

      res.json({ url: session.url });
    } catch (err) {
      console.error("Error creating portal session:", err);
      res.status(500).json({ error: "Failed to create portal session" });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
