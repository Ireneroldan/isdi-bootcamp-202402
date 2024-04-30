import React, { useEffect, useState } from "react"
import logic from '../logic/index'
import { useParams, Link } from 'react-router-dom'
import { useContext } from '../context'
import AddTaskButton from '../components/library/AddTaskButton'
import CreateTask from '../components/CreateTask' 
import { logger } from '../utils'
import TaskList from "../components/TaskList"

function BoardPage() {
    const { showFeedback } = useContext()
    const [view, setView] = useState(null)
    const [board, setBoard] = useState(null)
    const [stamp, setStamp] = useState(null)
    const { userId, taskId, boardId } = useParams() 
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        try {
            logic.retrieveOneBoard(boardId)
                .then(boardText => setBoard({ text: boardText })) 
                .catch(error => showFeedback(error, 'error'))
                
                logic.retrieveTasks(userId, taskId)
                .then(tasks => {
                    console.log(tasks)
                    setTasks(tasks)
    
                })
                .catch(error => showFeedback(error, 'error'))

        } catch (error) {
            showFeedback(error)
        }
    }, [boardId, userId, taskId]) 

    const clearView = () => setView(null)


    const handleTaskCreated = () => {
        clearView()
        setStamp(Date.now())
        setTasks([])
    }

    const handleCreateTaskClick = (columnType) => setView({ view: 'create-task', stamp: Date.now(), columnType: columnType })
    const handleCreateTaskCancelClick = () => setView({ view: null, stamp: null })

    logger.debug('BoardPage -> render')
    return (
        <>
            <header>
                {board && <h1>{board.text}</h1>} 
            </header>

            <main>
                <div>
                    <h3>TODO</h3>
                    <AddTaskButton columnType='todo' onAddTask={handleCreateTaskClick} />
                    <TaskList userId={userId} taskId={taskId} />
                    
                </div>

                <div>
                    <h3>DOING</h3>
                    <AddTaskButton columnType='doing' onAddTask={handleCreateTaskClick} />
                    <TaskList userId={userId} taskId={taskId} />
                </div>

                <div>
                    <h3>REVIEW</h3>
                    <AddTaskButton columnType='review' onAddTask={handleCreateTaskClick} />
                    <TaskList userId={userId} taskId={taskId} />
                </div>

                <div>
                    <h3>DONE</h3>
                    <AddTaskButton columnType='done' onAddTask={handleCreateTaskClick} />
                    <TaskList userId={userId} taskId={taskId} />
                </div>

                <Link to="/">❌</Link>
            </main>

            {view && view.view === 'create-task' && (
            <CreateTask
                onCancelClick={handleCreateTaskCancelClick}
                onTaskCreated={() => (setView({ view: null, stamp: null }), handleTaskCreated())}
                boardId={boardId}
                columnType = {view.columnType}
            />
            )}


        </>
    )
}

export default BoardPage
