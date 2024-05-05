import { validate, errors } from 'com'

function editTask(taskId, title, description, columnType) {

    const task =  JSON.stringify({ title, description, columnType })
    return fetch(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.token}`,
        },
        body:task,
    })
    .then(response => {
        if (response.status === 204) {
            return { message: 'The task was successfully updated' }
        } else {
            return response.text().then(text => {
                return text ? JSON.parse(text) : {}
            }).then(body => {
                if (body.error) {
                    const constructor = errors[body.error]
                    throw new constructor(body.message)
                }
            })
        }
    })
    .catch(error => {
        console.error('Error editing task:', error)
        throw error
    })
}

export default editTask
