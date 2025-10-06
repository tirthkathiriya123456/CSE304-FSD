import React, { useState } from 'react';
import './App.css';
import Todo from './Todo';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleTask = () => {
    if (!task.trim()) return;

    if (editId) {
      setTasks(tasks.map(t => (t.id === editId ? { ...t, text: task } : t)));
      setEditId(null);
    } else {
      setTasks([...tasks, { id: Date.now(), text: task }]);
    }
    setTask('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
    if (editId === id) {
      setEditId(null);
      setTask('');
    }
  };

  const editTask = (id) => {
    const current = tasks.find(t => t.id === id);
    setTask(current.text);
    setEditId(id);
  };

  return (
    <div className="app-container">
      <h1>Get Things Done !</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="What is the task today?"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleTask}>
          {editId ? 'Update Task' : 'Add Task'}
        </button>
      </div>
      <div className="task-list">
        {tasks.map((t) => (
          <Todo key={t.id} task={t} deleteTask={deleteTask} editTask={editTask} />
        ))}
      </div>
    </div>
  );
}

export default App;