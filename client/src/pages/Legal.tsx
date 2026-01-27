/**
 * 特定商取引法に基づく表記ページ
 * Stripe審査対応のための法的開示ページ
 */

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Link } from "wouter";

export default function Legal() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/">
                            <a className="flex items-center gap-2">
                                <img
                                    src="/logo_toumei.png"
                                    alt="LinCal"
                                    className="h-10 sm:h-12 w-auto"
                                    width="180"
                                    height="48"
                                />
                            </a>
                        </Link>
                        <Link href="/">
                            <Button variant="ghost" className="flex items-center gap-1">
                                <ChevronLeft className="w-4 h-4" />
                                ホームに戻る
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 sm:py-12 max-w-3xl">
                <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
                    特定商取引法に基づく表記
                </h1>

                <div className="bg-white rounded-xl shadow-sm border p-6 sm:p-8 space-y-6">
                    {/* 販売業者名 */}
                    <div className="border-b pb-4">
                        <h2 className="text-sm font-medium text-gray-500 mb-1">販売業者名</h2>
                        <p className="text-base sm:text-lg font-medium">堀江祥汰</p>
                    </div>

                    {/* 代表者名 */}
                    <div className="border-b pb-4">
                        <h2 className="text-sm font-medium text-gray-500 mb-1">運営責任者</h2>
                        <p className="text-base sm:text-lg font-medium">堀江祥汰</p>
                    </div>

                    {/* 所在地 */}
                    <div className="border-b pb-4">
                        <h2 className="text-sm font-medium text-gray-500 mb-1">所在地</h2>
                        <p className="text-base sm:text-lg font-medium">
                            〒299-1106<br />
                            千葉県君津市内蓑輪122-1
                        </p>
                    </div>

                    {/* 電話番号 */}
                    <div className="border-b pb-4">
                        <h2 className="text-sm font-medium text-gray-500 mb-1">電話番号</h2>
                        <p className="text-base sm:text-lg font-medium">
                            <a href="tel:090-1100-0097" className="text-primary hover:underline">
                                090-1100-0097
                            </a>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            ※お電話でのお問い合わせは対応できない場合があります。<br />
                            LINEまたはメールでのお問い合わせを推奨しております。
                        </p>
                    </div>

                    {/* メールアドレス */}
                    <div className="border-b pb-4">
                        <h2 className="text-sm font-medium text-gray-500 mb-1">メールアドレス</h2>
                        <p className="text-base sm:text-lg font-medium">
                            <a href="mailto:lincal.reserve@gmail.com" className="text-primary hover:underline">
                                lincal.reserve@gmail.com
                            </a>
                        </p>
                    </div>

                    {/* 販売URL */}
                    <div className="border-b pb-4">
                        <h2 className="text-sm font-medium text-gray-500 mb-1">販売URL</h2>
                        <p className="text-base sm:text-lg font-medium">
                            <a href="https://lincal-reserve.com/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                                https://lincal-reserve.com/
                            </a>
                        </p>
                    </div>

                    {/* 販売価格 */}
                    <div className="border-b pb-4">
                        <h2 className="text-sm font-medium text-gray-500 mb-1">販売価格</h2>
                        <div className="text-base sm:text-lg font-medium space-y-2">
                            <p><span className="text-gray-600">初期費用：</span>19,800円（税込）</p>
                            <p className="font-medium">月額利用料（税込）：</p>
                            <ul className="list-disc list-inside pl-2 text-base space-y-1">
                                <li>スタンダードプラン：1,980円/月</li>
                                <li>ビジネスプラン：4,980円/月</li>
                                <li>プロプラン：6,980円/月</li>
                            </ul>
                            <p className="text-sm text-gray-500 mt-2">
                                ※詳細は<a href="https://lincal-reserve.com/#pricing" className="text-primary hover:underline">料金プランページ</a>をご確認ください。
                            </p>
                        </div>
                    </div>

                    {/* 支払方法 */}
                    <div className="border-b pb-4">
                        <h2 className="text-sm font-medium text-gray-500 mb-1">支払方法</h2>
                        <p className="text-base sm:text-lg font-medium">
                            クレジットカード決済（Stripe）
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            VISA、Mastercard、American Express、JCB、Apple Pay、Google Pay に対応
                        </p>
                    </div>

                    {/* 支払時期 */}
                    <div className="border-b pb-4">
                        <h2 className="text-sm font-medium text-gray-500 mb-1">支払時期</h2>
                        <div className="text-base sm:text-lg font-medium space-y-1">
                            <p>初期費用：お申込み時</p>
                            <p>月額利用料：毎月（ご契約日を起算日として自動課金）</p>
                        </div>
                    </div>

                    {/* サービス提供時期 */}
                    <div className="border-b pb-4">
                        <h2 className="text-sm font-medium text-gray-500 mb-1">サービス提供時期</h2>
                        <p className="text-base sm:text-lg font-medium">
                            決済完了後、速やかにサービスをご利用いただけます。<br />
                            初期設定サポートについては、スケジュール調整の上、実施いたします。
                        </p>
                    </div>

                    {/* キャンセル・返金ポリシー */}
                    <div className="border-b pb-4">
                        <h2 className="text-sm font-medium text-gray-500 mb-1">キャンセル・返金ポリシー</h2>
                        <div className="text-base sm:text-lg font-medium space-y-3">
                            <div>
                                <p className="font-semibold text-gray-700 mb-1">■ 月額利用料について</p>
                                <ul className="list-disc list-inside pl-2 text-base space-y-1 text-gray-600">
                                    <li>解約申請月の月末までサービスをご利用いただけます</li>
                                    <li>日割りでの返金は行っておりません</li>
                                    <li>最低契約期間の縛りはありません（いつでも解約可能）</li>
                                </ul>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-700 mb-1">■ 初期費用について</p>
                                <ul className="list-disc list-inside pl-2 text-base space-y-1 text-gray-600">
                                    <li>初期設定作業完了後の返金は行っておりません</li>
                                    <li>サービス開始前（初期設定作業前）のキャンセルについては全額返金いたします</li>
                                </ul>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-700 mb-1">■ 解約方法</p>
                                <p className="text-gray-600">
                                    メールまたはLINEにて解約の旨をご連絡ください。<br />
                                    解約手続き完了後、次回課金日以降の請求は発生しません。
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 動作環境 */}
                    <div className="pb-2">
                        <h2 className="text-sm font-medium text-gray-500 mb-1">動作環境</h2>
                        <div className="text-base sm:text-lg font-medium space-y-1">
                            <p>LINEアプリ（iOS/Android）が動作するスマートフォン</p>
                            <p>Googleアカウント（Googleカレンダー連携用）</p>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                            ※パソコンは必要ありません。すべての操作がスマートフォンから行えます。
                        </p>
                    </div>
                </div>

                {/* Back to Home Button */}
                <div className="mt-8 text-center">
                    <Link href="/">
                        <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3">
                            ホームに戻る
                        </Button>
                    </Link>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-100 border-t mt-12">
                <div className="container mx-auto px-4 py-6 text-center">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} LinCal. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
