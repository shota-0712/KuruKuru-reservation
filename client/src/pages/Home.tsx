/**
 * KuruKuru Landing Page
 * Design Philosophy: Warm Professional
 * - Human-centered design with warmth and trust
 * - Card-based layout with elevation changes
 * - KuruKuru Green (#00B96B) as primary
 * - Coral Orange for CTAs
 * - Mobile-first responsive design
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  MessageCircle,
  Smartphone,
  Users,
  Clock,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Star,
  Menu,
  X,
  PhoneCall,
  FileText,
  Globe,
  Workflow,
  Zap,
  ArrowDown
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1
  }
};

// Section wrapper with animation
function AnimatedSection({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// Header Component - Mobile optimized
function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          {/* Logo - Using actual KuruKuru logo */}
          <a href="#" className="flex items-center gap-1.5 sm:gap-2">
            <img
              src="/images/kurukuru-logo.png"
              alt="KuruKuru"
              className="h-14 sm:h-16 md:h-20 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <a href="#features" className="text-sm lg:text-base text-muted-foreground hover:text-foreground transition-colors">機能</a>
            <a href="#pricing" className="text-sm lg:text-base text-muted-foreground hover:text-foreground transition-colors">料金</a>
            <a href="#testimonials" className="text-sm lg:text-base text-muted-foreground hover:text-foreground transition-colors">導入事例</a>
            <a href="#faq" className="text-sm lg:text-base text-muted-foreground hover:text-foreground transition-colors">よくある質問</a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="glow-btn text-sm lg:text-base px-4 lg:px-6 py-2 rounded-lg font-semibold text-white cursor-pointer relative z-10">
              無料で相談する
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="メニュー"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 border-t bg-white"
          >
            <nav className="flex flex-col gap-1">
              <a href="#features" className="text-foreground py-3 px-2 hover:bg-secondary/50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>機能</a>
              <a href="#pricing" className="text-foreground py-3 px-2 hover:bg-secondary/50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>料金</a>
              <a href="#testimonials" className="text-foreground py-3 px-2 hover:bg-secondary/50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>導入事例</a>
              <a href="#faq" className="text-foreground py-3 px-2 hover:bg-secondary/50 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>よくある質問</a>
              <Button className="glow-btn w-full mt-3 font-semibold text-white rounded-lg cursor-pointer relative z-10">無料で相談する</Button>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
}

// Hero Section - High Impact Redesign with Split Layout
function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white/50 z-10" />
        <img
          src="/images/hero-salon-new.jpg"
          alt=""
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 grid-bg opacity-30 z-0" />

        {/* Animated Blobs */}
        <div className="floating-blob floating-blob-1 opacity-40 mix-blend-multiply" />
        <div className="floating-blob floating-blob-2 opacity-40 mix-blend-multiply" />
        <div className="floating-blob floating-blob-3 opacity-40 mix-blend-multiply" />
      </div>

      <div className="container relative z-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Column: Text Content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {/* Badge */}
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm sm:text-base mb-6 sm:mb-8 border border-primary/20">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
                スマホ完結！接客業のための予約システム
              </motion.div>

              {/* Main Headline */}
              <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight mb-6 text-foreground leading-[1.15]">
                <span className="block text-foreground">KuruKuru</span>
                <span className="animated-gradient-text drop-shadow-sm">LINE予約システム</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p variants={fadeInUp} className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-10 leading-relaxed font-medium">
                サロン・ジム・治療院など、あらゆる店舗ビジネスに。<br className="hidden lg:block" />
                <span className="text-foreground font-bold">月額1,980円</span>から始める、最もシンプルなDX。
              </motion.p>

              {/* CTA Buttons */}
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10 sm:mb-12">
                <Button className="glow-btn text-lg px-8 py-7 rounded-2xl font-bold text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
                  無料で相談する
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
                <Button variant="outline" className="text-lg px-8 py-7 rounded-2xl font-bold border-2 bg-white/50 backdrop-blur-sm hover:bg-white transition-all">
                  機能を見る
                </Button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 sm:gap-6 justify-center lg:justify-start text-sm sm:text-base font-medium text-muted-foreground">
                <div className="flex items-center gap-2 bg-white/60 backdrop-blur px-3 py-1.5 rounded-lg border border-border/50">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>初期費用0円</span>
                </div>
                <div className="flex items-center gap-2 bg-white/60 backdrop-blur px-3 py-1.5 rounded-lg border border-border/50">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>チャット機能込み</span>
                </div>
                <div className="flex items-center gap-2 bg-white/60 backdrop-blur px-3 py-1.5 rounded-lg border border-border/50">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>最短即日導入</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Phone Mockup */}
          <div className="flex-1 w-full max-w-[260px] sm:max-w-[320px] lg:max-w-[420px] mx-auto">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative z-10 perspective-1000"
            >
              <div className="relative transform rotate-y-[-10deg] hover:rotate-y-0 transition-transform duration-700 ease-out">
                {/* Glow behind phone */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary/30 to-blue-500/30 rounded-full blur-3xl opacity-60 animate-pulse" />

                {/* Phone Frame */}
                <div className="relative bg-gray-900 rounded-[2.5rem] border-[8px] border-gray-900 shadow-2xl overflow-hidden ring-1 ring-white/20">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-xl z-20" />
                  <img
                    src="/images/screenshots/IMG_2951.png"
                    alt="KuruKuru App Interface"
                    className="w-full h-auto bg-white"
                  />

                  {/* Reflection gradient */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none z-10 mix-blend-overlay" />
                </div>

                {/* Floating Notification - Left */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute -left-6 sm:-left-12 bottom-32 sm:bottom-40 z-30"
                >
                  <Card className="glass-card border-0 shadow-lg !bg-white/90">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                          <MessageCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-xs font-bold">予約が入りました</p>
                          <p className="text-[10px] text-muted-foreground">現在 14:00〜 カット</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Floating Notification - Right */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="absolute -right-4 sm:-right-8 top-20 z-30"
                >
                  <Card className="glass-card border-0 shadow-lg !bg-white/90">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs font-bold">カレンダー連携済</p>
                          <p className="text-[10px] text-muted-foreground">自動で同期しました</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Problem Section - Visual Cards Layout
function ProblemSection() {
  const problems = [
    {
      icon: MessageCircle,
      title: "LINE返信が追いつかない",
      description: "施術中や営業時間外の問い合わせ対応で、プライベートな時間が削られてしまう...",
      color: "text-rose-500",
      bg: "bg-rose-500/10"
    },
    {
      icon: Calendar,
      title: "予約管理が複雑",
      description: "紙台帳、他社サイト、LINE... 複数の場所で管理していてダブルブッキングが心配。",
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    },
    {
      icon: PhoneCall,
      title: "電話対応で作業中断",
      description: "施術や接客の最中に電話が鳴ると、目の前のお客様に集中できない。",
      color: "text-orange-500",
      bg: "bg-orange-500/10"
    }
  ];

  return (
    <AnimatedSection className="py-20 sm:py-28 bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl opacity-50" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl opacity-50" />
      </div>

      <div className="container relative z-10">
        <motion.div variants={fadeInUp} className="text-center mb-12 sm:mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-secondary text-muted-foreground text-xs sm:text-sm font-medium mb-4">
            Current Challenges
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            こんな<span className="text-rose-500 relative inline-block">
              お悩み
              <svg className="absolute w-full h-2 -bottom-1 left-0 text-rose-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span>
            ありませんか？
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            日々の業務に追われて、本来集中すべき「接客」や「施術」の時間が奪われていませんか？
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-border/50 relative overflow-hidden group"
            >
              <div className={`w-14 h-14 rounded-2xl ${problem.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <problem.icon className={`w-7 h-7 ${problem.color}`} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3">{problem.title}</h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Arrow connecting to solution */}
        <motion.div
          variants={fadeInUp}
          className="flex justify-center mt-12 sm:mt-16"
        >
          <div className="flex flex-col items-center text-primary/80">
            <span className="text-sm font-medium mb-2">すべてKuruKuruで解決</span>
            <ArrowDown className="w-6 h-6 animate-bounce" />
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Features Section - Mobile optimized
function FeaturesSection() {
  const features = [
    {
      icon: MessageCircle,
      title: "LINEで簡単予約",
      description: "アプリのインストール不要。いつものLINE画面から、写真付きメニューを見て直感的に予約できます。"
    },
    {
      icon: Calendar,
      title: "Googleカレンダー連携",
      description: "予約が入ると自動でGoogleカレンダーに反映。空き枠の管理もスムーズです。"
    },
    {
      icon: Smartphone,
      title: "スマホだけで完結",
      description: "メニューの更新、予約確認、シフト調整まで、すべてスマホのLINEで操作できます。"
    },
    {
      icon: Users,
      title: "予約枠タイプに対応",
      description: "1枠予約、複数枠予約、スタッフ指名予約など、あなたのビジネスに合わせて選べます。"
    },
    {
      icon: Clock,
      title: "リアルタイム通知",
      description: "予約が入るとLINEに通知が届くので、見落としがありません。"
    },
    {
      icon: CheckCircle2,
      title: "チャット機能込み",
      description: "予約後のお客様とのやり取りも、追加料金なしでそのままLINEトークで行えます。"
    }
  ];

  return (
    <AnimatedSection id="features" className="py-12 sm:py-16 md:py-20 lg:py-28">
      <div className="container">
        <motion.div variants={fadeInUp} className="text-center mb-10 sm:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
            KuruKuruでできること
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            お客様はLINEで予約、店舗側はGoogleカレンダーで管理。
            シンプルだけど、必要な機能はすべて揃っています。
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="h-full premium-card border-0">
                <CardContent className="p-5 sm:p-6 lg:p-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl feature-icon-container flex items-center justify-center mb-4 sm:mb-5">
                    <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary transition-colors relative z-10" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

// App Screenshots Slider Section
function ScreenshotsSection() {
  const [activeTab, setActiveTab] = useState<'customer' | 'admin'>('customer');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Customer screens (5 images) - Using images with LINE header
  const customerScreens = [
    { src: "/images/screenshots/IMG_2951.png", title: "メニュー選択", description: "写真付きメニューから直感的に選択" },
    { src: "/images/screenshots/IMG_2952.png", title: "日時選択", description: "空き状況を確認して予約" },
    { src: "/images/screenshots/IMG_2953.png", title: "予約確認", description: "予約内容を確認して完了" },
    { src: "/images/screenshots/IMG_2965.PNG", title: "マイページ", description: "予約履歴の確認・変更" },
    { src: "/images/screenshots/IMG_2955.png", title: "予約詳細", description: "予約の詳細を確認" },
  ];

  // Admin screens (8 images) - Using images with LINE header
  const adminScreens = [
    { src: "/images/screenshots/IMG_2956.png", title: "管理トップ", description: "店舗管理のダッシュボード" },
    { src: "/images/screenshots/IMG_2957.png", title: "予約一覧", description: "本日の予約を一覧表示" },
    { src: "/images/screenshots/IMG_2958.png", title: "予約詳細", description: "予約の詳細情報を確認" },
    { src: "/images/screenshots/IMG_2960.png", title: "メニュー管理", description: "メニューの追加・編集" },
    { src: "/images/screenshots/IMG_2961.png", title: "メニュー編集", description: "価格・時間の設定" },
    { src: "/images/screenshots/IMG_2962.png", title: "シフト管理", description: "営業時間・休日の設定" },
    { src: "/images/screenshots/IMG_2963.png", title: "カレンダー連携", description: "Googleカレンダーと同期" },
    { src: "/images/screenshots/IMG_2964.png", title: "スタッフ管理", description: "スタッフの追加・権限設定" },
  ];

  const currentScreens = activeTab === 'customer' ? customerScreens : adminScreens;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 280;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <AnimatedSection id="screenshots" className="py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-b from-white to-secondary/30">
      <div className="container">
        <motion.div variants={fadeInUp} className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
            実際の画面をご覧ください
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4 mb-6 sm:mb-8">
            お客様向けの予約画面と、店舗管理者向けの管理画面をご紹介します。
          </p>

          {/* Tab Switcher */}
          <div className="inline-flex bg-secondary rounded-full p-1 gap-1">
            <button
              onClick={() => setActiveTab('customer')}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-medium transition-all ${activeTab === 'customer'
                ? 'bg-primary text-white shadow-md'
                : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              お客様画面
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-medium transition-all ${activeTab === 'admin'
                ? 'bg-primary text-white shadow-md'
                : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              店舗管理画面
            </button>
          </div>

          {activeTab === 'admin' && (
            <p className="text-xs sm:text-sm text-muted-foreground mt-3">
              ※ 管理画面は店舗管理者（複数人設定可能）のみアクセスできます
            </p>
          )}
        </motion.div>

        {/* Screenshots Slider */}
        <motion.div variants={fadeInUp} className="relative">
          {/* Navigation Buttons - Desktop */}
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center hover:bg-secondary transition-colors"
            aria-label="前へ"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center hover:bg-secondary transition-colors"
            aria-label="次へ"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-5 sm:gap-6 md:gap-8 overflow-x-auto pb-6 snap-x snap-mandatory px-4 sm:px-6"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {currentScreens.map((screen, index) => (
              <motion.div
                key={`${activeTab}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 snap-center"
              >
                <div className="w-[140px] sm:w-[160px] md:w-[180px]">
                  {/* Phone Frame - Shows full screenshot at natural aspect ratio */}
                  <div className="relative bg-gray-800 rounded-[1.5rem] sm:rounded-[2rem] p-1 sm:p-1.5 shadow-2xl">
                    {/* Screen - natural aspect ratio without compression */}
                    <div className="relative rounded-[1.25rem] sm:rounded-[1.5rem] overflow-hidden bg-white">
                      <img
                        src={screen.src}
                        alt={screen.title}
                        className="w-full"
                        style={{ display: 'block' }}
                      />
                    </div>
                  </div>
                  {/* Caption */}
                  <div className="mt-4 text-center">
                    <h4 className="font-semibold text-sm sm:text-base">{screen.title}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">{screen.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scroll Hint - Mobile */}
          <div className="flex justify-center mt-4 md:hidden">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <ChevronLeft className="w-4 h-4" />
              横にスワイプ
              <ChevronRight className="w-4 h-4" />
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// How It Works Section - Mobile optimized
function HowItWorksSection() {
  return (
    <AnimatedSection className="py-12 sm:py-16 md:py-20 lg:py-28 bg-secondary/50">
      <div className="container">
        <motion.div variants={fadeInUp} className="text-center mb-10 sm:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
            こだわったのは<br className="sm:hidden" />「スマホだけで完結する」こと
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            日々の営業でお忙しいオーナー様にとって、設定変更のためにパソコンを開くのは大きな負担。
            当システムは、管理業務のすべてがスマホだけで完結します。
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Image */}
          <motion.div variants={fadeInUp} className="order-2 lg:order-1">
            <div className="relative">
              <img
                src="/images/happy-owner.jpg"
                alt="スマホで予約管理をするサロンオーナー"
                className="rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl w-full"
              />
            </div>
          </motion.div>

          {/* Steps */}
          <motion.div variants={fadeInUp} className="order-1 lg:order-2 space-y-6 sm:space-y-8">
            <div className="flex gap-3 sm:gap-4">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary text-white flex items-center justify-center font-display font-bold text-base sm:text-lg">
                1
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">メニューの更新</h3>
                <p className="text-sm sm:text-base text-muted-foreground">スマホの写真フォルダから画像を選ぶだけ。価格や施術時間もその場で変更できます。</p>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary text-white flex items-center justify-center font-display font-bold text-base sm:text-lg">
                2
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">予約の確認</h3>
                <p className="text-sm sm:text-base text-muted-foreground">予約が入ると、お手元のLINEに通知が届きます。Googleカレンダーにも自動反映。</p>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary text-white flex items-center justify-center font-display font-bold text-base sm:text-lg">
                3
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">シフト調整</h3>
                <p className="text-sm sm:text-base text-muted-foreground">急な用事や定休日の設定も、その場でサッと変更可能です。</p>
              </div>
            </div>

            <div className="pt-2 sm:pt-4">
              <p className="text-sm sm:text-base text-muted-foreground italic">
                「パソコンやタブレットを店舗に置くスペースがない」<br />
                「機械の操作があまり得意ではない」<br />
                という方でも、直感的に操作していただけます。
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}

// Pricing Section - Premium Design
function PricingSection() {
  const plans = [
    {
      name: "スタンダード",
      price: "1,980",
      description: "お一人で運営されている個人サロン、プライベートジムなど",
      features: [
        "同時刻に「1名様」の予約を受付",
        "LINE予約・通知機能",
        "Googleカレンダー連携",
        "チャット機能（追加料金なし）",
        "メニュー管理・画像アップロード"
      ],
      popular: false,
      image: "/images/happy-owner.jpg",
      imagePosition: "object-center"
    },
    {
      name: "ビジネス",
      price: "4,980",
      description: "グループレッスン、レンタルスペース、指名制度のない整体院など",
      features: [
        "同時刻に「複数名」の予約を受付",
        "スタンダードの全機能",
        "定員数に合わせた在庫管理",
        "「10時は3名様まで」などの設定",
        "複数枠の予約管理"
      ],
      popular: true,
      image: "/images/gym-trainer.jpg",
      imagePosition: "object-top" // Focus on face
    },
    {
      name: "プロ",
      price: "6,980",
      description: "美容室、ネイルサロン、指名制のリラクゼーション店など",
      features: [
        "スタッフごとの「指名予約」対応",
        "ビジネスの全機能",
        "スタッフ別カレンダー連携",
        "個別のシフト管理",
        "指名予約のスムーズな運用"
      ],
      popular: false,
      image: "/images/clinic-salon.jpg",
      imagePosition: "object-center"
    }
  ];

  return (
    <AnimatedSection id="pricing" className="py-20 sm:py-28 bg-white relative">
      <div className="container text-center mb-16">
        <motion.div variants={fadeInUp}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="relative inline-block">
              3つの料金プラン
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/20 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            あなたのビジネスに合わせて選べる、シンプルな料金体系。<br className="hidden sm:block" />
            どのプランでもチャット機能は標準搭載（追加0円）です。
          </p>
        </motion.div>
      </div>

      <div className="container">
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-start">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className={`relative ${plan.popular ? 'lg:-mt-8 lg:mb-8 z-10' : ''}`}
            >
              <Card className={`h-full border-0 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl ${plan.popular ? 'ring-4 ring-primary/20 scale-105 shadow-2xl' : ''}`}>
                {/* Full Width Image Header */}
                <div className="relative h-48 sm:h-56 w-full overflow-hidden group">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 z-10" />
                  <img
                    src={plan.image}
                    alt={plan.name}
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${plan.imagePosition}`}
                  />
                  {plan.popular && (
                    <div className="absolute top-4 right-4 z-20">
                      <span className="bg-primary text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg shimmer">
                        一番人気
                      </span>
                    </div>
                  )}
                </div>

                <CardContent className="p-6 sm:p-8">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-2 flex items-center justify-between">
                      {plan.name}プラン
                      {!plan.popular && <span className="text-xs font-normal text-muted-foreground bg-secondary px-2 py-1 rounded-md">月額払い</span>}
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm text-muted-foreground font-medium">月額</span>
                      <span className={`text-4xl sm:text-5xl font-display font-bold ${plan.popular ? 'text-primary' : 'text-foreground'}`}>
                        {plan.price}
                      </span>
                      <span className="text-sm text-foreground font-medium">円</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="h-px bg-border/50" />
                    <ul className="space-y-3">
                      {plan.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start gap-3 text-sm">
                          <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${plan.popular ? 'text-primary fill-primary/10' : 'text-primary'}`} />
                          <span className="text-foreground/90">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    className={`w-full py-6 text-base font-bold rounded-xl shadow-md transition-all hover:shadow-xl hover:-translate-y-0.5 cursor-pointer relative z-10 ${plan.popular
                      ? 'glow-btn text-white'
                      : 'bg-white border-2 border-primary text-primary hover:bg-primary/5'
                      }`}
                  >
                    このプランで相談
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Helper Note */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            ※ すべて税込み表示です。初期費用は全プラン0円となります。
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
}



// Comparison Table Section
function ComparisonSection() {
  const comparisonData = [
    {
      feature: "月額料金",
      kurukuru: "1,980円～",
      otherA: "3,300円～",
      otherB: "5,500円～"
    },
    {
      feature: "チャット機能",
      kurukuru: "追加0円",
      otherA: "+1,100円/月",
      otherB: "+2,200円/月"
    },
    {
      feature: "LINE予約",
      kurukuru: "○",
      otherA: "○",
      otherB: "○"
    },
    {
      feature: "Googleカレンダー連携",
      kurukuru: "○",
      otherA: "○",
      otherB: "×"
    },
    {
      feature: "スマホだけで完結",
      kurukuru: "○",
      otherA: "△",
      otherB: "△"
    },
    {
      feature: "初期費用",
      kurukuru: "0円",
      otherA: "0円",
      otherB: "11,000円"
    },
    {
      feature: "契約縛り",
      kurukuru: "なし",
      otherA: "6ヶ月",
      otherB: "12ヶ月"
    }
  ];

  return (
    <AnimatedSection className="py-12 sm:py-16 md:py-20 lg:py-28 bg-secondary/50">
      <div className="container">
        <motion.div variants={fadeInUp} className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
            他社との比較
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground px-4">
            主要なLINE予約システムとの比較です。
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="max-w-4xl mx-auto overflow-x-auto">
          <table className="w-full min-w-[500px] border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 sm:p-4 bg-muted/50 rounded-tl-lg text-xs sm:text-sm font-semibold">機能</th>
                <th className="p-3 sm:p-4 bg-primary/10 text-primary text-xs sm:text-sm font-bold">
                  <div className="flex items-center justify-center gap-1">
                    <img src="/images/kurukuru-logo.png" alt="KuruKuru" className="h-5 sm:h-6 w-auto" />
                  </div>
                </th>
                <th className="p-3 sm:p-4 bg-muted/50 text-xs sm:text-sm font-semibold text-muted-foreground">他社A</th>
                <th className="p-3 sm:p-4 bg-muted/50 rounded-tr-lg text-xs sm:text-sm font-semibold text-muted-foreground">他社B</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-muted/30"}>
                  <td className="p-3 sm:p-4 text-xs sm:text-sm font-medium border-b border-border/50">{row.feature}</td>
                  <td className="p-3 sm:p-4 text-center text-xs sm:text-sm font-bold text-primary border-b border-border/50 bg-primary/5">
                    {row.kurukuru}
                  </td>
                  <td className="p-3 sm:p-4 text-center text-xs sm:text-sm text-muted-foreground border-b border-border/50">{row.otherA}</td>
                  <td className="p-3 sm:p-4 text-center text-xs sm:text-sm text-muted-foreground border-b border-border/50">{row.otherB}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div variants={fadeInUp} className="text-center mt-6 sm:mt-8">
          <p className="text-[10px] sm:text-xs text-muted-foreground">
            ※2024年12月時点の情報です。各サービスの最新情報は公式サイトをご確認ください。
          </p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Testimonials Section - Mobile optimized
function TestimonialsSection() {
  const testimonials = [
    {
      quote: "今まで公式LINEで直接やり取りしていたので、すごく楽になりました",
      author: "美容室オーナー",
      image: "/images/happy-owner.jpg"
    },
    {
      quote: "予約のやり取りが減って、施術・接客に集中できるようになりました",
      author: "エステサロン経営",
      image: "/images/treatment-room.jpg"
    },
    {
      quote: "「空いてますか？」「何時がいいですか？」の往復が減って助かります",
      author: "整体院オーナー",
      image: "/images/gym-trainer.jpg"
    },
    {
      quote: "予約が入った時にLINEで通知が来るので、見落としが減りました",
      author: "ネイルサロン経営",
      image: "/images/happy-owner.jpg"
    },
    {
      quote: "スマホだけで変更できるのが現場的にありがたいです",
      author: "パーソナルジム経営",
      image: "/images/gym-trainer.jpg"
    }
  ];

  return (
    <AnimatedSection id="testimonials" className="py-12 sm:py-16 md:py-20 lg:py-28 bg-secondary/50">
      <div className="container">
        <motion.div variants={fadeInUp} className="text-center mb-10 sm:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
            導入店舗様の声
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground px-4">
            実際にKuruKuruをご利用いただいているオーナー様からの声をご紹介します。
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="h-full glass-card border-0">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-xs sm:text-sm">{testimonial.author}</p>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-foreground leading-relaxed">
                    「{testimonial.quote}」
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

// FAQ Section - Mobile optimized
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "初期費用はかかりますか？",
      answer: "いいえ、初期費用は0円です。月額料金のみでご利用いただけます。"
    },
    {
      question: "契約期間の縛りはありますか？",
      answer: "最低契約期間などの縛りはありません。いつでも解約可能です。"
    },
    {
      question: "お客様はアプリをインストールする必要がありますか？",
      answer: "いいえ、お客様はいつものLINEアプリから予約できます。新しいアプリのインストールは不要です。"
    },
    {
      question: "パソコンがなくても使えますか？",
      answer: "はい、すべての操作がスマートフォンのLINEから行えます。パソコンは必要ありません。"
    },
    {
      question: "導入までどのくらいかかりますか？",
      answer: "GoogleカレンダーとLINE公式アカウントの連携設定が完了次第、すぐにご利用いただけます。設定のサポートも行っております。"
    }
  ];

  return (
    <AnimatedSection id="faq" className="py-12 sm:py-16 md:py-20 lg:py-28">
      <div className="container">
        <motion.div variants={fadeInUp} className="text-center mb-10 sm:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
            よくある質問
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card
                className={`border-0 bg-white cursor-pointer transition-all ${openIndex === index ? 'shadow-md' : 'shadow-sm'}`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-semibold text-sm sm:text-base pr-2">{faq.question}</h3>
                    <ChevronRight className={`w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground transition-transform flex-shrink-0 ${openIndex === index ? 'rotate-90' : ''}`} />
                  </div>
                  {openIndex === index && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground"
                    >
                      {faq.answer}
                    </motion.p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

// CTA Section - Mobile optimized
function CTASection() {
  return (
    <AnimatedSection className="py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-r from-primary to-primary/90 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 grid-bg" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)' }} />
      </div>
      <div className="container relative">
        <motion.div variants={fadeInUp} className="text-center text-white px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
            導入のご相談・お問い合わせ
          </h2>
          <p className="text-sm sm:text-base md:text-lg opacity-90 mb-6 sm:mb-8 max-w-2xl mx-auto">
            「自分の業種には、どのプランが適しているか」<br className="hidden sm:block" />
            「現在の予約方法からスムーズに移行できるか」<br className="hidden sm:block" />
            店舗様の状況に合わせて、最適な運用方法をご提案いたします。
          </p>
          <Button className="bg-white text-primary hover:bg-white/95 text-base sm:text-lg px-6 sm:px-10 py-5 sm:py-6 font-semibold shadow-xl hover:shadow-2xl w-full sm:w-auto rounded-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer relative z-10">
            LINE公式アカウントで相談する
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1" />
          </Button>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Footer - Mobile optimized
function Footer() {
  return (
    <footer className="bg-foreground text-white py-8 sm:py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src="/images/kurukuru-logo.png"
              alt="KuruKuru"
              className="h-10 sm:h-12 w-auto brightness-0 invert"
            />
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-white/70">
            <a href="#features" className="hover:text-white transition-colors">機能</a>
            <a href="#pricing" className="hover:text-white transition-colors">料金</a>
            <a href="#testimonials" className="hover:text-white transition-colors">導入事例</a>
            <a href="#faq" className="hover:text-white transition-colors">よくある質問</a>
          </nav>
        </div>

        <div className="border-t border-white/10 mt-6 sm:mt-8 pt-6 sm:pt-8">
          <div className="text-[10px] sm:text-xs text-white/50 space-y-1 sm:space-y-2 px-4 sm:px-0">
            <p>※本システムはLINEヤフー株式会社およびGoogle LLCの公認ツールではありません。</p>
            <p>※Googleカレンダー等の仕様変更により、一時的に機能が制限される場合があります。</p>
            <p>※ダブルブッキングを100%防止することを保証するものではありません。</p>
          </div>
          <p className="text-center text-white/50 text-xs sm:text-sm mt-4 sm:mt-6">
            © 2025 KuruKuru. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main Home Component
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <FeaturesSection />
        <ScreenshotsSection />
        <HowItWorksSection />
        <PricingSection />
        <ComparisonSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
