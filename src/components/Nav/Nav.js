import React from 'react'

const Nav = ({ statsuBasedTasks, pendingTask, completedTask, allTask }) => {
  return (
    <nav className="flex flex-row justify-between p-5 mx-5 mb-5">
      <span className="w-2/4">
        <img
          src="/images/to-do-list.png"
          alt=""
          style={{ width: '45px', height: '45px' }}
        />
      </span>
      <div className="flex flex-row space-x-5 w-2/4 justify-evenly ">
        <div
          onClick={() => statsuBasedTasks('All')}
          className="relative text-white font-medium cursor-pointer p-3 rounded-lg flex-1 space-x-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-center"
        >
          All Task
          <div className="badge badge-secondary absolute -top-3 right-0 h-9 w-9">
            {allTask}
          </div>
        </div>

        <div
          onClick={() => statsuBasedTasks('Completed')}
          className="relative cursor-pointer text-white font-medium p-3 rounded-lg flex-1 space-x-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-center"
        >
          Completed Task
          <div className="badge badge-secondary absolute -top-3 right-0 h-9 w-9">
            {completedTask}
          </div>
        </div>
        <div
          onClick={() => statsuBasedTasks('Pending')}
          className="relative cursor-pointer text-white font-medium p-3 rounded-lg flex-1 space-x-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-center"
        >
          Pending Task
          <div className="badge badge-secondary absolute -top-3 right-0 h-9 w-9">
            {pendingTask}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
