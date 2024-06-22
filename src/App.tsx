import { useState } from "react"
import './App.css'
import NewTask from "./NewTask"

const URL = "https://665665e69f970b3b36c5413f.mockapi.io/tasks"

function App() {
  const [tasks, setTasks] = useState( [] ) 
  
  const fetchTasks = async () => {
    const response = await fetch(URL)
    // console.log(response)
    const data = await response.json()
    // console.log(data)
    setTasks(data)
  }


  const deleteTask = async (taskId) => {

    // removed from backend
    await fetch(URL + "/" + taskId, {
      method: "DELETE"
    }) 

    // removed from front end
    setTasks(tasks.filter(
      task => task.id !== taskId
    ))

  }

  const addTask = async (newTask) => {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask)
    })
    // The newlyCreatedTask will have a new id
    const newlyCreatedTask = await response.json()

    // update the frontend
    setTasks([ ...tasks, newlyCreatedTask ])
  }


  return (
    <div className="m-3">
    <h1>To-Do List</h1>
    <NewTask addTask= {addTask}/>
    <button onClick={fetchTasks}>Display Tasks</button>
    {
      tasks.map(task => (
        <div key={task.id} className="m-3">
          <input type="checkbox" onChange={() => deleteTask(task.id)}/> {task.text}
        </div>
      ))
    }
    </div>
  )
}

export default App
