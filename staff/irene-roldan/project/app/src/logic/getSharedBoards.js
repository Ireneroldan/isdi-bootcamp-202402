function getSharedBoards() {
    return fetch(`${import.meta.env.VITE_API_URL}/boards/shared`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        return response.json()
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error)
    })
}
export default getSharedBoards