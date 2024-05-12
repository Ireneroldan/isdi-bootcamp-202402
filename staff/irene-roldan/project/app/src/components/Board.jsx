import { logger } from '../utils'
import { Link } from 'react-router-dom'
import logic from '../logic'
import { useContext } from '../context'

function Board({ item: board, onDeleted }) {
    const { showFeedback, showConfirm } = useContext()

    const handleDeleteClick = boardId =>
        showConfirm('delete board?', confirmed => {
            if (confirmed)
                try {
                    logic.removeBoard(boardId)
                        .then(() => onDeleted())
                        .catch(error => showFeedback(error, 'error'))
                } catch (error) {
                    showFeedback('')
                }
        })


    logger.debug('Board -> render')

    return <article>
        <Link to={`/BoardPage/${board.id}`}>{board.text}</Link>        {logic.getLoggedInUserId() === board.author && <>
            <button onClick={() => handleDeleteClick(board.id)}>Delete</button>
        </>}
    </article>
}

export default Board