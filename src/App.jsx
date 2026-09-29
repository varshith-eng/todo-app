import { useMemo, useState } from 'react';
import TodoForm from './components/TodoForm.jsx';
import TodoList from './components/TodoList.jsx';
import TodoFilter from './components/TodoFilter.jsx';
import { useTodos } from './hooks/useTodos.js';
import './App.css';

export default function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted } =
    useTodos();
  const [filter, setFilter] = useState('all');

  const visibleTodos = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.completed);
    if (filter === 'completed') return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  const activeCount = useMemo(
    () => todos.filter((t) => !t.completed).length,
    [todos],
  );
  const completedCount = todos.length - activeCount;

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>
          TODO<span>✓</span>
        </h1>
        <p className="subtitle">
          React + Vite + localStorage — double-click a task to edit it.
        </p>
      </header>

      <main className="todo-card">
        <TodoForm onAdd={addTodo} />
        <TodoList
          todos={visibleTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
        {todos.length > 0 && (
          <TodoFilter
            filter={filter}
            onChange={setFilter}
            activeCount={activeCount}
            completedCount={completedCount}
            onClearCompleted={clearCompleted}
          />
        )}
      </main>

      <footer className="app-footer">
        <span>
          {todos.length} total • {completedCount} done • stored in your browser
        </span>
      </footer>
    </div>
  );
}
