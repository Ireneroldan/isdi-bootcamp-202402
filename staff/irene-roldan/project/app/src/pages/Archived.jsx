import React from 'react'
import useArchived from '../components/useArchived'
import TaskList from '../components/TaskList'

function Archived() {
    const archivedTasks = useArchived() 

    return (
        <div>
            <h2>Archived Tasks</h2>
            <TaskList tasks={archivedTasks} /> 
        </div>
    )
}

export default Archived
