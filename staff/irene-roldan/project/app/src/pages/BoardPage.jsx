import React, { useEffect, useState } from "react"
import logic from '../logic/index'
import { useParams, Link } from 'react-router-dom'
import { useContext } from '../context'
import AddTaskButton from '../components/library/AddTaskButton'
import CreateTask from '../components/CreateTask' 
import { logger } from '../utils'

function BoardPage() {
    const { showFeedback } = useContext()
    const [view, setView] = useState(null)
    const [board, setBoard] = useState(null)
    const { boardId } = useParams() 

    useEffect(() => {
        try {
            logic.retrieveOneBoard(boardId)
                .then(boardText => setBoard({ text: boardText })) 
                .catch(error => showFeedback(error, 'error'))
        } catch (error) {
            showFeedback(error)
        }
    }, [boardId]) 

    const handleCreateTaskClick = () => setView({ view: 'create-task', stamp: Date.now() })
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
                    <AddTaskButton columnType="TODO" onAddTask={handleCreateTaskClick} />
                </div>

                <div>
                    <h3>DOING</h3>
                    <AddTaskButton columnType="DOING" onAddTask={handleCreateTaskClick} />
                </div>

                <div>
                    <h3>REVIEW</h3>
                    <AddTaskButton columnType="REVIEW" onAddTask={handleCreateTaskClick} />
                </div>

                <div>
                    <h3>DONE</h3>
                    <AddTaskButton columnType="DONE" onAddTask={handleCreateTaskClick} />
                </div>

                <Link to="/">❌</Link>
            </main>

            {view && view.view === 'create-task' && <CreateTask onCancelClick={handleCreateTaskCancelClick} onTaskCreated={() => setView({ view: null, stamp: null })} />}
        </>
    )
}

export default BoardPage
