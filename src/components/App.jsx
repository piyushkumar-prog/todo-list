import { useState, useEffect } from 'react'
import Navbar from "./components/Navbar"
import { v4 as uuidv4} from 'uuid';
import { Edit3 , Trash , Check, Save } from 'react-feather';

function App() { 

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  }, [])
  

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  
  


  const handleEdit = (e, id)=>{ 
    let t = todos.filter(i=>i.id === id) 
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    saveToLS()
  }

  const handleDelete= (e, id)=>{  
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    saveToLS()
  }

  const handleAdd= ()=>{
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("") 
    saveToLS()
  }
  
  const handleChange= (e)=>{ 
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => { 
    let id = e.target.name;  
    let index = todos.findIndex(item=>{
      return item.id === id;
    }) 
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }

  return (
    <>
    <Navbar/>
    <div className="container mx-auto my-2 rounded-xl text-white p-5 bg-slate-900 min-h-[80vh] w-1/2 ">
      <div className="addtodo my-5">
        <h2 className='text-lg font-bold'>Add a Todo</h2>
        <input onChange={handleChange} value={todo} type="text" className="text-black rounded-md w-3/4 h-8"/>
      <button onClick={handleAdd} disabled={todo.length<=3} className='bg-gradient-to-r from-indigo-400 to-cyan-400 hover:bg-blue-700 p-5 py-2 disabled:bg-blue-800 text-black rounded-md mx-3 font-bold'><Check/></button>
      </div>
      <input onChange={toggleFinished} type="checkbox" checked={showFinished}/> show finished
      <h2 className="text-xl font-bold">Your Todo List</h2>
      <div className="Todos">
        {todos.length===0 && <div className='m-5'>No Todos to display</div>}
        {todos.map(item=>{
        return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-1/2 my-3 justify-between">
            <div className='flex gap-5'>
            <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted}
            id=""/>
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
          <div className="button flex h-full">
          <button onClick={(e)=>handleEdit(e,item.id)} className='bg-gradient-to-r from-indigo-400 to-cyan-400 hover:bg-blue-700 p-3 py-1 text-black rounded-md mx-3 font-bold'><Edit3/></button>
          <button onClick={(e)=>handleDelete(e,item.id)} className='bg-gradient-to-r from-indigo-400 to-cyan-400 hover:bg-blue-700 p-3 py-1 text-black rounded-md mx-3 font-bold'><Trash/></button>
          </div>
        </div>
        })}
      </div> 
    </div>
    </>
  )
}

export default App
