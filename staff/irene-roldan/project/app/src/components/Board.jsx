import { logger } from '../utils'

import { Link } from 'react-router-dom'

import logic from '../logic'

import { useContext } from '../context'

function Board({ item: board, onEditClick, onDeleted }) {
    const { showFeedback, showConfirm } = useContext()

    const handleDeleteClick = boardId =>
        showConfirm('delete board?', confirmed => {
            if (confirmed)
                try {
                    logic.removeBoard(boardId)
                        .then(() => onDeleted())
                        .catch(error => showFeedback(error, 'error'))
                } catch (error) {
                    showFeedback(error)
                }
        })

    const handleEditClick = board => onEditClick(board)

    logger.debug('Board -> render')

    return <article>
        <h3><Link to={`/profile/${board.author}`}>{board.author}</Link></h3>

        <Link to={`/BoardPage/${board._id}`}>{board.text}</Link>        {logic.getLoggedInUserId() === board.author && <>
            <button onClick={() => handleDeleteClick(board.id)}>❌</button>
            <button onClick={() => handleEditClick(board)}>📝</button>
        </>}
    </article>
}

export default Board