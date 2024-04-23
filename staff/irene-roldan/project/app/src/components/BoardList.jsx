import { logger } from '../utils'
import logic from '../logic'
import { useState, useEffect } from 'react'
import Board from './Board'

import { useContext } from '../context'

function BoardList({ stamp, onEditBoardClick }) {
    const [boards, setBoards] = useState([])

    const { showFeedback } = useContext()

    const loadBoard = () => {
        try{
            logic.retrieveBoard()
                .then(setBoards)
                .catch(error => showFeedback(error, 'error'))
        }catch(error){
            showFeedback(error)
        }
    }

    useEffect(() => {
        loadBoard()
    }, [stamp])

    const handleBoardDeleted = () => loadBoard()
    const handleEditClick = board => onEditBoardClick(board)

    return <section>
        {boards.map(board => <Board key={board.id} item={board} onEditClick={handleEditClick} onDeleted={handleBoardDeleted} />)}
    </section>
}

export default BoardList