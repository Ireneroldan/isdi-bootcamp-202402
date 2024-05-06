import React from 'react'
import TaskList from '../components/TaskList'
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'


function Archived() {
    const [taskListKey, setTaskListKey] = useState()
    const {  boardId } = useParams()


    return (
        <div>
            <div className="flex flex-col w-1/4 border border-gray-300 rounded p-4">
            <h3>Archived</h3>
            <TaskList  boardId={boardId} columnType='archived' />
        </div>
      
        </div>
    )
}

export default Archived
