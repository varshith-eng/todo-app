import { useState } from 'react';

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  const saveEdit = () => {
    if (draft.trim() && draft.trim() !== todo.text) {
      onEdit(todo.id, draft);
    } else {
      setDraft(todo.text);
    }
    setIsEditing(false);
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <label className="todo-check">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          aria-label={`Mark "${todo.text}" as ${todo.completed ? 'active' : 'completed'}`}
        />
        <span className="checkmark" aria-hidden="true" />
      </label>

      {isEditing ? (
        <input
          className="todo-edit-input"
          value={draft}
          autoFocus
          maxLength={200}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') saveEdit();
            if (e.key === 'Escape') {
              setDraft(todo.text);
              setIsEditing(false);
            }
          }}
          aria-label="Edit todo"
        />
      ) : (
        <span
          className="todo-text"
          onDoubleClick={() => {
            setDraft(todo.text);
            setIsEditing(true);
          }}
          title="Double-click to edit"
        >
          {todo.text}
        </span>
      )}

      <div className="todo-actions">
        {!isEditing && (
          <button
            className="btn-icon"
            onClick={() => {
              setDraft(todo.text);
              setIsEditing(true);
            }}
            aria-label={`Edit "${todo.text}"`}
            title="Edit"
          >
            ✎
          </button>
        )}
        <button
          className="btn-icon danger"
          onClick={() => onDelete(todo.id)}
          aria-label={`Delete "${todo.text}"`}
          title="Delete"
        >
          ×
        </button>
      </div>
    </li>
  );
}
