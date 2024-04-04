import { Component } from 'react'
import {showFeedback} from '../utils/index.mjs'
import logic from '../logic.mjs'

class CreatePost extends Component {
    constructor(){
        super()

    }

    render(){
        return  <section id="create-post-section">
        <h3>Create a post</h3>
        <form onSubmit={event =>{
            event.preventDefault()

            const form = event.target

            const image = form.image.value
            const text = form.text.value
            
            try {
                logic.createPost(image, text)

                form.reset()

                this.onPostCreated()

            } catch (error) {
                showFeedback(error)
            }
        }}> 
            <label htmlFor="image">Image</label>
            <input type="text" id="image"/>

            <label htmlFor="text">Text</label>
            <input type="text" id="text"/>

            <button type="submit" className="submit-button">Add</button>

            <button onClick={() => this.props.onCancelClick()}>
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20"><path d="m12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm3.707,14.293c.391.391.391,1.023,0,1.414-.195.195-.451.293-.707.293s-.512-.098-.707-.293l-2.293-2.293-2.293,2.293c-.195.195-.451.293-.707.293s-.512-.098-.707-.293c-.391-.391-.391-1.023,0-1.414l2.293-2.293-2.293-2.293c-.391-.391-.391-1.023,0-1.414s1.023-.391,1.414,0l2.293,2.293,2.293-2.293c.391-.391,1.023-.391,1.414,0s.391,1.023,0,1.414l-2.293,2.293,2.293,2.293Z"/>
                </svg>
            </button>
        </form>

    </section>
        
    }
}
export default CreatePost