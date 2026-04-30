import { useState, useEffect } from 'react'
import { api } from '../utils/api'
import CocktailGrid from '../components/CocktailGrid'

export default function FavoritesPage({ toast, onSelect }) {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFavorites()
  }, [])

  const loadFavorites = async () => {
    setLoading(true)
    try {
      const data = await api.get('/api/favorites')
      setFavorites(data)
    } catch (err) {
      toast('加载失败', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleFavorite = async (id) => {
    try {
      await api.post(`/api/favorites/${id}`)
      toast('已取消收藏')
      loadFavorites()
    } catch (err) {
      toast('操作失败', 'error')
    }
  }

  return (
    <div>
      <div className="hero" style={{ paddingBottom: '24px' }}>
        <span className="hero-emoji">❤️</span>
        <h1>我的收藏</h1>
        <p>你收藏的鸡尾酒配方</p>
      </div>

      {loading ? (
        <div className="loading">加载中</div>
      ) : favorites.length === 0 ? (
        <div className="empty-state">
          <span className="emoji">💔</span>
          <h3>还没有收藏</h3>
          <p>去首页探索并收藏你喜欢的鸡尾酒吧</p>
        </div>
      ) : (
        <CocktailGrid cocktails={favorites} onSelect={onSelect} onFavorite={handleFavorite} />
      )}
    </div>
  )
}
