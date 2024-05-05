import { logger } from '../utils'
import logic from '../logic'
import { useState, useEffect } from 'react'
import { useContext } from '../context'
import EditTask from './EditTask' 

function TaskList({ boardId, columnType}) {
    const [tasks, setTasks] = useState([])
    const { showFeedback, showConfirm } = useContext()
    const [editingTask, setEditingTask] = useState(null)

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
    const handleCancelEdit = () => {
        setEditingTask(null);
    };

const handleEditTask = (updatedTask) => {
    logic.editTask(updatedTask)
        .then(() => {
            loadTasks();
            setEditingTask(null);
        })
        .catch(error => {
            showFeedback(error, 'error');
        });
}

    const onEditButtonClick = (task) => { 
        setEditingTask(task) 
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
                        <button onClick={() => onEditButtonClick(task)}>🪄</button> 
                    </li>
                ))}
            </ul>
            {editingTask && (
            <EditTask
                task={editingTask}
                onEditTask={handleEditTask}
                onCancel={handleCancelEdit}
                onUpdateTasks={loadTasks} 
            />
            )}

            
        </div>
    )
}

export default TaskList
