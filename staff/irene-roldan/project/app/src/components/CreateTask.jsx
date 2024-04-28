import { logger } from '../utils'
import SubmitButton from './library/SubmitButton'
import logic from '../logic'
import { useContext } from '../context'
import CancelButton from './library/CancelButton'
import Board from './Board'


function createTask(props) {
    const { showFeedback } = useContext()

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const title = form.text.value
        const description = form.description.value
        
        try {
            const { boardId } = props
            logic.createTask(title, description, boardId)
                .then(() => {
                    form.reset()

                    props.onTaskCreated()
                })
            .catch(error => showFeedback(error, 'error'))
        } catch (error) {
            showFeedback(error)
        }
    }

    const handleCancelClick = () => props.onCancelClick()

    logger.debug('CreateTask -> render')

    return <section>
        <form action="" onSubmit={handleSubmit}>
            <label htmlFor="text">Task name</label>
            <input type="text" id="text"/>

            <label htmlFor="description">Task description</label>
            <input type="text" id="description" />

            <SubmitButton type="submit">Ok</SubmitButton>
        </form>

        <CancelButton onClick={handleCancelClick}>Cancel</CancelButton>
    </section>

}
export default createTask