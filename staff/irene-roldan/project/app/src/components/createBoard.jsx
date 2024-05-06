import { logger } from '../utils'
import SubmitButton from './library/SubmitButton'
import logic from '../logic'
import { useContext } from '../context'
import CancelButton from './library/CancelButton'


function createBoard(props) {
    const { showFeedback } = useContext()

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const text = form.name.value
        
        try {
            logic.CreateBoard(text)
                .then(() => {
                    form.reset()

                    props.onBoardCreated()
                })
            .catch(error => showFeedback(error, 'error'))
        } catch (error) {
            showFeedback(error)
        }
    }

    const handleCancelClick = () => props.onCancelClick()

    logger.debug('CreatePost -> render')

    return <section>
        <form action="" onSubmit={handleSubmit}>
            <label htmlFor="text">Project name</label>
            <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"type="text" id="name"/>

            <SubmitButton type="submit">Ok</SubmitButton>
        </form>

        <CancelButton onClick={handleCancelClick}>Cancel</CancelButton>
    </section>
    
}
export default createBoard