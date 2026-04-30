import { useState } from 'react'
import { api } from '../utils/api'

export default function CocktailDetail({ cocktail: c, onClose, onFavorite, toast }) {
  const [noteText, setNoteText] = useState('')
  const [noteRating, setNoteRating] = useState(5)
  const [notes, setNotes] = useState(c.notes || [])

  const handleAddNote = async () => {
    if (!noteText.trim()) return
    try {
      await api.post(`/api/custom/${c.id}/notes`, { content: noteText, rating: noteRating })
      setNotes(prev => [{ content: noteText, rating: noteRating, created_at: new Date().toISOString() }, ...prev])
      setNoteText('')
      toast('笔记已添加')
    } catch (err) {
      toast('添加失败', 'error')
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="detail-title">{c.name}</div>
            {c.name_en && <div className="detail-subtitle">{c.name_en}</div>}
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="detail-meta">
            <div className="detail-meta-item">
              <div className="detail-meta-label">基酒</div>
              <div className="detail-meta-value">{c.base_spirit}</div>
            </div>
            <div className="detail-meta-item">
              <div className="detail-meta-label">杯型</div>
              <div className="detail-meta-value">{c.glass}</div>
            </div>
            <div className="detail-meta-item">
              <div className="detail-meta-label">调法</div>
              <div className="detail-meta-value">{c.method}</div>
            </div>
            <div className="detail-meta-item">
              <div className="detail-meta-label">难度</div>
              <div className="detail-meta-value">{c.difficulty}</div>
            </div>
            <div className="detail-meta-item">
              <div className="detail-meta-label">风味</div>
              <div className="detail-meta-value">{c.flavor}</div>
            </div>
          </div>

          <h4 className="section-title">材料</h4>
          <ul className="ingredient-list">
            {(c.ingredients || []).map((ing, i) => (
              <li key={i} className="ingredient-item">
                <span className="ingredient-name">{ing.name}</span>
                <span className="ingredient-amount">{ing.amount} {ing.unit}</span>
              </li>
            ))}
          </ul>

          <h4 className="section-title">步骤</h4>
          <ol className="step-list">
            {(c.steps || []).map((step, i) => (
              <li key={i} className="step-item">
                <span className="step-number">{i + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          {c.garnish && (
            <>
              <h4 className="section-title">装饰</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
                {c.garnish}
              </p>
            </>
          )}

          {c.story && (
            <>
              <h4 className="section-title">故事</h4>
              <div className="story-box">
                <p>{c.story}</p>
              </div>
            </>
          )}

          {c.tags && c.tags.length > 0 && (
            <div className="card-tags" style={{ marginBottom: '24px' }}>
              {c.tags.map(tag => (
                <span key={tag} className="card-tag">{tag}</span>
              ))}
            </div>
          )}

          <h4 className="section-title">笔记</h4>
          <div className="note-form">
            <input
              className="note-input"
              placeholder="写下你的调酒心得..."
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAddNote()}
            />
            <select
              className="form-select"
              style={{ width: '80px' }}
              value={noteRating}
              onChange={e => setNoteRating(Number(e.target.value))}
            >
              {[5,4,3,2,1].map(n => <option key={n} value={n}>{'⭐'.repeat(n)}</option>)}
            </select>
            <button className="btn btn-primary" onClick={handleAddNote}>添加</button>
          </div>
          {notes.length > 0 ? (
            notes.map((note, i) => (
              <div key={i} className="note-item">
                <div className="note-content">
                  {'⭐'.repeat(note.rating || 0)} {note.content}
                </div>
                <div className="note-meta">
                  {note.created_at ? new Date(note.created_at).toLocaleDateString('zh-CN') : ''}
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>暂无笔记</p>
          )}

          <div className="detail-actions">
            <button
              className="btn btn-primary"
              onClick={() => onFavorite(c.id)}
            >
              {c.isFavorite ? '❤️ 已收藏' : '🤍 收藏'}
            </button>
            <button className="btn btn-secondary" onClick={onClose}>关闭</button>
          </div>
        </div>
      </div>
    </div>
  )
}
