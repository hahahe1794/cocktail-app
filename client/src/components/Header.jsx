export default function Header({ page, onNavigate, theme, onThemeToggle }) {
  const items = [
    { key: 'home', label: '🏠 首页' },
    { key: 'recommend', label: '🎯 推荐' },
    { key: 'favorites', label: '❤️ 收藏' },
    { key: 'custom', label: '✨ 自创' },
    { key: 'bar', label: '🍷 酒柜' },
  ]

  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo" onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>
          <span className="logo-icon">🍸</span>
          <span>调酒配方</span>
        </div>
        <nav className="nav">
          {items.map(item => (
            <button
              key={item.key}
              className={`nav-btn ${page === item.key ? 'active' : ''}`}
              onClick={() => onNavigate(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <button
          className="theme-toggle"
          onClick={onThemeToggle}
          title={theme === 'dark' ? '切换亮色模式' : '切换暗色模式'}
          aria-label={theme === 'dark' ? '切换亮色模式' : '切换暗色模式'}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  )
}
