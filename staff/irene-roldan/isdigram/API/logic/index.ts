//@ts-nocheck

import { ObjectId } from "mongodb"
import {validate, errors } from 'com'

const {DuplicityError, SystemError} = errors

function registerUser(name: string, birthdate: string, email: string, username: string, password: string, callback: Function) {
    validateText(name, 'name')
    validateDate(birthdate, 'birthdate')
    validateEmail(email)
    validateText(username, 'username', true)
    validatePassword(password)
    validateCallback(callback)

    this.users.findOne({ $or: [{ email }, { username }] })
        .then(user => {
            if (user) {
                callback(new DuplicityError('user already exists'))

                return
            }

            user = {
                name: name.trim(),
                birthdate: birthdate,
                email: email,
                username: username,
                password: password,
                status: 'offline',
            }

            this.users.insertOne(user)
                .then(() => callback(null))
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}

function loginUser(username: string, password: string, callback: Function) {
    validateText(username, 'username', true)
    validatePassword(password)
    validateCallback(callback)

    this.users.findOne({username})
        .then(user => {
            if (!user) {
                callback(new Error('user not found'))
    
                return
            }
    
            if (user.password !== password) {
                callback(new Error('wrong password'))
    
                return
            }

            this.users.updateOne({_id:user._id}, {$set: {status: 'online'}}
                .then(() => callback(null, user._id.toString()))
                .catch(error => callback(error))
            )
        })
        .catch(error => callback(error))
}
    
function retrieveUser(userId: string, targetUserId: string, callback: Function) {
    validate.text(userId, 'userId', true)
    validate.text(targetUserId, 'targetUserId', true)
    validate.callback(callback)

    this.users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) {
                callback(new Error('user not found'))

                return
            }

            this.users.findOne({ _id: new ObjectId(targetUserId) })
                .then(user => {
                    if (!user) {
                        callback(new Error('target user not found'))

                        return
                    }

                    delete user._id
                    delete user.password
                    delete user.status

                    callback(null, user)
                })
                .catch(error => callback(error))
        })
        .catch(error => callback(error))
}

// TODO next ...

function logoutUser() {
    const user = db.users.findOne(user => user.id === sessionStorage.userId)

    if (!user) throw new Error('user not found')

    user.status = 'offline'

    db.users.updateOne(user)
}

function createPost(userId, image, text, callback) {
    validateText(userId, 'userId', true)
    validateUrl(image, 'image')
    if (text)
        validateText(text, 'text')
    validateCallback(callback)

    const post = {
        author: userId,
        image: image,
        text: text,
        date: new Date().toLocaleDateString('en-CA')
    }

    db.posts.insertOne(post, error => {
        if (error) {
            callback(error)

            return
        }

        callback(null)
    })
}



function removePost(postId) {
    validateText(postId, 'postId', true)

    const post = db.posts.findOne(post => post.id === postId)

    if (!post) throw new Error('post not found')

    if (post.author !== sessionStorage.userId) throw new Error('post does not belong to user')

    db.posts.deleteOne(post => post.id === postId)
}

function modifyPost(postId, text) {
    validateText(postId, 'postId', true)
    validateText(text, 'text')

    const post = db.posts.findOne(post => post.id === postId)

    if (!post) throw new Error('post not found')

    if (post.author !== sessionStorage.userId) throw new Error('post does not belong to user')

    post.text = text

    db.posts.updateOne(post)
}

const logic = {
    users: null,

    registerUser,
    loginUser,
    retrieveUser,
    logoutUser,

    retrieveUsersWithStatus,
    sendMessageToUser,
    retrieveMessagesWithUser,

    createPost,
    retrievePosts,
    removePost,
    modifyPost
}

export default logic