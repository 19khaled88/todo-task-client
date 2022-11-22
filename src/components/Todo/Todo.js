import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'
const Todo = ({
  clickDeleteHandler,
  clickEditHandler,
  success,
  todoTotal,
  isLoading,
  changeStatus,
  filteredTask,
}) => {
  const [loading, setLoading] = useState(false)
  const [todos, setTodos] = useState('')
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
        setTodos(data)
        todoTotal(Object.keys(data).length)
      })
  }, [success, todoTotal, isLoading])

  const todo = (todos) => {
    let array = []
    for (let todo in todos) {
      array.push(
        <div
          key={Object.values(todos[todo])[0]}
          className={
            Object.values(todos[todo])[0] % 2 == 0
              ? 'flex flex-row mt-1 mx-5 rounded-md bg-slate-500'
              : 'flex flex-row mt-1 mx-5 rounded-md'
          }
        >
          <p className="w-3/4 py-2 text-left pl-2">
            {Object.values(todos[todo])[1]}
          </p>
          <p className="w-1/4 py-2 text-left pl-2">
            {Object.values(todos[todo])[2]}
          </p>
          <div className="flex flex-row space-x-4 py-2">
            <label
              htmlFor="my-modal-4"
              className='cursor-pointer'
              onClick={() =>
                clickDeleteHandler(
                  `my-modal-4 ,${Object.values(todos[todo])[0]}`,
                )
              }
            >
              <img
                src="/images/delete.png"
                alt="empty"
                style={{ width: '25px', height: '25px' }}
              />
            </label>

            <label
              htmlFor="my-modal-5"
              className='cursor-pointer'
              onClick={() =>
                clickEditHandler(
                  `my-modal-5 ,${Object.values(todos[todo])[0]} ,${
                    Object.values(todos[todo])[2]
                  } `,
                )
              }
            >
              <img
                src="/images/edit.png"
                alt="empty"
                style={{ width: '25px', height: '25px' }}
              />
            </label>
          </div>
        </div>,
      )
    }
    return array
  }

  return (
    <div className="overflow-scroll h-96">
      {isLoading === true ? (
        <div className="flex flex-row h-96 justify-center items-center">
          <ReactLoading type="spin" color="#32b1e3" height={200} width={200} />
        </div>
      ) : filteredTask.length > 0 ? (
        todo(filteredTask)
      ) : (
        todo(todos)
      )}
    </div>
  )
}

export default Todo
