import { logger } from '../utils'
import { Link } from 'react-router-dom'
import logic from '../logic'

function Board({ item: board }) {
    logger.debug('Board -> render')

    return <article>
        <Link to={`/BoardPage/${board.id}`}>{board.text}</Link>        {logic.getLoggedInUserId() === board.author && <>
        </>}
    </article>
}

export default Board