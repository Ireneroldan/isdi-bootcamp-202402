import { logger } from '../utils'
import logic from '../logic'
import { useContext } from '../context'
import SubmitButton from './library/SubmitButton'
import CancelButton from './library/CancelButton'

function EditBoard(props) {
    const { showFeedback } = useContext()

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const text = form.text.value
        
        logger.debug('EditBoard -> handleSubmit', text)

        try {
            logic.modifyBoard(props.board.id, text)
                .then(() => {
                    form.reset()

                    props.onBoardEdited()
                })
                .catch(error => showFeedback(error), 'error')
        } catch (error) {
            showFeedback(error)
        }
    }

    const handleCancelClick = () => props.onCancelClick()

    logger.debug('EditBoard -> render')

    return <section className="edit-board">
    <form onSubmit={handleSubmit}>
        <label>Text</label>
        <input id="text" type="text" defaultValue={props.board.text} />

        <SubmitButton>Save</SubmitButton>
    </form>

    <CancelButton onClick={handleCancelClick} />
</section>

}
    
export default EditBoard