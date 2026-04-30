export default function SearchFilters({ search, onSearchChange, filters, activeFilters, onFilterChange }) {
  const filterGroups = [
    { key: 'base_spirit', label: '基酒', options: filters.spirits },
    { key: 'category', label: '分类', options: filters.categories },
    { key: 'difficulty', label: '难度', options: filters.difficulties },
    { key: 'method', label: '调法', options: filters.methods },
  ]

  return (
    <section className="search-section">
      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          placeholder="🔍 搜索酒名、英文名、故事..."
          value={search}
          onChange={e => onSearchChange(e.target.value)}
        />
      </div>
      {filterGroups.map(group => (
        group.options?.length > 0 && (
          <div key={group.key} className="filter-group">
            <div className="filter-label">{group.label}</div>
            <div className="filter-chips">
              {group.options.map(opt => (
                <button
                  key={opt}
                  className={`filter-chip ${activeFilters[group.key] === opt ? 'active' : ''}`}
                  onClick={() => onFilterChange(group.key, opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )
      ))}
      {filters.tags?.length > 0 && (
        <div className="filter-group">
          <div className="filter-label">标签</div>
          <div className="filter-chips">
            {filters.tags.map(tag => (
              <button
                key={tag}
                className={`filter-chip ${activeFilters.tag === tag ? 'active' : ''}`}
                onClick={() => onFilterChange('tag', tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
