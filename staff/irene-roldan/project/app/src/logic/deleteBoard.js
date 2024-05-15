function deleteBoard(board) {
    if (typeof board.id !== 'string') throw new TypeError(`${board.id} is not a string`)
    
    if(board.assignedUsers.length === 0){
        return fetch(`${import.meta.env.VITE_API_URL}/boards/${board.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        })
        .then(res => {
            if (res.status !== 204) {
                return res.json().then(json => {
                    throw new Error(json.message || 'Error')
                })
            } else {
                return {}
            }
        })
    } else {
        const error = new Error('Cannot delete board with assigned users')
        throw error
    }
    
}

export default deleteBoard
