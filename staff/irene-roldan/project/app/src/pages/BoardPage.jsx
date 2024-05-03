import React, { useEffect, useState } from 'react'
import logic from '../logic/index'
import { useParams, Link } from 'react-router-dom'
import { useContext } from '../context'
import AddTaskButton from '../components/library/AddTaskButton'
import CreateTask from '../components/CreateTask' 
import { logger } from '../utils'
import EditTask from '../components/EditTask'
import TaskList from '../components/TaskList'
import ShareBoard from '../components/ShareBoard'

function BoardPage() {
    const { showFeedback } = useContext()
    const [view, setView] = useState(null)
    const [board, setBoard] = useState(null)
    const [stamp, setStamp] = useState(null)
    const { taskId, boardId, columnType } = useParams()
    const [tasks, setTasks] = useState([])

    const loadTasks = () => {
        logic.retrieveTasks(boardId, columnType)
            .then(loadedTasks => {
                setTasks(loadedTasks)
            })
            .catch(error => {
                showFeedback(error, 'error')
            })
    }

    useEffect(() => {
        const fetchData = () => {
            logic.retrieveOneBoard(boardId)
                .then(boardText => {
                    setBoard({ text: boardText })
                    loadTasks()
                })
                .catch(error => {
                    showFeedback(error)
                })
        }
        
        fetchData()
    }, [boardId, columnType])

    const clearView = () => setView(null)

    const handleShareBoardClick = () => {
        setView(true)
    }

    const handleShareBoardClose = () => {
        setView(false)
    }

    const handleTaskCreated = () => {
        logic.createTask(boardId, columnType)
        .then(() => {
            loadTasks()
        })
        .catch(error => {
            showFeedback(error, 'error')
        })
    }
    
    const handleEditTask = (taskId) => {
        const taskToEdit = tasks.find(task => task.id === taskId)
        setEditingTask(taskToEdit)
        setView({ view: 'edit-task', stamp: Date.now() })
    }

    const handleCreateTaskClick = (columnType) => setView({ view: 'create-task', stamp: Date.now(), columnType: columnType })

    const handleCancelClick = () => setView({ view: null, stamp: null })

    logger.debug('BoardPage -> render')

    return (
        <>
            <header>
                {board && <h1>{board.text}</h1>} 
            </header>

            <main>
                <button onClick={handleShareBoardClick}>Share Board</button>

                <div>
                    <h3>TODO</h3>
                    <AddTaskButton columnType='todo' onAddTask={handleCreateTaskClick} />
                    <TaskList boardId={boardId} columnType='todo' tasks={tasks} handleEditTask={handleEditTask} />
                </div>

                <div>
                    <h3>DOING</h3>
                    <AddTaskButton columnType='doing' onAddTask={handleCreateTaskClick} />
                    <TaskList boardId={boardId} columnType='doing' tasks={tasks} handleEditTask={handleEditTask} />
                </div>

                <div>
                    <h3>REVIEW</h3>
                    <AddTaskButton columnType='review' onAddTask={handleCreateTaskClick} />
                    <TaskList boardId={boardId} columnType='review' tasks={tasks} handleEditTask={handleEditTask} />
                </div>

                <div>
                    <h3>DONE</h3>
                    <AddTaskButton columnType='done' onAddTask={handleCreateTaskClick} />
                    <TaskList boardId={boardId} columnType='done' tasks={tasks} handleEditTask={handleEditTask} />
                </div>

                <Link to="/">❌</Link>
                
            </main>

            {view && view.view === 'create-task' && (
                <CreateTask
                    onCancelClick={handleCancelClick}
                    onTaskCreated={() => (setView({ view: null, stamp: null }), handleTaskCreated())}
                    boardId={boardId}
                    columnType={view.columnType}
                    loadTasks={this.loadTasks}
                />
            )}
            {view && <EditTask task={view} />}
            {view && <ShareBoard closeShareBoard={handleShareBoardClose}/>}


        </>
    )
}

export default BoardPage
