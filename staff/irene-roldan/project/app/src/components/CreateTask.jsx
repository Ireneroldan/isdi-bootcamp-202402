import { logger } from '../utils';
import logic from '../logic';
import { useContext } from '../context';
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root')

function CreateTask(props) {
    const { showFeedback } = useContext();
    const [modalIsOpen, setModalIsOpen] = React.useState(true);


    const handleSubmit = (event) => {
        event.preventDefault()
        setModalIsOpen(false);
    
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

    const handleCancelClick = () => {
        props.onCancelClick();
        setModalIsOpen(false)
    }

    logger.debug('CreateTask -> render');

    return (
    <div>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={handleCancelClick}
            contentLabel="Create Task Modal"
            style={{
                content: {
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    maxWidth: 'xl',
                    height: 'fit-content',
                    margin: 'auto',
                    border: 'none',
                    background: 'none',
                    overflow: 'visible',
                    padding: '0',
                },
            }}
        >
            <div style={{ border: '1px solid black', padding: '20px', borderRadius: '10px', backgroundColor: 'white'}}>
                <form action="" className="flex flex-col items-center  py-2" onSubmit={handleSubmit}>
                    <label htmlFor="text" style={{ fontSize: '1.5em'}} >Task name</label>
                    <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" id="text"/>

                    <label htmlFor="description" style={{ fontSize: '1.5em'}} >Task description</label>
                    <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" id="description" />

                    <div className="flex justify-center gap-4 mt-4">
                        <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">Send</button>
                        <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" onClick={handleCancelClick}>Cancel</button>
                    </div>
                </form>
            </div>
        </Modal>
    </div>
);
}

export default CreateTask;
