import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [task, setTask] = useState([]); // Use this to add and remember todo values
  const [newTaskText, setNewTaskText] = useState(''); // Use this for when user inputs a todo value
  const [complete, setComplete] = useState(false);

  useEffect(() => { // Upon rendering the application on start, fetch all the todo items
    const retrieveTodos = async () => {
      try {
        const todos = await fetch("http://localhost:4010/api/todo"); // Use api/todo to retrieve the todos with a GET request

        if (!todos.ok) {
          console.log("Can't get todos");
        }

        const response = await todos.json();
        setTask(response);
      } catch (error) {
        console.log("Can't get todos", error);
      }

    }
    retrieveTodos();
  }, []);

  const handleNewTaskText = (event) => {
    setNewTaskText(event.target.value);
  };

  const handleAddTask = async () => {
    const postData = {
      "title": newTaskText,
      "complete": false
    }

    if (newTaskText.trim() !== '') {
      try {
        const response = await fetch("http://localhost:4010/api/todo", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        })

        if (!response.ok) {
          console.log("Not able to process response");
        }

        const data = await response.json();
        console.log(data);

        setTask([...task, data]);
        setNewTaskText('');
        setComplete(false);

      } catch (error) {
        console.log("Couldn't create todo", error);
      }
    }
  };

  const handleDeleteTask = async (taskItem, index) => {
    console.log(taskItem._id);
    const deleteData = {
      "title": taskItem.title,
      "complete": taskItem.complete
    };

    try {
      const response = await fetch(`http://localhost:4010/api/todo/${taskItem._id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(deleteData)
        })

      if (!response.ok) {
        console.log("Not able to process response");
      }

      const data = await response.json();
      console.log(data);

      const updatedTasks = task.filter((taskItem, i) => i !== index);
      setTask(updatedTasks);

    } catch (error) {
      console.log("Couldn't delete todo")
    }
  }

  const updateCompleteStatus = async (taskItem) => {
    setComplete(!complete);
    const updateTodo = {
      "title": taskItem.title,
      "complete": !complete
    }

    try {
      const response = await fetch(`http://localhost:4010/api/todo/${taskItem._id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateTodo)
      });

      if (!response.ok) {
        console.log("Not able to process request");
      }

      const data = await response.json();
      console.log(data);


    } catch (error) {
      console.log("Couldn't update todo");
    }
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
            <input type='checkbox' className='checkmarkbox' onChange={() => updateCompleteStatus(taskItem)}/>
            <span className='todo-item'>{taskItem.title}</span>
          </form>
          <button className='delete-item' onClick={() => handleDeleteTask(taskItem, index)}>X</button>
        </center>
      ))}
      <center className='button-holder'>
        <button className='add-button' onClick={handleAddTask}>+</button>
      </center>
    </>
  );
}

export default App;
