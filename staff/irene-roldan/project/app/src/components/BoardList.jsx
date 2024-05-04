import { logger } from '../utils'
import logic from '../logic'
import { useState, useEffect } from 'react'
import Board from './Board'

import { useContext } from '../context'

function BoardList({ stamp, onEditBoardClick }) {
    const [boards, setBoards] = useState([])
    const [sharedBoards, setSharedBoards] = useState([])

    const { showFeedback } = useContext()

    const loadBoard = () => {
        logger.debug('BoardList -> loadBoards')

        try{
            logic.retrieveBoards()
                .then((data) => setBoards(data))
                .catch(error => showFeedback(error, 'error'))
        }catch (error){
            showFeedback(error)
        }
    }

    const getSharedBoards = () => {
        logger.debug('BoardList -> getSharedBoards')

        try{
            logic.getSharedBoards()
                .then((data) => setSharedBoards(data))
                .catch(error => showFeedback(error, 'error'))
        }catch (error){
            showFeedback(error)
        }
    
    }

    useEffect(() => {
        loadBoard()
    }, [stamp])

    /*
    useEffect(() => {
        getSharedBoards()
            .then(boards => setSharedBoards(boards))
            .catch(error => console.error('Error getting shared boards:', error));
    }, [])
    */

    const handleBoardDeleted = () => loadBoard()
    const handleEditClick = board => onEditBoardClick(board)

    logger.debug('BoardList -> render')

    return (
        <div>
            <section>
                <h3>My boards</h3>
                {boards.map(board => (
                    <Board key={board.id} item={board} onEditClick={handleEditClick} onDeleted={handleBoardDeleted} />
                ))}
            </section>
    
            <section>
                <h3>Boards shared with me</h3>
                {sharedBoards.map(board => (
                    <Board key={board.id} item={board} />
                ))}
            </section>
        </div>
    )
    
}

export default BoardList