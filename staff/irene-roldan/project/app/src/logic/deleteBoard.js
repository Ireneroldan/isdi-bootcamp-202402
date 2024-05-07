function deleteBoard(board) {
    if (typeof board._id !== 'string') throw new TypeError(`${board._id} is not a string`)
    
    if(board.assignedUsers.length === 0){
        return fetch(`${import.meta.env.VITE_API_URL}/board/${board._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        })
        .then(res => {
            if (res.status !== 204) {
                return res.json().then(json => {
                    throw new Error(json.message || 'Error desconocido')
                })
            } else {
                return {}
            }
        })
    } else {
        return Promise.resolve(showFeedback('hay usuarios en el tablero', 'error'))
    }
    
}

export default deleteBoard
