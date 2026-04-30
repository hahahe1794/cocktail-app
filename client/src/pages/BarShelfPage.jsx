import { useState, useEffect } from 'react'
import { api } from '../utils/api'

export default function BarShelfPage({ toast }) {
  const [items, setItems] = useState([])
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadShelf() }, [])

  const loadShelf = async () => {
    setLoading(true)
    try {
      const data = await api.get('/api/custom/bar-shelf/list')
      setItems(data)
    } catch (err) {
      toast('加载失败', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async () => {
    if (!name.trim()) { toast('请输入名称', 'error'); return }
    try {
      await api.post('/api/custom/bar-shelf', { name, category })
      setName('')
      setCategory('')
      toast('已添加到酒柜 🍷')
      loadShelf()
    } catch (err) {
      toast('添加失败', 'error')
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/custom/bar-shelf/${id}`)
      toast('已移除')
      loadShelf()
    } catch (err) {
      toast('删除失败', 'error')
    }
  }

  // Group by category
  const grouped = items.reduce((acc, item) => {
    const cat = item.category || '其他'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(item)
    return acc
  }, {})

  return (
    <div className="shelf-section">
      <div className="hero" style={{ paddingBottom: '24px' }}>
        <span className="hero-emoji">🍷</span>
        <h1>我的酒柜</h1>
        <p>管理你家里的酒和材料，方便匹配推荐</p>
      </div>

      <div className="shelf-add">
        <input
          className="form-input"
          placeholder="酒/材料名称"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
        />
        <select
          className="form-select"
          style={{ maxWidth: '120px' }}
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="">分类</option>
          <option value="基酒">基酒</option>
          <option value="利口酒">利口酒</option>
          <option value="果汁">果汁</option>
          <option value="调味">调味</option>
          <option value="装饰">装饰</option>
          <option value="其他">其他</option>
        </select>
        <button className="btn btn-primary" onClick={handleAdd}>添加</button>
      </div>

      {loading ? (
        <div className="loading">加载中</div>
      ) : items.length === 0 ? (
        <div className="empty-state">
          <span className="emoji">🏠</span>
          <h3>酒柜是空的</h3>
          <p>添加你家里有的酒和材料</p>
        </div>
      ) : (
        Object.entries(grouped).map(([cat, catItems]) => (
          <div key={cat} style={{ marginBottom: '24px' }}>
            <h3 className="section-title">{cat} ({catItems.length})</h3>
            <div className="shelf-grid">
              {catItems.map(item => (
                <div key={item.id} className="shelf-item">
                  <span>{item.name}</span>
                  <button onClick={() => handleDelete(item.id)}>✕</button>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
