const CATEGORIES = ['All', 'Hatchback', 'Sedan', 'SUV', 'Sports'];

export default function FilterBar({ 
  selectedCategory, 
  onSelectCategory, 
  sortKey, 
  onSelectSort, 
  search, 
  onSearch 
}) {
  return (
    <div className="filter-bar">
      <div className="filter-container">
        <div className="filter-buttons">
          {CATEGORIES.map(cat => (
            <button 
              key={cat} 
              onClick={() => onSelectCategory(cat)} 
              className={selectedCategory === cat ? 'active' : ''}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="filter-controls">
          <input
            type="text"
            placeholder="🔍 Search cars..."
            value={search}
            onChange={onSearch}
            className="filter-search-input"
          />
          <select 
            className="filter-sort-select" 
            value={sortKey} 
            onChange={onSelectSort}
          >
            <option value="price">Sort by Price</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>
      </div>
    </div>
  );
}
