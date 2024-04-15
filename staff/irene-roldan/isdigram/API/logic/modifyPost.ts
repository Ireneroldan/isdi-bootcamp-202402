import {validate, errors} from 'com'
const {SystemError, CredentialsError, NotFoundError} = errors

function modifyPost(postId: string, text: string, callback: Function) {
    validate.text(postId, 'postId', true)
    validate.text(text, 'text')
    validate.callback(callback)

    this.posts.findOne({_id: post.id})
        .then(post => {
            if(!post) {
                callback(new NotFoundError('post not found'))

                return
            }
            
        })
        .catch(error => callback(new SystemError(error.message)))

    // const post = db.posts.findOne(post => post.id === postId)

    // if (!post) throw new Error('post not found')

    // if (post.author !== sessionStorage.userId) throw new Error('post does not belong to user')

    // post.text = text

    // db.posts.updateOne(post)
}

export default modifyPost