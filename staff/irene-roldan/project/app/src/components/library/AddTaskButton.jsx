import React from 'react'

function AddTaskButton({ columnType, onAddTask }) {
  const handleClick = () => {
    onAddTask(columnType)
  }

  return (
    <button onClick={handleClick}>Add new task to {columnType}</button>
  )
}

export default AddTaskButton