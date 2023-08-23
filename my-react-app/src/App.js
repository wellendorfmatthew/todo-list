import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [task, setTask] = useState([]); // Use this to add and remember todo values
  const [newTaskText, setNewTaskText] = useState(''); // Use this for when user inputs a todo value

  const handleNewTaskText = (event) => {
    setNewTaskText(event.target.value);
  };

  const handleAddTask = () => {
    if (newTaskText.trim() !== '') {
      setTask([...task, newTaskText]);
      setNewTaskText('');
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = task.filter((taskItem, i) => i !== index);
    setTask(updatedTasks);
  }

  return (
    <>
      <h1 className='title'>Todo List</h1>
      <center className='todo-text-holder'>
        <input type='text' 
               className='add-todo-text' 
               placeholder='Add new activity'
               value={newTaskText}
               onChange={handleNewTaskText}/>
      </center>
      {task.map((taskItem, index) => (
        <center className='container' key={index}>
          <form>
            <input type='checkbox' className='checkmarkbox'/>
            <span className='todo-item'>{taskItem}</span>
          </form>
          <button className='delete-item' onClick={() => handleDeleteTask(index)}>X</button>
        </center>
      ))}
      <center className='button-holder'>
        <button className='add-button' onClick={handleAddTask}>+</button>
      </center>
    </>
  );
}

export default App;
