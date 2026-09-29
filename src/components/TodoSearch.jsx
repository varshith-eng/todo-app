export default function TodoSearch({ value, onChange, onClear }) {
  return (
    <div className="search-bar">
      <span className="search-icon" aria-hidden="true">
        🔍
      </span>
      <input
        className="search-input"
        type="text"
        placeholder="Search tasks…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search todos"
      />
      {value && (
        <button className="search-clear" onClick={onClear} aria-label="Clear search">
          ×
        </button>
      )}
    </div>
  );
}
