import { logger } from '../utils'
import logic from '../logic'


import { useContext } from '../context'

function Login ({ onUserLoggedIn, onRegisterClick}) {

    const { showFeedback } = useContext()
    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const email = form.email.value
        const password = form.password.value

        try {
            logic.loginUser(email, password)
                .then(() => {
                    form.reset()

                    onUserLoggedIn()
                })
                .catch(error => showFeedback(error, 'error'))
        } catch (error) {
            showFeedback(error)
        }
    }

    const handleRegisterClick  = event => {
        event.preventDefault()

        onRegisterClick()
    }

    return (
        <div className="main-container">
          <main>
            <h1>Log In</h1>
            
            <form onSubmit={handleSubmit}>
                <label htmlFor="email"> E-mail </label>
                <input id="email"/>
      
                <label htmlFor="password"> Password </label>
                <input type="password" id="password" />
      
                <button type="submit"> Log In </button>
            </form>
      
            <a onClick={handleRegisterClick}>You don't have an account? Click to go to Register</a>
          </main>
          
          <section className="photo-section">
            <img src="tu-foto.jpg" />
          </section>
        </div>
      )
}

export default Login