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
        <main className="flex flex-col items-center h-screen w-full">
    <section className="max-w-xl">
        <form action="" className="flex items-center border-b border-teal-500 py-2" onSubmit={handleSubmit}>
            <label htmlFor="text">Task name</label>
            <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" id="text"/>

            <label htmlFor="description">Task description</label>
            <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" id="description" />

            <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">Send</button>
            <button className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" onClick={handleCancelClick}>Cancel</button>

        </form>

    </section>
</main>
        
    )
}

export default CreateTask;
