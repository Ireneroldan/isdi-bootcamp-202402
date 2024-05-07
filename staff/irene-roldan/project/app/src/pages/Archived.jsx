import React from 'react'
import TaskList from '../components/TaskList'
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'


function Archived() {
    const [taskListKey, setTaskListKey] = useState()
    const {  boardId } = useParams()

    return (
        
        <div>
            <h2>Archived tasks</h2>
            <div className="flex flex-col w-1/4 border border-gray-300 rounded p-4">
                <h3>Archived</h3>
                <TaskList  boardId={boardId} columnType='archived' />
            </div>

        <Link to={`/boardpage/${boardId}`}>
            <button>Back</button>
        </Link>
        </div>
    )
}

export default Archived
