import logic from '../logic'
import '../index.css'
import Logo from '../images/logo1.png'


import { useContext } from '../context'

function Login({ onUserLoggedIn, onRegisterClick }) {

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

    const handleRegisterClick = event => {
        event.preventDefault()

        onRegisterClick()
    }

    return (
        <main className="background-image">
            <div className="relative flex flex-col justify-center items-center h-screen">
                <div className="w-96 h-96 bg-gray-100 bg-opacity-95 shadow-lg rounded-lg overflow-hidden">
                    <main className="bg-gray-100 flex flex-col justify-center items-center h-full">
                        <img src={Logo} alt="logo tasking" className="m-4 w-12 h-12" />
                        <h1 className="text-2xl text-gray-500 font-bold mb-4">Log In</h1>
                        <form onSubmit={handleSubmit} className="w-full max-w-xs flex flex-col items-center">
                            <label htmlFor="email" className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4 self-start"> E-mail </label>
                            <input id="email" className="bg-gray-00 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-300 mb-4" autoComplete="email" />

                            <label htmlFor="password" className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4 self-start"> Password </label>
                            <input type="password" id="password" className="bg-gray-00 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-300 mb-4" autoComplete="current-password" />

                            <button type="submit" className="shadow bg-gray-600 hover:bg-orange-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-3 rounded w-full md:w-auto"> Log In </button>
                        </form>
                    </main>
                </div>
                <a onClick={handleRegisterClick} className="block text-center text-white font-bold mt-4 cursor-pointer">You don't have an account? Click to go to Register</a>
            </div>
        </main>
    )
}

export default Login