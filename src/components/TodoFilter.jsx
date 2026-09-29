const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
  { key: 'overdue', label: 'Overdue' },
];

export default function TodoFilter({
  filter,
  onChange,
  activeCount,
  completedCount,
  onClearCompleted,
}) {
  return (
    <div className="todo-footer">
      <span className="todo-count">
        {activeCount} {activeCount === 1 ? 'item' : 'items'} left
      </span>

      <div className="filter-group" role="tablist" aria-label="Filter todos">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            role="tab"
            aria-selected={filter === f.key}
            className={`filter-btn ${filter === f.key ? 'active' : ''}`}
            onClick={() => onChange(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <button
        className="clear-btn"
        onClick={onClearCompleted}
        disabled={completedCount === 0}
        title={completedCount === 0 ? 'Nothing to clear' : `Clear ${completedCount} completed`}
      >
        Clear completed
      </button>
    </div>
  );
}
