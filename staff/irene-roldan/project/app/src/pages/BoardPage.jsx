import React, { useEffect, useState } from 'react'
import logic from '../logic/index'
import { useParams, Link } from 'react-router-dom'
import { useContext } from '../context'
import { logger } from '../utils'
import EditTask from '../components/EditTask'
import ShareBoard from '../components/ShareBoard'
import ColumnList from '../components/ColumnList'


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
    const [tasksUpdated, setTasksUpdated] = useState(false);




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
                    setBoard({ text: boardText})
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
    const updateTasks = () => {
        setTasksUpdated(!tasksUpdated);
    }

    logger.debug('BoardPage -> render')

    return (
        <>
            <main className="flex flex-col items-center bg-gray-100 h-screen w-full">
            <header>
                {board && <h1 className="text-4xl text-gray-800 font-bold mb-4 mt-8 text-center">{board.text.text}</h1>} 
            </header>


    <div className="flex justify-start  mb-4">
        <button className="bg-orange-300 text-lg hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l" onClick={handleShareBoardClick}>Share Board</button> 
        <Link className="bg-orange-300 text-lg hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r" to={`/Archived/${boardId}`}>Archived</Link>  
    
    </div>
    


    <Link to="/" className="mt-4">
    <button><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 14 14"><g fill="none" stroke="#333333" strokeLinecap="round" strokeLinejoin="round"><path d="m3.5 1.5l-3 3l3 3"/><path d="M.5 4.5h9a4 4 0 0 1 0 8h-5"/></g></svg></button>
        
    </Link>
</main>



<ColumnList 
    boardId={boardId} 
    columnTypes={['todo', 'doing', 'review', 'done', 'archived']} 
    updateTasks={updateTasks} 
    tasksUpdated={tasksUpdated} 
/>

            
            {shareBoardView && <ShareBoard boardId={boardId} closeShareBoard={handleShareBoardClose}/>} 
        </>
    )
}

/*
     <div className="flex flex-col justify-center items-center w-full space-y-4">
    <div className="flex flex-col w-full h-60 border-4 border-gray-300 bg-white rounded p-4">
        <h3 className="block text-xl text-gray-800 font-bold mb-1 md:mb-0 pr-4 self-start break-words">Todo</h3>
        <TaskList key={taskListKey} boardId={boardId} columnType='todo' tasks={tasks} handleEditTask={handleEditTask} />
    </div>
*/
export default BoardPage
