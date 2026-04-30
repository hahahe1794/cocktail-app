export default function CocktailGrid({ cocktails, onSelect, onFavorite }) {
  return (
    <div className="cocktail-grid">
      {cocktails.map(c => (
        <div key={c.id} className="cocktail-card" onClick={() => onSelect(c)}>
          <button
            className={`card-fav ${c.isFavorite ? 'active' : ''}`}
            onClick={e => { e.stopPropagation(); onFavorite(c.id) }}
          >
            {c.isFavorite ? '❤️' : '🤍'}
          </button>
          {c.matchRatio != null && (
            <span className="match-badge">
              匹配 {Math.round(c.matchRatio * 100)}%
            </span>
          )}
          <div className="card-header">
            <div>
              <div className="card-name">{c.name}</div>
              {c.name_en && <div className="card-name-en">{c.name_en}</div>}
            </div>
            <span className="card-spirit">{c.base_spirit}</span>
          </div>
          <div className="card-meta">
            <span>🥃 {c.glass}</span>
            <span>⚡ {c.difficulty}</span>
            <span>🍹 {c.method}</span>
          </div>
          {c.story && (
            <div className="card-description">{c.story}</div>
          )}
          <div className="card-tags">
            {(c.tags || []).slice(0, 4).map(tag => (
              <span key={tag} className="card-tag">{tag}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
