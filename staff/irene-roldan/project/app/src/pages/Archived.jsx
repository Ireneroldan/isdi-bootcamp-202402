import React from 'react'
import TaskList from '../components/TaskList'
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'


function Archived() { 
    const [taskListKey, setTaskListKey] = useState()
    const {  boardId } = useParams()

    return (
    <div className="bg-gray-100 min-h-screen w-full flex flex-col">
        <Link to={`/boardpage/${boardId}`}>
            <button><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 14 14"><g fill="none" stroke="#333333" strokeLinecap="round" strokeLinejoin="round"><path d="m3.5 1.5l-3 3l3 3"/><path d="M.5 4.5h9a4 4 0 0 1 0 8h-5"/></g></svg></button>
        </Link>
        <h2 className="text-3xl text-gray-800 font-bold mb-4 mt-8 text-center">Archived tasks</h2>
        <div className="flex flex-col w-1/4 bg-white border-4 border-gray-300 rounded p-4 mx-auto my-0">
            <h3 className="text-center text-xl font-bold text-gray-800">Archived</h3>
            <div className="flex items-center justify-center">
                <TaskList  boardId={boardId} columnType='archived' />
            </div>
        </div>

        
    </div>
)
}

export default Archived
