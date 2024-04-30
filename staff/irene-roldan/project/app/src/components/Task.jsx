import { logger } from '../utils'

import { Link } from 'react-router-dom'

import logic from '../logic'

import { useContext } from '../context'

function Task({ item: task, onEditClick, onDeleted }) {
    const { showFeedback, showConfirm } = useContext()

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

        <Link to={`/TaskPage/${task._id}`}>{task.text}</Link>        {logic.getLoggedInUserId() === task.author && <>
            <button onClick={() => handleDeleteClick(task.id)}>❌</button>
            <button onClick={() => handleEditClick(task)}>📝</button>
        </>}
    </article>
}

export default Task