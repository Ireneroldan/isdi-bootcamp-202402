import {logger, showFeedback} from '../utils'

import CancelButton from '../library/CancelButton'

import logic from '../logic'
import SubmitButton from '../library/SubmitButton'

import './EditPost.sass'

import {Component} from 'react'

function EditPost(props) {
    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const text = form.text.value

        logger.debug('EditPost -> handleSubmit', text)

        try {
            logic.modifyPost(this.props.post.id, text)

            form.reset()

            this.props.onPostEdited()
        } catch (error) {
            showFeedback(error)
        }

    }

    const handleCancelClick = () => props.onCancelClick()

        logger.debug('EditPost -> render')

        return <section className='edit-post'>
            <form onSubmit = {handleSubmit}>
                <label>Text</label>
                <input id='text' type='text' defaultValue={props.post.text} />

                <SubmitButton>Save</SubmitButton>

            </form>

            <CancelButt onClick={handleCancelClick}>Cancel</CancelButt>
        </section>
    
}

export default EditPost