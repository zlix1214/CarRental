export const gs = {
  // 基底玻璃 (大多組件都用這個)
  glass: `
    backdrop-blur-lg
    bg-white/15
    border border-white/25
    shadow-[0_0_25px_rgba(255,255,255,0.08)]
  `,

  // 深色背景時用這個（偏黑 / 霧玻璃）
  glassDark: `
    backdrop-blur-lg
    bg-black/25
    border border-white/15
    shadow-[0_0_25px_rgba(0,0,0,0.45)]
  `,

  // 加強版：用在 card、section 容器
  glassCard: `
    backdrop-blur-xl
    bg-white/12
    border border-white/30
    rounded-2xl
    shadow-[0_4px_30px_rgba(0,0,0,0.35)]
  `,

  // 按鈕
  glassButton: `
    backdrop-blur-md
    bg-white/20
    hover:bg-white/30
    border border-white/25
    shadow-[0_0_15px_rgba(255,255,255,0.12)]
    rounded-xl
    transition-all duration-300
    active:scale-95
  `,

  // 輸入框
  glassInput: `
    backdrop-blur-md
    bg-white/12
    border border-white/25
    rounded-xl
    px-4 py-3
    focus:bg-white/20
    focus:border-white/40
    outline-none
    transition-all duration-300
  `,

  // 導航列 (更清晰的分界線)
  glassNav: `
    backdrop-blur-xl
    bg-black/20
    border-b border-white/20
    shadow-[0_2px_20px_rgba(0,0,0,0.4)]
  `,

  // Sidebar
  glassSidebar: `
    backdrop-blur-lg
    bg-white/8
    border-r border-white/15
    shadow-[inset_0_0_20px_rgba(255,255,255,0.06)]
  `,

  // Modal：更厚的霧面效果
  glassModal: `
    backdrop-blur-2xl
    bg-white/12
    border border-white/25
    rounded-3xl
    shadow-[0_8px_40px_rgba(0,0,0,0.55)]
  `,
};
