import { validate, errors } from 'com'

function shareBoardWithUsers( boardId, userId ) {
    validate.token(sessionStorage.token)

    return fetch(`${import.meta.env.VITE_API_URL}/boards/shared`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ boardId, userId }) 
    })
    .then(res => {
        if (res.status === 201) return

        return res.json()
            .then(body => {
                const { error, message } = body

                const constructor = errors[error]

                throw new constructor(message)
            })
    })
}


export default shareBoardWithUsers