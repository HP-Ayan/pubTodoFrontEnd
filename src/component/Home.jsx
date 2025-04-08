import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Create from './Create';

function Home() {
  const [todo, setTodo] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  const fetchTodos = async () => {
    try {
      const result = await axios.get('http://localhost:3000/get');
      setTodo(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleMarkDone = async (id) => {
    try {
      await axios.put(`http://localhost:3000/update/${id}`);
      fetchTodos();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    const itemElement = document.getElementById(id);
    if (itemElement) {
      itemElement.classList.add('deleting');
      setTimeout(async () => {
        try {
          await axios.delete(`http://localhost:3000/delete/${id}`);
          fetchTodos();
        } catch (err) {
          console.log(err);
        }
      }, 400); // delay matches the CSS transition duration
    }
  };


  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);


  return (
    <div className={`todo-container ${darkMode ? 'dark' : ''}`}>
      <div className="header">
        <h2>Todo List</h2>
        <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <Create refreshTodos={fetchTodos} />

      {todo.length === 0 ? (
        <div className="no-todos"><h3>No records found</h3></div>
      ) : (
        todo.map((item, index) => (
          <div
            id={item._id}
            className={`todo-item ${item.done ? 'done' : 'not-done'}`}
            key={item._id || index}
          >

            <input
              type="checkbox"
              checked={item.done}
              disabled={item.done}
              onChange={() => handleMarkDone(item._id)}
            />
            <span className="todo-task">{item.task}</span>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        ))
      )}
      <div className='forUser'>
        <p>*Add your tods.</p>
        <p>*Mark the checkbox when it is done.</p>
        <p>*Delete any todo whenever you need.</p>
      </div>
    </div>
  );
}

export default Home;
