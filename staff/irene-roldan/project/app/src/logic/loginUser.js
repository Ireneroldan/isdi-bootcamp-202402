function loginUser(email, password) {
    const user = { email, password }

    const json = JSON.stringify(user)

    return fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: json
    })
        .then(res => {
            if (res.status === 200) {
                return res.json()
                    .then(token => {
                        sessionStorage.token = token
                    })
            } else {
                return res.json()
                    .then(body => {
                        const { error, message } = body

                        if (error === "Wrong password") {
                            throw new Error("wrong password")
                        } else if (error === "user not found") {
                            throw new Error("Incorrect credentials")
                        } else {
                            throw new Error(message)
                        }
                    })
            }
        })
}

export default loginUser
