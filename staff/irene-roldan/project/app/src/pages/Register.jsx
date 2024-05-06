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

    return  <main className="background-color flex flex-col items-center justify-center min-h-screen space-y-10">
    <div className="w-full md:max-w-lg rounded-lg p-6 space-y-6 bg-gray-100 bg-opacity-95 shadow-lg overflow-hidden"> 
        <h1 className="text-2xl text-gray-500 font-bold mb-4 text-center">Create your account</h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center space-y-4">
            <div className="flex flex-col w-full md:w-auto">
                <label htmlFor="name" className="text-gray-500 font-bold mb-2 md:mb-0">Name</label>
                <input className="bg-white appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-orange-300 w-full md:w-96" type="text" id="name" /> 
            </div>

            <div className="flex flex-col w-full md:w-auto">
                <label className="text-gray-500 font-bold mb-2 md:mb-0" htmlFor="surname">Surname</label>
                <input className="bg-white appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-orange-300 w-full md:w-96" type="text" id="surname" /> 
            </div>

            <div className="flex flex-col w-full md:w-auto">
                <label className="text-gray-500 font-bold mb-2 md:mb-0" htmlFor="email">E-mail</label>
                <input className="bg-white appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-orange-300 w-full md:w-96" type="email" id="email" /> 
            </div>

            <div className="flex flex-col w-full md:w-auto">
                <label className="text-gray-500 font-bold mb-2 md:mb-0" htmlFor="password">Password</label>
                <input className="bg-white appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-orange-300 w-full md:w-96" type="password" id="password"/> 
            </div>

            <button className="shadow bg-orange-400 hover:bg-orange-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full md:w-auto" type="submit">Register</button>
        </form>
    </div>
    <a className="w-full md:w-2/3 block text-gray-500 font-bold mt-6 cursor-pointer text-center" onClick={handleLoginClick}>Do you have an account? Click to go to Log In</a>
</main>
}
export default Register