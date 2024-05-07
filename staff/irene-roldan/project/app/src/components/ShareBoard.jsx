import React, { useState, useEffect, useRef } from 'react'
import logic from '../logic'

function ShareBoard({ boardId, closeShareBoard }) {
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState('')

    useEffect(() => {
        logic.retrieveUsers()
            .then(setUsers)
    }, []);

    const handleShareConfirm = (event) => {
        event.preventDefault()

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
    }

    const handleUserChange = (event) => {
        setSelectedUser(event.target.value);
    }

    return (
        <form onSubmit={handleShareConfirm}> 
            <div>
                <h2>Share Board</h2>
                <select value={selectedUser} onChange={handleUserChange}>
                    <option value="">Select User</option>
                    {users.map(user => (
                        <option key={user._id} value={user._id}>{user.email}</option>
                    ))}
                </select>
                <button type="submit">Confirm</button>
                <button onClick={handleShareCancel}>Cancel</button>
            </div>
        </form>
    )
}

export default ShareBoard
