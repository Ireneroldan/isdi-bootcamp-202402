import {logger} from '../utils'

function Landing(props) {
    const handleLoginClick = event => {
        event.preventDefault()

        props.onLoginClick()
    }

    const handleRegisterClick = event => {
        event.preventDefault()

        props.onRegisterClick()
    }

    logger.debug('Landinf -> render')

    
        return <main>
            <h1>Welcome to Isdigram!</h1>
            <p>Where do you want to go?</p>
            
            <a onClick = {handleLoginClick}
            >Login</a> or <a href="" onClick = {handleRegisterClick}>Register</a>
            
        </main>
        
    
}
export default Landing