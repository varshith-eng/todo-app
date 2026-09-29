import { useState } from 'react';
import { formatDueDate, isOverdue } from '../hooks/useTodos.js';

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const [draftDate, setDraftDate] = useState(todo.dueDate || '');

  const overdue = isOverdue(todo);

  const saveEdit = () => {
    const textChanged = draft.trim() && draft.trim() !== todo.text;
    const dateChanged = (draftDate || null) !== (todo.dueDate || null);
    if (textChanged || dateChanged) {
      onEdit(todo.id, draft, draftDate || null);
    } else {
      setDraft(todo.text);
      setDraftDate(todo.dueDate || '');
    }
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setDraft(todo.text);
    setDraftDate(todo.dueDate || '');
    setIsEditing(false);
  };

  return (
    <li
      className={`todo-item ${todo.completed ? 'completed' : ''} ${overdue ? 'overdue' : ''}`}
    >
      <label className="todo-check">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          aria-label={`Mark "${todo.text}" as ${todo.completed ? 'active' : 'completed'}`}
        />
        <span className="checkmark" aria-hidden="true" />
      </label>

      <div className="todo-main">
        {isEditing ? (
          <div className="todo-edit-row">
            <input
              className="todo-edit-input"
              value={draft}
              autoFocus
              maxLength={200}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') saveEdit();
                if (e.key === 'Escape') cancelEdit();
              }}
              aria-label="Edit todo"
            />
            <input
              className="todo-date small"
              type="date"
              value={draftDate}
              onChange={(e) => setDraftDate(e.target.value)}
              aria-label="Edit due date"
            />
          </div>
        ) : (
          <span
            className="todo-text"
            onDoubleClick={() => {
              setDraft(todo.text);
              setDraftDate(todo.dueDate || '');
              setIsEditing(true);
            }}
            title="Double-click to edit"
          >
            {todo.text}
          </span>
        )}

        {!isEditing && todo.dueDate && (
          <span
            className={`due-badge ${overdue ? 'due-overdue' : todo.completed ? 'due-done' : ''}`}
            title={overdue ? 'Overdue!' : `Due ${todo.dueDate}`}
          >
            📅 {formatDueDate(todo.dueDate)}
            {overdue ? ' • overdue' : ''}
          </span>
        )}

        {isEditing && (
          <div className="todo-edit-actions">
            <button className="mini-btn save" onClick={saveEdit}>
              Save
            </button>
            <button className="mini-btn" onClick={cancelEdit}>
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="todo-actions">
        {!isEditing && (
          <button
            className="btn-icon"
            onClick={() => {
              setDraft(todo.text);
              setDraftDate(todo.dueDate || '');
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
