import { useState } from 'react'
import { api } from '../utils/api'
import CocktailGrid from '../components/CocktailGrid'

export default function RecommendPage({ toast, onSelect }) {
  const [ingredients, setIngredients] = useState('')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleRecommend = async () => {
    if (!ingredients.trim()) {
      toast('请输入你手边的材料', 'error')
      return
    }
    setLoading(true)
    try {
      const data = await api.get('/api/cocktails/recommend', { ingredients })
      setResults(data)
    } catch (err) {
      toast('推荐失败', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="recommend-section">
      <div className="hero" style={{ paddingBottom: '24px' }}>
        <span className="hero-emoji">🎯</span>
        <h1>智能推荐</h1>
        <p>告诉我你手边有什么酒和材料，我帮你推荐能做的鸡尾酒</p>
      </div>

      <div className="recommend-input-area">
        <textarea
          className="recommend-textarea"
          placeholder="例如：金酒、柠檬、糖浆、苏打水、薄荷..."
          value={ingredients}
          onChange={e => setIngredients(e.target.value)}
        />
        <div className="recommend-hint">
          💡 用逗号分隔各种材料，越详细推荐越精准
        </div>
        <button
          className="btn btn-primary"
          onClick={handleRecommend}
          disabled={loading}
          style={{ width: '100%' }}
        >
          {loading ? '搜索中...' : '🔍 查找能做的鸡尾酒'}
        </button>
      </div>

      {results && (
        <div className="recommend-results">
          {results.length > 0 ? (
            <>
              <h3>找到 {results.length} 款可以做的鸡尾酒：</h3>
              <CocktailGrid cocktails={results} onSelect={onSelect} onFavorite={async (id) => {
                try {
                  const res = await api.post(`/api/favorites/${id}`)
                  toast(res.favorited ? '已收藏 ❤️' : '已取消收藏')
                } catch { toast('操作失败', 'error') }
              }} />
            </>
          ) : (
            <div className="no-results">
              <span className="emoji">😅</span>
              <p>没有找到匹配的鸡尾酒，试试换个材料组合？</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
