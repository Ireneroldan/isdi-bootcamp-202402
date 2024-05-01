import { logger } from '../utils'
import logic from '../logic'
import { useState, useEffect } from 'react'
import Task from './Task' 
import { useContext } from '../context'

function TaskList({ boardId, columnType }) {
    const [tasks, setTasks] = useState([])
    const { showFeedback } = useContext()

    const loadTasks = () => {
        logger.debug('TaskList -> loadTasks')

        try{
            logic.retrieveTasks(boardId, columnType)
                .then((data) => setTasks(data))
                .catch(error => showFeedback(error, 'error'))
        }catch (error){
            showFeedback(error)
        }
    }

    useEffect(() => {
        loadTasks()
    }, [boardId, columnType])

    logger.debug('TaskList -> render')

    return(
        <div>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <h4></h4>
                        <p>{task.title} - {task.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TaskList
