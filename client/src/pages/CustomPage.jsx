import { useState, useEffect } from 'react'
import { api } from '../utils/api'
import CocktailGrid from '../components/CocktailGrid'

export default function CustomPage({ toast, onSelect }) {
  const [customs, setCustoms] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm())

  function emptyForm() {
    return {
      name: '', name_en: '', category: '自创', base_spirit: '', flavor: '',
      difficulty: '入门', glass: '', method: '', garnish: '', story: '',
      ingredients: [{ name: '', amount: '', unit: '' }],
      steps: [''],
      tags: [],
    }
  }

  useEffect(() => { loadCustoms() }, [])

  const loadCustoms = async () => {
    setLoading(true)
    try {
      const data = await api.get('/api/custom')
      setCustoms(data)
    } catch (err) {
      toast('加载失败', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    if (!form.name.trim()) { toast('酒名不能为空', 'error'); return }
    try {
      const cleaned = {
        ...form,
        ingredients: form.ingredients.filter(i => i.name.trim()),
        steps: form.steps.filter(s => s.trim()),
        tags: form.tags.filter(t => t.trim()),
      }
      await api.post('/api/custom', cleaned)
      toast('配方已创建 🎉')
      setForm(emptyForm())
      setShowForm(false)
      loadCustoms()
    } catch (err) {
      toast('创建失败', 'error')
    }
  }

  const addIngredient = () => setForm(f => ({ ...f, ingredients: [...f.ingredients, { name: '', amount: '', unit: '' }] }))
  const removeIngredient = (i) => setForm(f => ({ ...f, ingredients: f.ingredients.filter((_, idx) => idx !== i) }))
  const updateIngredient = (i, field, value) => {
    const updated = [...form.ingredients]
    updated[i] = { ...updated[i], [field]: value }
    setForm(f => ({ ...f, ingredients: updated }))
  }

  const addStep = () => setForm(f => ({ ...f, steps: [...f.steps, ''] }))
  const removeStep = (i) => setForm(f => ({ ...f, steps: f.steps.filter((_, idx) => idx !== i) }))
  const updateStep = (i, value) => {
    const updated = [...form.steps]
    updated[i] = value
    setForm(f => ({ ...f, steps: updated }))
  }

  return (
    <div className="form-section">
      <div className="hero" style={{ paddingBottom: '24px' }}>
        <span className="hero-emoji">✨</span>
        <h1>自创配方</h1>
        <p>创建你自己的鸡尾酒配方</p>
      </div>

      {!showForm ? (
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            ✨ 创建新配方
          </button>
        </div>
      ) : (
        <div className="form-card">
          <h3 className="section-title">基本信息</h3>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">酒名 *</label>
              <input className="form-input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="例如：落日余晖" />
            </div>
            <div className="form-group">
              <label className="form-label">英文名</label>
              <input className="form-input" value={form.name_en} onChange={e => setForm(f => ({ ...f, name_en: e.target.value }))} placeholder="Sunset Glow" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">基酒</label>
              <input className="form-input" value={form.base_spirit} onChange={e => setForm(f => ({ ...f, base_spirit: e.target.value }))} placeholder="金酒" />
            </div>
            <div className="form-group">
              <label className="form-label">风味</label>
              <input className="form-input" value={form.flavor} onChange={e => setForm(f => ({ ...f, flavor: e.target.value }))} placeholder="酸甜" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">难度</label>
              <select className="form-select" value={form.difficulty} onChange={e => setForm(f => ({ ...f, difficulty: e.target.value }))}>
                <option>入门</option><option>进阶</option><option>专业</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">杯型</label>
              <input className="form-input" value={form.glass} onChange={e => setForm(f => ({ ...f, glass: e.target.value }))} placeholder="洛克杯" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">调法</label>
              <input className="form-input" value={form.method} onChange={e => setForm(f => ({ ...f, method: e.target.value }))} placeholder="摇和" />
            </div>
            <div className="form-group">
              <label className="form-label">装饰</label>
              <input className="form-input" value={form.garnish} onChange={e => setForm(f => ({ ...f, garnish: e.target.value }))} placeholder="柠檬皮" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">故事（可选）</label>
            <input className="form-input" value={form.story} onChange={e => setForm(f => ({ ...f, story: e.target.value }))} placeholder="这款酒的灵感来源..." />
          </div>

          <h3 className="section-title" style={{ marginTop: '24px' }}>材料</h3>
          <div className="dynamic-list">
            {form.ingredients.map((ing, i) => (
              <div key={i} className="dynamic-list-item">
                <input className="form-input" placeholder="材料名" value={ing.name} onChange={e => updateIngredient(i, 'name', e.target.value)} />
                <input className="form-input" style={{ maxWidth: '80px' }} placeholder="用量" value={ing.amount} onChange={e => updateIngredient(i, 'amount', e.target.value)} />
                <input className="form-input" style={{ maxWidth: '60px' }} placeholder="单位" value={ing.unit} onChange={e => updateIngredient(i, 'unit', e.target.value)} />
                <button className="btn-icon remove" onClick={() => removeIngredient(i)}>✕</button>
              </div>
            ))}
            <button className="btn-icon add" onClick={addIngredient} style={{ alignSelf: 'flex-start' }}>＋</button>
          </div>

          <h3 className="section-title" style={{ marginTop: '24px' }}>步骤</h3>
          <div className="dynamic-list">
            {form.steps.map((step, i) => (
              <div key={i} className="dynamic-list-item">
                <span className="step-number">{i + 1}</span>
                <input className="form-input" placeholder={`步骤 ${i + 1}`} value={step} onChange={e => updateStep(i, e.target.value)} />
                <button className="btn-icon remove" onClick={() => removeStep(i)}>✕</button>
              </div>
            ))}
            <button className="btn-icon add" onClick={addStep} style={{ alignSelf: 'flex-start' }}>＋</button>
          </div>

          <h3 className="section-title" style={{ marginTop: '24px' }}>标签</h3>
          <div className="form-group">
            <input
              className="form-input"
              placeholder="用逗号分隔，例如：夏日, 派对, 清爽"
              value={form.tags.join(', ')}
              onChange={e => setForm(f => ({ ...f, tags: e.target.value.split(',').map(s => s.trim()) }))}
            />
          </div>

          <div className="detail-actions" style={{ marginTop: '24px' }}>
            <button className="btn btn-primary" onClick={handleSubmit}>✨ 保存配方</button>
            <button className="btn btn-secondary" onClick={() => { setShowForm(false); setForm(emptyForm()) }}>取消</button>
          </div>
        </div>
      )}

      <h3 className="section-title" style={{ marginTop: '32px' }}>
        我的自创配方 ({customs.length})
      </h3>
      {loading ? (
        <div className="loading">加载中</div>
      ) : customs.length === 0 ? (
        <div className="empty-state">
          <span className="emoji">📝</span>
          <h3>还没有自创配方</h3>
          <p>点击上方按钮创建你的第一杯鸡尾酒</p>
        </div>
      ) : (
        <CocktailGrid cocktails={customs} onSelect={onSelect} onFavorite={async (id) => {
          try {
            const res = await api.post(`/api/favorites/${id}`)
            toast(res.favorited ? '已收藏 ❤️' : '已取消收藏')
            loadCustoms()
          } catch { toast('操作失败', 'error') }
        }} />
      )}
    </div>
  )
}
