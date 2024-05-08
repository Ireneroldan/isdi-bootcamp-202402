import React, { useState, useEffect } from 'react'
import logic from '../logic'
import Modal from 'react-modal'
import CancelButton from './library/CancelButton'
import SubmitButton from './library/SubmitButton'

Modal.setAppElement('#root')

function ShareBoard({ boardId, closeShareBoard }) {
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState('')
    const [modalIsOpen, setModalIsOpen] = React.useState(true);


    useEffect(() => {
        logic.retrieveUsers()
            .then(setUsers)
    }, []);

    const handleShareConfirm = (event) => {
        event.preventDefault()
        setModalIsOpen(false)

        const userId = selectedUser

        logic.shareBoardWithUsers(boardId, userId)
            .then(() => {
                closeShareBoard(false)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleShareCancel = () => {
        closeShareBoard(false)
        setModalIsOpen(false)
    }

    const handleUserChange = (event) => {
        setSelectedUser(event.target.value);
    }

    return (
        <div>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={handleShareCancel}
            contentLabel="Share Board Modal"
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
            <form onSubmit={handleShareConfirm}> 
                <div style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '1.5em', fontWeight: 'bold', marginBottom: '30px' }}>Share Board</h2>
                    <select style={{ marginBottom: '20px' }} value={selectedUser} onChange={handleUserChange} class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                        <option value="">Select User</option>
                        {users.map(user => (
                            <option key={user._id} value={user._id}>{user.email}</option>
                        ))}
                    </select>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <SubmitButton style={{ fontWeight: 'bold' }} type="submit">Confirm</SubmitButton>
                        <CancelButton style={{ fontWeight: 'bold' }} onClick={handleShareCancel}>Cancel</CancelButton>
                    </div>
                </div>
            </form>
        </Modal>
</div>
    )
}

export default ShareBoard
