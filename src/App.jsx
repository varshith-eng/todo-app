import { useMemo, useState } from 'react';
import TodoForm from './components/TodoForm.jsx';
import TodoList from './components/TodoList.jsx';
import TodoFilter from './components/TodoFilter.jsx';
import TodoSearch from './components/TodoSearch.jsx';
import { useTodos } from './hooks/useTodos.js';
import { useDarkMode } from './hooks/useDarkMode.js';
import './App.css';

export default function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted } =
    useTodos();
  const { dark, toggle } = useDarkMode();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('created'); // 'created' | 'due'

  const visibleTodos = useMemo(() => {
    let list = todos;
    if (filter === 'active') list = list.filter((t) => !t.completed);
    if (filter === 'completed') list = list.filter((t) => t.completed);
    if (filter === 'overdue') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      list = list.filter((t) => {
        if (!t.dueDate || t.completed) return false;
        const [y, m, d] = t.dueDate.split('-').map(Number);
        return new Date(y, m - 1, d) < today;
      });
    }
    const q = search.trim().toLowerCase();
    if (q) list = list.filter((t) => t.text.toLowerCase().includes(q));
    const sorted = [...list];
    if (sortBy === 'due') {
      sorted.sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return b.createdAt - a.createdAt;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.localeCompare(b.dueDate);
      });
    } else {
      sorted.sort((a, b) => b.createdAt - a.createdAt);
    }
    return sorted;
  }, [todos, filter, search, sortBy]);

  const activeCount = useMemo(
    () => todos.filter((t) => !t.completed).length,
    [todos],
  );
  const completedCount = todos.length - activeCount;

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-row">
          <h1>
            TODO<span>✓</span>
          </h1>
          <button
            className="theme-toggle"
            onClick={toggle}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={dark ? 'Light mode' : 'Dark mode'}
          >
            {dark ? '☀️' : '🌙'}
          </button>
        </div>
        <p className="subtitle">
          Search, due dates + dark mode — double-click a task to edit it.
        </p>
      </header>

      <main className="todo-card">
        <TodoForm onAdd={addTodo} />
        <div className="toolbar">
          <TodoSearch
            value={search}
            onChange={setSearch}
            onClear={() => setSearch('')}
          />
          <div className="sort-group">
            <label htmlFor="sort">Sort:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="created">Newest</option>
              <option value="due">Due date</option>
            </select>
          </div>
        </div>
        <TodoList
          todos={visibleTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
          search={search.trim()}
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
