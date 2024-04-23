import { logger } from '../utils'
import logic from '../logic'
import { useContext } from '../context'

function Register ({onUserRegistered, onLoginClick}) {
    const { showFeedback } = useContext()
    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const surname = form.surname.value
        const email = form.email.value
        const password = form.password.value

        try {
            logic.registerUser(name, surname, email, password)
                .then(() => {
                    form.reset()

                    onUserRegistered()
                })
                .catch(error => showFeedback(error, 'error'))
        } catch (error) {
            showFeedback(error)
        }

    }

    const handleLoginClick = event => {
            event.preventDefault()
    
            onLoginClick()
        }

    return <main>
        <h1>Create your account</h1>

        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" />

            <label htmlFor="surname">Surname</label>
            <input type="text" id="surname" />

            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" />

            <label htmlFor="password">Password</label>
            <input type="passoword" id="password"/>

            <button type="submit">Register</button>
        </form>

        <a href="" onClick={handleLoginClick}>Do you have an account? Click to go to Log In</a>
    </main>
}

export default Register