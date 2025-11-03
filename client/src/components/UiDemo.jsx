import React, { useState } from "react";
import { Bell, Settings, User, Search, Heart, Star, Plus } from "lucide-react";

// 玻璃效果樣式類別
const glassStyles = {
  // 基礎玻璃效果
  glass: "backdrop-blur-md bg-white/10 border border-white/20",

  // 深色玻璃效果
  glassDark: "backdrop-blur-md bg-black/20 border border-white/10",

  // 強烈玻璃效果
  glassStrong: "backdrop-blur-xl bg-white/20 border border-white/30",

  // 卡片樣式
  glassCard:
    "backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-xl",

  // 按鈕樣式
  glassButton:
    "backdrop-blur-md bg-white/20 hover:bg-white/30 border border-white/30 rounded-xl px-6 py-3 transition-all duration-300 active:scale-95",

  // 輸入框樣式
  glassInput:
    "backdrop-blur-md bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:bg-white/20 focus:border-white/40 outline-none transition-all duration-300",

  // 導航欄樣式
  glassNav: "backdrop-blur-xl bg-white/10 border-b border-white/20",

  // 側邊欄樣式
  glassSidebar: "backdrop-blur-lg bg-white/5 border-r border-white/10",

  // Modal 樣式
  glassModal:
    "backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl",
};

export default function IOSGlassUIDemo() {
  const [activeTab, setActiveTab] = useState("components");
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      {/* 動態背景裝飾 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-20 left-40 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-2000"></div>
      </div>

      {/* 主要內容 */}
      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* 頂部導航欄 */}
        <nav className={`${glassStyles.glassNav} rounded-2xl mb-6 p-4`}>
          <div className="flex items-center justify-between">
            <h1 className="text-white text-2xl font-bold">iOS Glass UI</h1>
            <div className="flex gap-3">
              <button className={`${glassStyles.glassButton} !p-3`}>
                <Bell className="w-5 h-5 text-white" />
              </button>
              <button className={`${glassStyles.glassButton} !p-3`}>
                <Settings className="w-5 h-5 text-white" />
              </button>
              <button className={`${glassStyles.glassButton} !p-3`}>
                <User className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </nav>

        {/* Tab 切換 */}
        <div
          className={`${glassStyles.glass} rounded-2xl p-2 mb-6 inline-flex gap-2`}
        >
          <button
            onClick={() => setActiveTab("components")}
            className={`px-6 py-2 rounded-xl transition-all duration-300 ${
              activeTab === "components"
                ? "bg-white/30 text-white"
                : "text-white/70 hover:text-white"
            }`}
          >
            元件展示
          </button>
          <button
            onClick={() => setActiveTab("styles")}
            className={`px-6 py-2 rounded-xl transition-all duration-300 ${
              activeTab === "styles"
                ? "bg-white/30 text-white"
                : "text-white/70 hover:text-white"
            }`}
          >
            樣式代碼
          </button>
        </div>

        {/* 元件展示區 */}
        {activeTab === "components" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 卡片範例 1 */}
            <div className={`${glassStyles.glassCard} p-6`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-400"></div>
                <div>
                  <h3 className="text-white font-semibold">使用者名稱</h3>
                  <p className="text-white/70 text-sm">@username</p>
                </div>
              </div>
              <p className="text-white/90 mb-4">
                這是一個使用玻璃擬態效果的卡片元件,具有半透明背景和模糊效果。
              </p>
              <div className="flex gap-2">
                <button
                  className={`${glassStyles.glassButton} !py-2 !px-4 flex items-center gap-2`}
                >
                  <Heart className="w-4 h-4" />
                  <span className="text-white text-sm">喜歡</span>
                </button>
                <button
                  className={`${glassStyles.glassButton} !py-2 !px-4 flex items-center gap-2`}
                >
                  <Star className="w-4 h-4" />
                  <span className="text-white text-sm">收藏</span>
                </button>
              </div>
            </div>

            {/* 卡片範例 2 */}
            <div className={`${glassStyles.glassCard} p-6`}>
              <h3 className="text-white font-semibold mb-4 text-lg">
                搜尋功能
              </h3>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  placeholder="搜尋..."
                  className={`${glassStyles.glassInput} w-full pl-10 text-white placeholder-white/50`}
                />
              </div>
              <div className="space-y-2">
                {["設計", "開發", "UI/UX"].map((tag) => (
                  <div
                    key={tag}
                    className={`${glassStyles.glass} rounded-lg p-3 text-white/90`}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            {/* 卡片範例 3 */}
            <div className={`${glassStyles.glassCard} p-6`}>
              <h3 className="text-white font-semibold mb-4 text-lg">
                統計數據
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-white/70 text-sm mb-2">
                    <span>專案完成度</span>
                    <span>75%</span>
                  </div>
                  <div
                    className={`${glassStyles.glass} rounded-full h-2 overflow-hidden`}
                  >
                    <div className="h-full w-3/4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-white/70 text-sm mb-2">
                    <span>任務進度</span>
                    <span>60%</span>
                  </div>
                  <div
                    className={`${glassStyles.glass} rounded-full h-2 overflow-hidden`}
                  >
                    <div className="h-full w-3/5 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* 按鈕展示 */}
            <div className={`${glassStyles.glassCard} p-6`}>
              <h3 className="text-white font-semibold mb-4 text-lg">
                按鈕樣式
              </h3>
              <div className="space-y-3">
                <button
                  className={`${glassStyles.glassButton} w-full text-white`}
                >
                  標準按鈕
                </button>
                <button
                  className={`${glassStyles.glassButton} w-full text-white flex items-center justify-center gap-2`}
                >
                  <Plus className="w-5 h-5" />
                  帶圖示按鈕
                </button>
                <button
                  className={`${glassStyles.glassStrong} hover:bg-white/30 rounded-xl px-6 py-3 w-full text-white transition-all duration-300 active:scale-95`}
                >
                  強調按鈕
                </button>
              </div>
            </div>

            {/* Modal 觸發 */}
            <div className={`${glassStyles.glassCard} p-6`}>
              <h3 className="text-white font-semibold mb-4 text-lg">
                Modal 彈窗
              </h3>
              <p className="text-white/80 mb-4 text-sm">
                點擊按鈕查看玻璃效果的 Modal
              </p>
              <button
                onClick={() => setShowModal(true)}
                className={`${glassStyles.glassButton} w-full text-white`}
              >
                開啟 Modal
              </button>
            </div>

            {/* 通知卡片 */}
            <div className={`${glassStyles.glassCard} p-6`}>
              <h3 className="text-white font-semibold mb-4 text-lg">
                通知訊息
              </h3>
              <div className={`${glassStyles.glassDark} rounded-xl p-4 mb-3`}>
                <p className="text-white text-sm">✅ 操作成功完成</p>
              </div>
              <div className={`${glassStyles.glass} rounded-xl p-4`}>
                <p className="text-white text-sm">ℹ️ 系統維護通知</p>
              </div>
            </div>
          </div>
        )}

        {/* 樣式代碼展示 */}
        {activeTab === "styles" && (
          <div className={`${glassStyles.glassCard} p-6`}>
            <h2 className="text-white text-2xl font-bold mb-4">
              Tailwind CSS 樣式包
            </h2>
            <p className="text-white/80 mb-6">
              直接複製以下樣式物件到你的專案中使用:
            </p>

            <div
              className={`${glassStyles.glassDark} rounded-xl p-6 overflow-x-auto`}
            >
              <pre className="text-white/90 text-sm">
                {`const glassStyles = {
  // 基礎玻璃效果
  glass: "backdrop-blur-md bg-white/10 border border-white/20",
  
  // 深色玻璃效果
  glassDark: "backdrop-blur-md bg-black/20 border border-white/10",
  
  // 強烈玻璃效果
  glassStrong: "backdrop-blur-xl bg-white/20 border border-white/30",
  
  // 卡片樣式
  glassCard: "backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-xl",
  
  // 按鈕樣式
  glassButton: "backdrop-blur-md bg-white/20 hover:bg-white/30 border border-white/30 rounded-xl px-6 py-3 transition-all duration-300 active:scale-95",
  
  // 輸入框樣式
  glassInput: "backdrop-blur-md bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:bg-white/20 focus:border-white/40 outline-none transition-all duration-300",
  
  // 導航欄樣式
  glassNav: "backdrop-blur-xl bg-white/10 border-b border-white/20",
  
  // 側邊欄樣式
  glassSidebar: "backdrop-blur-lg bg-white/5 border-r border-white/10",
  
  // Modal 樣式
  glassModal: "backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl",
};

// 使用範例:
<div className={\`\${glassStyles.glassCard} p-6\`}>
  <h3 className="text-white">您的內容</h3>
</div>`}
              </pre>
            </div>

            <div className="mt-6 space-y-4">
              <div className={`${glassStyles.glass} rounded-xl p-4`}>
                <h4 className="text-white font-semibold mb-2">💡 使用提示</h4>
                <ul className="text-white/80 text-sm space-y-2">
                  <li>• 確保背景有色彩或圖片才能看出玻璃效果</li>
                  <li>• 可以調整 bg-white/10 的透明度數值 (0-100)</li>
                  <li>
                    • backdrop-blur-md 可改為 sm, lg, xl, 2xl 調整模糊程度
                  </li>
                  <li>• 搭配漸層背景效果最佳</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div
            className={`${glassStyles.glassModal} p-8 max-w-md w-full transform transition-all duration-300 scale-100`}
          >
            <h3 className="text-white text-2xl font-bold mb-4">
              玻璃效果 Modal
            </h3>
            <p className="text-white/80 mb-6">
              這是一個使用玻璃擬態設計的彈窗元件,具有更強的模糊效果和半透明背景。
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className={`${glassStyles.glassButton} flex-1 text-white`}
              >
                取消
              </button>
              <button
                onClick={() => setShowModal(false)}
                className={`${glassStyles.glassStrong} hover:bg-white/30 rounded-xl px-6 py-3 flex-1 text-white transition-all duration-300 active:scale-95`}
              >
                確認
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
