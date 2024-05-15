import { logger } from '../utils'
import SubmitButton from './library/SubmitButton'
import logic from '../logic'
import { useContext } from '../context'
import CancelButton from './library/CancelButton'

import React from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#root')

function createBoard(props) {
    const { showFeedback } = useContext()
    const [modalIsOpen, setModalIsOpen] = React.useState(false)



    const handleSubmit = event => {
        event.preventDefault()
        setModalIsOpen(false)

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

   return (
    <div>
    <Modal
        isOpen={true}
        onRequestClose={handleCancelClick}
        contentLabel="Create Board Modal"
        style={{
            content: {
                width: '50%', 
                height: '50%', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                margin: 'auto',
            },
        }}
    >
        <section className="flex items-center justify-center h-1/2">
            <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} action="" onSubmit={handleSubmit}>
                <label style={{ fontSize: '1.5em' }} htmlFor="text">Board name</label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border-2 border-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" id="name"/>

                <SubmitButton type="submit">Ok</SubmitButton><br/>
                <CancelButton onClick={handleCancelClick}>Cancel</CancelButton>
            </form>
        </section>
    </Modal>
</div>
)
}
export default createBoard