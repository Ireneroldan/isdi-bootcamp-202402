import { logger } from '../utils'
import logic from '../logic'
import { useState, useEffect } from 'react'
import { useContext } from '../context'


function TaskList({ boardId, columnType }) {
    const [tasks, setTasks] = useState([])
    const { showFeedback, showConfirm } = useContext()

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
    
    
    const handleDeleteTask = (taskId) =>
        showConfirm('Do you want delete the task?', confirmed => {
            if (confirmed)
                try {
                    logic.deleteTask(taskId)
                        .then(() => {
                            setTasks(tasks.filter(task => task.id !== taskId))
                        })
                        .catch(error => showFeedback(error, 'error'))
                } catch (error) {
                    showFeedback(error)
                }
        })

    
    const handleEditTask = (taskId) => {
        showConfirm('Do you want edit the task?', confirmed => {
            if(confirmed)
                try {
                    logic.editTask(taskId)
                        .then(() => {
                            
                        })
                } catch (error) {
                    showFeedback(error)
                }
        })
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
                        <button onClick={() => handleDeleteTask(task.id)}>🗑️</button>
                        <button onClick={() => handleEditTask(task.id)}>🪄</button>
                    </li>
                ))}
            </ul>
            {console.log(tasks)}
        </div>
    )
}

export default TaskList
