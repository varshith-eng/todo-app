import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'react-todo-app:todos:v1';

function normalizeTodo(t) {
  return {
    id: t.id ?? String(Date.now()),
    text: String(t.text ?? ''),
    completed: Boolean(t.completed),
    createdAt: t.createdAt ?? Date.now(),
    // dueDate stored as 'YYYY-MM-DD' string or null
    dueDate: typeof t.dueDate === 'string' && t.dueDate ? t.dueDate : null,
  };
}

function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(normalizeTodo).filter((t) => t.text) : [];
  } catch {
    return [];
  }
}

export function useTodos() {
  const [todos, setTodos] = useState(() => loadTodos());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
      // storage may be unavailable - ignore
    }
  }, [todos]);

  const addTodo = useCallback((text, dueDate = null) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos((prev) => [
      {
        id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
        text: trimmed,
        completed: false,
        createdAt: Date.now(),
        dueDate: dueDate || null,
      },
      ...prev,
    ]);
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const editTodo = useCallback((id, newText, newDueDate) => {
    setTodos((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const next = { ...t };
        if (typeof newText === 'string') {
          const trimmed = newText.trim();
          if (trimmed) next.text = trimmed;
        }
        // newDueDate: string 'YYYY-MM-DD', null/'' to clear, undefined to keep
        if (newDueDate !== undefined) {
          next.dueDate = newDueDate || null;
        }
        return next;
      }),
    );
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  }, []);

  return { todos, addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted };
}

export function isOverdue(todo) {
  if (!todo.dueDate || todo.completed) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // dueDate is YYYY-MM-DD -> parse as local date
  const [y, m, d] = todo.dueDate.split('-').map(Number);
  const due = new Date(y, m - 1, d);
  return due < today;
}

export function formatDueDate(dueDate) {
  if (!dueDate) return '';
  const [y, m, d] = dueDate.split('-').map(Number);
  const due = new Date(y, m - 1, d);
  return due.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: due.getFullYear() === new Date().getFullYear() ? undefined : 'numeric',
  });
}
