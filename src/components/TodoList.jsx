import TodoItem from './TodoItem.jsx';

export default function TodoList({ todos, onToggle, onDelete, onEdit, search }) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-title">
          {search ? `No matches for “${search}” 🔍` : 'No tasks here 🎉'}
        </p>
        <p className="empty-sub">
          {search
            ? 'Try a different search, or clear it to see all tasks.'
            : 'Add a todo above, or change the filter.'}
        </p>
      </div>
    );
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
