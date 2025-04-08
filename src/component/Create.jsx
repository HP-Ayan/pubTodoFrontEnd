import axios from 'axios';
import React, { useState } from 'react';

function Create({ refreshTodos }) {
  const [task, setTask] = useState('');

  const handleAdd = async () => {
    if (!task.trim()) return; // prevent empty task

    try {
      await axios.post('http://localhost:3000/add', { task });
      setTask('');           // clear input
      refreshTodos();        // refresh list
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='create-task'>
      <input
        type='text'
        placeholder='Enter a task'
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default Create;
