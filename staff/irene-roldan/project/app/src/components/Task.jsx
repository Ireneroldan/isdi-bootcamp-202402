import { logger } from '../utils'

import { Link } from 'react-router-dom'

import logic from '../logic'

function Task({ item: task, onEditClick, onDeleted }) {
    

    const handleDeleteClick = taskId =>
        showConfirm('delete task?', confirmed => {
            if (confirmed)
                try {
                    logic.removeTask(taskId)
                        .then(() => onDeleted())
                        .catch(error => showFeedback(error, 'error'))
                } catch (error) {
                    showFeedback(error)
                }
    })

    const handleEditClick = board => onEditClick(board)

    logger.debug('Task -> render')

    return <article>
        <h3><Link to={`/profile/${task.author}`}>{task.author}</Link></h3>
    </article>
}

export default Task