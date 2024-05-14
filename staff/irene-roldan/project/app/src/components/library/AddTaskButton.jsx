import React from 'react'

function AddTaskButton({ columnType, onAddTask }) {
  const handleClick = () => {
    onAddTask(columnType)
  }

  return (
    <button className="py-2 px-4 rounded inline-flex items-center" onClick={handleClick}><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 16 16"><g fill="#000000"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/></g></svg></button>
  )
}

export default AddTaskButton