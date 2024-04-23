import { logger } from '../utils'

import logic from '../logic'
import { useContext } from '../context'

function createBoard(props) {
    const { showFeedback } = useContext()

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const text = form.text.value
        
        try {
            logic.CreateBoard(text)

            props.onBoardCreated()
            .catch(error => showFeedback(error, 'error'))
        } catch (error) {
            showFeedback(error)
        }
    }

    const handleCancelClick = () => props.onCancelClick()

    return <section>
        <form action="" onSubmit={handleSubmit}>
            <label for="text">Project name</label>
            <input type="text" id='text'/>

            <button>Ok</button>
        </form>

        <button onClick={handleCancelClick}>Cancel</button>
    </section>

}
export default createBoard