import React, { useState, useEffect } from 'react'
import logic from '../logic'

function ShareBoard({ closeShareBoard}) {
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState('')

    useEffect(() => {
        logic.retrieveUsers().then(setUsers)
    }, []);

    const handleShareConfirm = () => {
        // Aquí es donde llamarías a tu API para compartir el tablero con el usuario.
        // Por ejemplo: logic.shareBoardWithUser(boardId, selectedUser);
    };

    const handleShareCancel = () => {
        closeShareBoard(false)
    }

    return (
        <div>
            <h2>Share Board</h2>
            <select value={selectedUser} onChange={e => setSelectedUser(e.target.value)}>
                {users.map(user => (
                    <option key={user.id} value={user.id}>{user.email}</option>
                ))}
            </select>
            <button onClick={handleShareConfirm}>Confirm</button>
            <button onClick={handleShareCancel}>Cancel</button>
        </div>
    );
}

export default ShareBoard