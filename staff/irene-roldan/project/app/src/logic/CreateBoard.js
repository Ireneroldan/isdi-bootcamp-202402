import { validate, errors } from 'com'

function CreateBoard(text){
    if (text)
        validate.text(text, 'text')
    validate.token(sessionStorage.token)

    const board = {text}

    const json = JSON.stringify(board)

    return fetch(`${import.meta.env.VITE_API_URL}/boards`, {
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
export default CreateBoard