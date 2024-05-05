import { logger } from '../utils'

import { Link } from 'react-router-dom'

import logic from '../logic'

import { useContext } from '../context'

function Board({ item: board, onEditClick, onDeleted }) {
    const { showFeedback, showConfirm } = useContext()
    const { title } = board

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


    logger.debug('Board -> render')

    return <article>
        <Link to={`/BoardPage/${board._id}`}>{board.text}</Link>        {logic.getLoggedInUserId() === board.author && <>
            <button onClick={() => handleDeleteClick(board.id)}>Delete</button>
        </>}
    </article>
}

export default Board