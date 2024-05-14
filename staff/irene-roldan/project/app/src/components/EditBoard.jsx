import { logger } from '../utils'
import logic from '../logic'
import { useContext } from '../context'
import SubmitButton from './library/SubmitButton'
import CancelButton from './library/CancelButton'
import React from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#root')

function EditBoard(props) {
    const { showFeedback } = useContext()
    const [modalIsOpen, setModalIsOpen] = React.useState(false);


    const handleSubmit = event => {
        event.preventDefault()
        setModalIsOpen(false)

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

    const handleCancelClick = () => {
        props.onCancelClick()
        setModalIsOpen(false)
    }


    logger.debug('EditBoard -> render')

    return (
        <section className="edit-board">
            <div style={{ border: '1px solid black', padding: '20px', borderRadius: '10px', width: '300px', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={handleCancelClick}
                    contentLabel="Edit Board Modal"
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
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }}
                >
                    <div style={{ border: '2px solid black', borderRadius: '10px', padding: '20px', width: '80%', maxWidth: '400px' }}>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="text">Text</label>
                            <input id="text" type="text" defaultValue={props.board.text} />
    
                            <SubmitButton>Save</SubmitButton>
                            <CancelButton onClick={handleCancelClick} />
                        </form>
                    </div>
                </Modal>
            </div>
        </section>
    );
    
    

}
    
export default EditBoard