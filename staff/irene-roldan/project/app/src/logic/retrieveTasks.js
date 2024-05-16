import { validate, errors } from 'com'

function retrieveTasks(boardId, columnType) {
    if (typeof boardId === 'undefined' || typeof columnType === 'undefined') {
        return Promise.reject(new Error('boardId or columnType is undefined'))
    }

    validate.token(sessionStorage.token)

    return fetch(`${import.meta.env.VITE_API_URL}/boards/${boardId}/tasks/${columnType}`, {
        headers: {
            'Authorization': `Bearer ${sessionStorage.token}`
        }
    })
        .then(res => {
            if (res.status === 200)
                return res.json()

            return res.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default retrieveTasks