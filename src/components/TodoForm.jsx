import { useState } from 'react';

export default function TodoForm({ onAdd }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onAdd(value);
    setValue('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        className="todo-input"
        type="text"
        placeholder="What needs to be done?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={200}
        aria-label="New todo"
      />
      <button className="btn btn-primary" type="submit" disabled={!value.trim()}>
        Add
      </button>
    </form>
  );
}
