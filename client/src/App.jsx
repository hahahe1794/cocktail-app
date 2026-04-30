import { useState, useEffect, useCallback } from 'react'
import { api } from './utils/api'
import Header from './components/Header'
import Hero from './components/Hero'
import SearchFilters from './components/SearchFilters'
import CocktailGrid from './components/CocktailGrid'
import CocktailDetail from './components/CocktailDetail'
import RecommendPage from './pages/RecommendPage'
import CustomPage from './pages/CustomPage'
import FavoritesPage from './pages/FavoritesPage'
import BarShelfPage from './pages/BarShelfPage'
import Toast from './components/Toast'

function App() {
  const [page, setPage] = useState('home')
  const [cocktails, setCocktails] = useState([])
  const [filters, setFilters] = useState({})
  const [activeFilters, setActiveFilters] = useState({})
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(false)
  const [toasts, setToasts] = useState([])
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toast = useCallback((message, type = 'info') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000)
  }, [])

  const fetchCocktails = useCallback(async () => {
    setLoading(true)
    try {
      const params = { search, ...activeFilters }
      const data = await api.get('/api/cocktails', params)
      setCocktails(data)
    } catch (err) {
      toast('加载失败', 'error')
    } finally {
      setLoading(false)
    }
  }, [search, activeFilters, toast])

  const fetchFilters = useCallback(async () => {
    try {
      const data = await api.get('/api/cocktails/filters')
      setFilters(data)
    } catch (err) {
      console.error('Failed to load filters', err)
    }
  }, [])

  useEffect(() => { fetchFilters() }, [fetchFilters])
  useEffect(() => { if (page === 'home') fetchCocktails() }, [page, fetchCocktails])

  const handleFavorite = async (id) => {
    try {
      const res = await api.post(`/api/favorites/${id}`)
      toast(res.favorited ? '已收藏 ❤️' : '已取消收藏')
      fetchCocktails()
    } catch (err) {
      toast('操作失败', 'error')
    }
  }

  const handleRandom = async () => {
    try {
      const data = await api.get('/api/cocktails/random')
      if (data) setSelected(data)
    } catch (err) {
      toast('获取失败', 'error')
    }
  }

  const renderPage = () => {
    switch (page) {
      case 'recommend':
        return <RecommendPage toast={toast} onSelect={setSelected} />
      case 'custom':
        return <CustomPage toast={toast} onSelect={setSelected} />
      case 'favorites':
        return <FavoritesPage toast={toast} onSelect={setSelected} />
      case 'bar':
        return <BarShelfPage toast={toast} />
      default:
        return (
          <>
            <Hero onRandom={handleRandom} />
            <SearchFilters
              search={search}
              onSearchChange={setSearch}
              filters={filters}
              activeFilters={activeFilters}
              onFilterChange={(key, value) => {
                setActiveFilters(prev => {
                  if (prev[key] === value) {
                    const { [key]: _, ...rest } = prev
                    return rest
                  }
                  return { ...prev, [key]: value }
                })
              }}
            />
            {loading ? (
              <div className="loading">加载中</div>
            ) : cocktails.length === 0 ? (
              <div className="empty-state">
                <span className="emoji">🔍</span>
                <h3>没有找到匹配的鸡尾酒</h3>
                <p>试试其他搜索词或筛选条件</p>
              </div>
            ) : (
              <CocktailGrid
                cocktails={cocktails}
                onSelect={setSelected}
                onFavorite={handleFavorite}
              />
            )}
          </>
        )
    }
  }

  return (
    <div className="app">
      <Header page={page} onNavigate={setPage} theme={theme} onThemeToggle={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} />
      <main className="main">
        {renderPage()}
      </main>
      <footer className="footer">
        🍸 调酒配方 · 适度饮酒，享受生活
      </footer>
      {selected && (
        <CocktailDetail
          cocktail={selected}
          onClose={() => setSelected(null)}
          onFavorite={handleFavorite}
          toast={toast}
        />
      )}
      <Toast toasts={toasts} />
    </div>
  )
}

export default App
