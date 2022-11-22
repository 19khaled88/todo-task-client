import { useEffect, useRef, useState } from 'react'
import './App.css'
import Nav from './components/Nav/Nav'
import Title from './components/Title/Title'
import Todo from './components/Todo/Todo'

function App() {
  const [deleteModal, setDeleteModal] = useState('')
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState('')
  const [editId, setEditId] = useState('')
  const [filteredTask, setFilteredTask] = useState('')
  const [isDeleted, setIsDeleted] = useState(false)
  const [isEdited, setIsEdited] = useState(false)
  const [editModal, setEditModal] = useState('')
  const [totalTodo, setTotalTodo] = useState('')
  const [todoNum, setTodoNum] = useState('')
  const [allTask, setAllTask] = useState('')
  const [completedTask, setCompletedTask] = useState('')
  const [pendingTask, setPendingTask] = useState('')
  const [todoFound, setTodoFound] = useState('')
  const todoRef = useRef()
  const statusRef = useRef()
  const markAsRef = useRef()

  const clickDeleteHandler = (data) => {
    setDeleteModal(data.split(' ,')[0])
    setDeleteId(data.split(' ,')[1])
  }
  const clickEditHandler = (data) => {
    setEditModal(data.split(' ,')[0])
    setEditId(data.split(' ,')[1])
  }
 
  const submitEdit = () => {
    fetch('https://fastapiserverinternshala.herokuapp.com/todo', {
      method: 'PUT',
      body: JSON.stringify({ id: editId, status: markAsRef.current.value }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8', // Indicates the content
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.success === true){
          setIsEdited(true)
        }
      })
  }
  const changeStatus = (data) => {
    // fetch('https://fastapiserverinternshala.herokuapp.com/todo', {
    //   method: 'PUT',
    //   body: JSON.stringify(query),
    //   headers: {
    //     'Content-type': 'application/json; charset=UTF-8', // Indicates the content
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data))
  }

  const statsuBasedTasks = (status) => {
    setLoading(true)
    fetch(`https://fastapiserverinternshala.herokuapp.com/matchTodo/${status}`)
      .then((response) => response.json())
      .then((data) => {
        setFilteredTask(data)
        setLoading(false)
      })
  }

  const deleteSubmit = () => {
    fetch(`https://fastapiserverinternshala.herokuapp.com/todo/${deleteId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8', // Indicates the content
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // setIsDeleted(data.success)
        if(data.success === true){
          setIsDeleted(true)
        }
      })
  }

  const addTodo = () => {
    const newTodo = todoRef.current.value
    const status = statusRef.current.value

    const removedSpace = newTodo.split(/[ ,]+/).toString()



    fetch(`https://fastapiserverinternshala.herokuapp.com/todo`, {
      method: 'POST',
      body: JSON.stringify({
        todo: removedSpace,
        status: status,
        id: totalTodo + 1,
      }),
      origin: '*',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data.success))
  }

  useEffect(() => {
    fetch('https://fastapiserverinternshala.herokuapp.com/todos', {
      method: 'GET',

      origin: '*',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTodoFound(data)
        setTodoNum(Object.keys(data).length)
        setLoading(false)
        data.forEach((element, index, array) => {
          setAllTask(array.length)
          let pending = array.filter((status) => status.status === 'Pending')
            .length
          let completed = array.filter(
            (status) => status.status === 'Completed',
          ).length
          setPendingTask(pending)
          setCompletedTask(completed)
        })
      })
  }, [isDeleted,isEdited])

  return (
    <div className="App h-screen">
      <div className="mx-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md ">
        <Nav
          statsuBasedTasks={statsuBasedTasks}
          pendingTask={pendingTask}
          completedTask={completedTask}
          allTask={allTask}
        />
      </div>
      <Title />
      <div className="mx-56 h-auto bg-white relative rounded-md">
        <div className="mt-5 todo-title">
          <div className="flex flex-row mt-2 mx-5 rounded-md">
            <p className="w-3/5 py-2 text-left pl-2">Tasks</p>
            <p className="w-1/5 py-2 text-left pl-2">Status</p>
            <p className="w-1/5 py-2 text-left pl-2">Action</p>
          </div>
        </div>
        {
          <Todo
            todoFound={todoFound}
            filteredTask={filteredTask}
            clickDeleteHandler={clickDeleteHandler}
            clickEditHandler={clickEditHandler}
            todoTotal={setTotalTodo}
            isLoading={loading}
            changeStatus={changeStatus}
          />
        }

        <label
          for="my-modal-7"
          className="float-right p-2 rounded-md add-button w-40 cursor-pointer btn btn-sm"
          style={{
            boxShadow:
              'rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px',
          }}
        >
          Add Todo
        </label>
      </div>

      <input type="checkbox" id={deleteModal} className="modal-toggle" />
      <label htmlFor={deleteModal} className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <label
            htmlFor={deleteModal}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <p>Delete or Not?</p>
          <div className="flex flex-row mx-32 justify-between">
            <label
              onClick={deleteSubmit}
              htmlFor={deleteModal}
              className="py-4 text-lg font-bold text-blue-400 cursor-pointer"
            >
              Yes
            </label>
            <label
              htmlFor={deleteModal}
              className="py-4 text-red-600 text-lg font-bold cursor-pointer"
            >
              No
            </label>
          </div>
        </label>
      </label>

      <input type="checkbox" id={editModal} className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <p className="font-bold">Select Status</p>
          <label
            htmlFor={editModal}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <select className="w-3/4" id="status" name="status" ref={markAsRef}>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          <div className="modal-action">
            <label
              onClick={submitEdit}
              htmlFor={editModal}
              className="btn btn-sm"
            >
              Change Status
            </label>
          </div>
        </div>
      </div>

      <input type="checkbox" id="my-modal-7" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <p>Add New Todo</p>
          <div className="flex flex-col">
            <div className="border-1">
              <label className="w-1/4 pr-1 border-1 float-left text-left">
                Todo
              </label>
              <input
                ref={todoRef}
                className="w-3/4"
                type="text"
                placeholder="Enter your task name"
              />
            </div>
            <div className="border-1">
              <label className="w-1/4 pr-1 border-1 float-left text-left">
                Status
              </label>
              {/* <input className='w-3/4' type="text" placeholder='Select todo status' /> */}
              <select
                className="w-3/4"
                id="status"
                name="status"
                ref={statusRef}
              >
                <option value="Pending">Pending </option>
                <option value="Completed">Completed </option>
              </select>
            </div>
            <label
              htmlFor="my-modal-7"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
          </div>
          <div className="pt-2">
            <label
              onClick={addTodo}
              htmlFor="my-modal-7"
              className="btn btn-sm float-right cursor-pointer"
            >
              Submit
            </label>
          </div>
        </div>
      </div>



    </div>
  )
}

export default App
