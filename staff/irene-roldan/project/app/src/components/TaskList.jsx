import { logger } from '../utils'
import logic from '../logic'
import { useState, useEffect } from 'react'
import { useContext } from '../context'
import EditTask from './EditTask' 
import AddTaskButton from '../components/library/AddTaskButton'
import CreateTask from '../components/CreateTask' 

function TaskList({ boardId, columnType}) {
    const [tasks, setTasks] = useState([])
    const { showFeedback, showConfirm } = useContext()
    const [editingTask, setEditingTask] = useState(null)
    const [view, setView] = useState(null)
    const [tasksUpdated, setTasksUpdated] = useState(false)

    const handleCreateTaskClick = (columnType) => setView({ view: 'create-task', stamp: Date.now(), columnType: columnType })

    const loadTasks = () => {
        logger.debug('TaskList -> loadTasks')
        try {
            logic.retrieveTasks(boardId, columnType)
                .then((data) => setTasks(data))
                .catch(error => showFeedback(error, 'error'))
        } catch (error) {
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
        setEditingTask(null)
    };

    const onEditButtonClick = (task) => { 
        setEditingTask(task) 
    }
    
    const handleCancelClick = () => setView({ view: null, stamp: null })

    useEffect(() => { 
        loadTasks()
    }, [boardId, columnType])

    useEffect(() => {
        if (tasksUpdated) {
            loadTasks()
            setTasksUpdated(false)
        }
    }, [tasksUpdated])

    logger.debug('TaskList -> render')

    return (
        <div>
            <ul>
                {tasks.map(task => (
                    <li key={task.id} className="border-2 border-gray-300 p-4 rounded inline-block mx-auto w-64">
                        <p className="text-center text-lg font-bold  overflow-hidden">{task.title}</p>
                        <p className="text-center overflow-hidden">{task.description}</p>
                        
                        <div className="flex items-center justify-center">
                            <button onClick={() => handleDeleteTask(task.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
                                    <path fill="#333333" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"/>
                                </svg>
                            </button>
                            <button onClick={() => onEditButtonClick(task)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24">
                                    <path fill="#333333" d="M6 22q-.825 0-1.412-.587T4 20V4q0-.825.588-1.412T6 2h7.175q.4 0 .763.15t.637.425l4.85 4.85q.275.275.425.638t.15.762V10.4q0 .275-.162.475t-.413.3q-.4.15-.763.388T18 12.1l-5.4 5.4q-.275.275-.437.638T12 18.9V21q0 .425-.288.713T11 22zm8-1v-1.65q0-.2.075-.387t.225-.338l5.225-5.2q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55t-.1.563t-.325.512l-5.2 5.2q-.15.15-.337.225T16.65 22H15q-.425 0-.712-.287T14 21m6.575-4.6l.925-.975l-.925-.925l-.95.95zM14 9h4l-5-5l5 5l-5-5v4q0 .425.288.713T14 9"/>
                                </svg>
                            </button> 
                        </div>
                    </li>
                ))}
            </ul>
            {columnType !== 'archived' && (
                <AddTaskButton columnType={columnType} onAddTask={handleCreateTaskClick} />
            )}
            {editingTask && (
                <EditTask
                    task={editingTask}
                    onCancel={handleCancelEdit}
                    onUpdateTasks={loadTasks}
                />
            )}
            
            {view && view.view === 'create-task' && (
                <CreateTask
                    onCancelClick={handleCancelClick}
                    onTaskCreated={() => (setView({ view: null, stamp: null }), handleTaskCreated())}
                    boardId={boardId}
                    columnType={view.columnType}
                    loadTasks={loadTasks}
                />
            )}
        </div>
    )
    
}

export default TaskList
