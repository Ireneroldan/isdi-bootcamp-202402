import React, { useEffect, useState } from 'react'
import logic from '../logic/index'
import { useParams, Link } from 'react-router-dom'
import { useContext } from '../context'
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
    const [editTaskView, setEditTaskView] = useState(null);
    const [shareBoardView, setShareBoardView] = useState(false)
    const [taskListKey, setTaskListKey] = useState(Date.now())



    const loadTasks = () => {
        logic.retrieveTasks(boardId, view?.columnType || null)
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
    
        fetchData();
    }, [boardId, columnType])
    

    const handleShareBoardClick = () => {
        setShareBoardView(true)
    }

    const handleShareBoardClose = () => {
        setShareBoardView(false)
    }

    
    const handleEditTask = (taskId) => {
        const taskToEdit = tasks.find(task => task.id === taskId);
        setEditTaskView(taskToEdit);
        setView({ view: 'edit-task', stamp: Date.now() });
        logic.retrieveTasks(boardId, columnType)
            .then(loadedTasks => {
                setTasks(loadedTasks);
            })
            .catch(error => {
                showFeedback(error, 'error');
            });
    }

    logger.debug('BoardPage -> render')

    return (
        <>
            <header>
                {board && <h1 className="text-2xl text-gray-800 font-bold mb-4">{board.text}</h1>} 
            </header>

            <main className="flex flex-col items-center">
    <div className="flex justify-start space-x-4 mb-4">
        <button onClick={handleShareBoardClick}>Share Board</button> 
        <Link to={`/Archived/${boardId}`}>Archived</Link>  
    </div>

    <div className="flex flex-wrap justify-center space-x-4">
        <div className="flex flex-col w-1/4 border border-gray-300 rounded p-4">
            <h3>TODO</h3>
            <TaskList key={taskListKey} boardId={boardId} columnType='todo' tasks={tasks} handleEditTask={handleEditTask} />
        </div>

        <div className="flex flex-col w-1/4 border border-gray-300 rounded p-4">
            <h3>DOING</h3>
            <TaskList boardId={boardId} columnType='doing' tasks={tasks} handleEditTask={handleEditTask} />
        </div>

        <div className="flex flex-col w-1/4 border border-gray-300 rounded p-4">
            <h3>REVIEW</h3>
            <TaskList boardId={boardId} columnType='review' tasks={tasks} handleEditTask={handleEditTask} />
        </div>

        <div className="flex flex-col w-1/4 border border-gray-300 rounded p-4">
            <h3>DONE</h3>
            <TaskList boardId={boardId} columnType='done' tasks={tasks} handleEditTask={handleEditTask} />
        </div>
    </div>

    <Link to="/" className="mt-4">
    <button>Back</button>
        
    </Link>
</main>





            
            {editTaskView && <EditTask task={editTaskView} />}
            {shareBoardView && <ShareBoard boardId={boardId} closeShareBoard={handleShareBoardClose}/>} 
        </>
    )
}

export default BoardPage
