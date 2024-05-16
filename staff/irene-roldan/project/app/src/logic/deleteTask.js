import { validate, errors } from 'com'

function deleteTask(taskId) {
    return fetch(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
        },
    })
        .then((res) => {
            if (res.status === 200) return res.json()
            return {}
        })
        .then((body) => {
            if (body.error) {
                const constructor = errors[body.error]
                throw new constructor(body.message)
            }
        })
        .catch((error) => {
            console.error('Error deleting task:', error)
            throw error;
        });

}
export default deleteTask