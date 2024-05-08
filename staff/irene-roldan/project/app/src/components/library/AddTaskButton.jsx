import React from 'react'

function AddTaskButton({ columnType, onAddTask }) {
  const handleClick = () => {
    onAddTask(columnType)
  }

  return (
    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" onClick={handleClick}>Add new task</button>
  )
}

export default AddTaskButton