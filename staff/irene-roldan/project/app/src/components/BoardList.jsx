import { logger } from '../utils'
import logic from '../logic'
import { useState, useEffect } from 'react'
import Board from './Board'

import { useContext } from '../context'

function BoardList({ stamp, onEditBoardClick }) {
    const [boards, setBoards] = useState([])

    const { showFeedback } = useContext()

    const loadBoard = () => {
        logger.debug('PostList -> loadPosts')

        try{
            logic.retrieveBoards()
                .then((data) => setBoards(data))
                .catch(error => showFeedback(error, 'error'))
        }catch (error){
            showFeedback(error)
        }
    }

    useEffect(() => {
        loadBoard()
    }, [stamp])

    const handleBoardDeleted = () => loadBoard()
    const handleEditClick = board => onEditBoardClick(board)

    logger.debug('PostList -> render')

    return <section>
        {boards.map(board => <Board key={board.id} item={board} onEditClick={handleEditClick} onDeleted={handleBoardDeleted} />)}
    </section>
}

export default BoardList