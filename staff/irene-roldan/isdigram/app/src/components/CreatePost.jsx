import CancelButton from '../library/CancelButton'
import {logger, showFeedback} from '../utils'
import logic from '../logic'
import SubmitButton from '../library/SubmitButton'
import './CreatePost.sass'

function CreatePost(props) {
    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const image = form.image.value
        const text = form.text.value

        try {
            logic.CreatePost(image, text)

            form.reset()

            props.onPostCreated()
        } catch (error) {
            showFeedback(error)
        }
    }


    const handleCancelClick = () => props.onCancelClick()
    logger.debug('CreatePost -> render')

    return <section className="create-post">
        <form onSubmit={handleSubmit}>
            <label>Image</label>
            <input id="image" type="text" />

            <label>Text</label>
            <input id="text" type="text" />

            <SubmitButton>Create</SubmitButton>
        </form>

        <CancelButton onClick={handleCancelClick} />
    </section>
}
export default CreatePost