

const SearchBar = ({ searchQuery, setSearchQuery, searchId, setSearchId, handleSearchById, fetchUsers }) => {
  return (
    <div className="search-bar-container" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      <div className="search-input-wrapper">
        <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input 
          type="text" 
          className="search-input"
          placeholder="Filter users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="search-input-wrapper" style={{ display: 'flex', alignItems: 'center' }}>
        <input 
          type="text" 
          className="search-input"
          placeholder="Fetch by ID..."
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          style={{ borderRadius: '4px 0 0 4px', borderRight: 'none' }}
        />
        <button 
          className="btn btn-primary" 
          onClick={handleSearchById}
          style={{ borderRadius: '0 4px 4px 0', padding: '0.4rem 0.8rem', height: '100%', whiteSpace: 'nowrap' }}
        >
          Find
        </button>
      </div>
      <button 
        className="btn-icon" 
        onClick={() => { setSearchQuery(""); setSearchId(""); fetchUsers(); }} 
        title="Reset All Filters"
        style={{ padding: '0.5rem' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
          <path d="M3 3v5h5"></path>
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
