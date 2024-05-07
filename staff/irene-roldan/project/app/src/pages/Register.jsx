import { logger } from '../utils'
import logic from '../logic'
import { useContext } from '../context'
import { useState } from 'react'
import Logo from '../images/logo1.png'

function Register ({onUserRegistered, onLoginClick}) {
    const { showFeedback } = useContext()
    const [showPassword, setShowPassword] = useState(false);

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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleLoginClick = event => {
            event.preventDefault()
    
            onLoginClick() 
        }

    return <main className="background-image flex flex-col items-center justify-center min-h-screen space-y-10">
    <div className="w-full md:max-w-2xl bg-gray-50 rounded-lg p-6 shadow-lg overflow-hidden flex flex-col md:flex-row md:items-center">
        <div className="w-full md:w-1/2 flex flex-col justify-between"> <div>                
                <h1 className="text-xl text-gray-500 font-bold mb-4 text-center">Create your account</h1>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4 ">
                    <div className="flex flex-col border-b border-gray-700 py-2">
                        <label htmlFor="name" className="text-gray-500 font-bold mb-2 md:mb-0">Name</label>
                        <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" id="name" /> 
                    </div>

                    <div className="flex flex-col border-b border-gray-700 py-2">
                        <label className="text-gray-500 font-bold mb-2 md:mb-0" htmlFor="surname">Surname</label>
                        <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" id="surname" /> 
                    </div>

                    <div className="flex flex-col border-b border-gray-700 py-2">
                        <label className="text-gray-500 font-bold mb-2 md:mb-0" htmlFor="email">E-mail</label>
                        <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="email" id="email" /> 
                    </div>

                    <div className="flex flex-col border-b border-gray-700 py-2">
                        <label className="text-gray-500 font-bold mb-2 md:mb-0" htmlFor="password">Password</label>
                        <div className="flex items-center">
                            <input className={showPassword ? "appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" : "appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"} type={showPassword ? "text" : "password"} id="password"/> 
                            <button onClick={togglePasswordVisibility} type="button" className="text-gray-500">{showPassword ? 'Hide' : 'Show'} </button>
                        </div>
                    </div>

                    <button className="shadow bg-gray-600 hover:bg-orange-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-3 rounded w-full md:w-auto" type="submit">Register</button>
                </form>
            </div>
        </div>
        <div className="md:block md:w-1/2 p-4 flex flex-col items-center justify-center">
            <div className="w-full flex justify-center">
            <img src={Logo} alt="logo tasking" className="w-12 h-12"/>
        </div>
            <h2 className="text-3xl text-gray-700 mb-4 text-center font-bold">Hello! Welcome to Tasking</h2>
            <p className="text-2xl text-gray-700 text-center" > We focus on making organization accessible to everyone, helping you keep your tasks in order and collaborate with others seamlessly. Join us and simplify the way you work.</p>
        </div>
    </div>
    <a className="text-white font-bold mt-6 cursor-pointer text-center" onClick={handleLoginClick}>Do you have an account? Click to go to Log In</a>

</main>


}
export default Register