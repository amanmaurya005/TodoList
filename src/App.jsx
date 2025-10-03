import React, { useState } from 'react'
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import  './App.css'

export default function App() {

  const [inp, setInput] = useState("");
  const [tasks, setTask] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  function addTask() {
    if (!isEditing) {
      const obj = { id: Date.now(), task: inp, completed: false };
      setTask([...tasks, obj])
    }

    else {
      setTask(
        tasks.map((obj) => {
          return obj.id === editId ? { ...obj, task: inp } : obj
        }))
      setIsEditing(false);
      setEditId(null)
    };

    setInput("")  // to clear input


  }
  console.log(tasks)

  function deleteTask(e, id) {
    const indexToDelete = tasks.findIndex((obj) => {
      return obj.id === id;
    });

    setTask(tasks.filter((obj, index) => { return index !== indexToDelete }))
  }

  function editTask(e, id) {
    const taskToEdit = tasks.find((task) => {
      return task.id === id;
    })
    setInput(taskToEdit.task)
    setIsEditing(true)
    setEditId(id)  // input edit karne k baad change ho jaaye
  }

  function markAsComplete(e, id) {
    setTask(tasks.map((obj) => {
      return obj.id === id ? { ...obj, completed: !obj.completed } : obj;
    }));
    console.log(tasks)
    
  }

  return (
    <>
      <div id="todo">
        <h1>Todo App</h1>
        <input type="text" placeholder='Enter the task' value={inp}
          onChange={(e) => setInput(e.target.value)} />
        <button id='add' onClick={addTask}>{!isEditing ? "Add Task" : "Edit Task"}</button>
      </div>

      <ul>
        {
          tasks.map((obj, index) => {
            return <li key={index} className={obj.completed ? "completed" : ""} > <span>{obj.task}</span>
              <MdDelete onClick={(e) => deleteTask(e, obj.id)} />
            {!obj.completed && (<MdModeEdit onClick={(e) => editTask(e, obj.id)} />)}  
             {!obj.completed && (<FaCheck onClick={(e) => markAsComplete(e, obj.id)} />)}  </li>
          })
        }
      </ul>

    </>
  )
}
