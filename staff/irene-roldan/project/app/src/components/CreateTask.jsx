import { logger } from '../utils';
import logic from '../logic';
import { useContext } from '../context';

function CreateTask(props) {
    const { showFeedback } = useContext();

    const handleSubmit = (event) => {
        event.preventDefault()
    
        const form = event.target
    
        const title = form.text.value
        const description = form.description.value
    
        const { boardId, columnType, loadTasks, onCancelClick } = props 
        
        try {
            logic.createTask(title, description, boardId, columnType)
                .then(() => {
                    form.reset()
                    loadTasks() 
                    onCancelClick() 
                })
                .catch(error => showFeedback(error, 'error'))
        } catch (error) {
            showFeedback(error)
        }
    }

    const handleCancelClick = () => props.onCancelClick();

    logger.debug('CreateTask -> render');

    return (
        <section>
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="text">Task name</label>
                <input type="text" id="text"/>

                <label htmlFor="description">Task description</label>
                <input type="text" id="description" />

                <button type="submit">Ok</button>
            </form>

            <button onClick={handleCancelClick}>Cancel</button>
        </section>
    )
}

export default CreateTask;
