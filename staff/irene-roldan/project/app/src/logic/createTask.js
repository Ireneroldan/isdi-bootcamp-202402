import { validate, errors } from 'com'

function createTask(title, description, boardId, columnType){
    validate.text(title, 'title')
    validate.text(description, 'description')
    validate.text(columnType, 'columnType')
    validate.token(sessionStorage.token)


    const task = { title, description, boardId, columnType }

    const json = JSON.stringify(task)

    return fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: json
    })
    .then(res => {
        if(res.status === 201) return
        return res.json()
            .then(body => {
                const { error, message } = body
                const constructor = errors[error]
                throw new constructor(message)
            })
    })
}

export default createTask
