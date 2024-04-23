import { logger } from '../utils'
import logic from '../logic'
import { useContext } from '../context'

function EditBoard(props) {
    const { showFeedback } = useContext()

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const text = form.text.value

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

    return <section className="edit-board">
    <form onSubmit={handleSubmit}>
        <label>Text</label>
        <input id="text" type="text" defaultValue={props.post.text} />

        <Button>Save</Button>
    </form>

    <Button onClick={handleCancelClick} />
</section>

}
    
export default EditBoard