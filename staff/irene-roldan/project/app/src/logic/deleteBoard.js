function deleteBoard(boardId) {
    if (typeof boardId !== 'string') throw new TypeError(`${boardId} is not a string`)

    return fetch(`${import.meta.env.VITE_API_URL}/board/${boardId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
        }
    })
        .then(res => res.json())
        .then(res => {
            if (res.error) throw new Error(res.error)

            return res
        })
}
export default deleteBoard