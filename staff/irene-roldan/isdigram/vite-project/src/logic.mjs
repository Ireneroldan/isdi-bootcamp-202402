import db from './data/index.mjs'
import { validate, errors } from 'com'

function registerUser(name, birthdate, email, username, password, callback) {
    validate.text(name, 'name')
    validate.date(birthdate, 'birthdate')
    validate.email(email)
    validate.text(username, 'username', true)
    validate.password(password)
    validate.callback(callback)

    var xhr = new XMLHttpRequest

    xhr.onload = function () {
        const { status, responseText: json } = xhr

        if (status !== 201) {
            const { error, message } = JSON.parse(json)

            const constructor = errors[error]

            callback(new constructor(message))

            return
        }

        callback(null)
    }

    xhr.open('POST', 'http://localhost:8080/users')

    xhr.setRequestHeader('Content-Type', 'application/json')

    const user = { name, birthdate, email, username, password }

    const json = JSON.stringify(user)

    xhr.send(json)
}

function loginUser(username, password, callback) {
    validate.text(username, 'username', true)
    validate.password(password)
    validate.callback(callback)

    var xhr = new XMLHttpRequest

    xhr.onload = function () {
        const { status, responseText: json } = xhr

        if (status >= 500) {
            callback(new Error('system error'))

            return
        } else if (status >= 400) { // 400 - 499
            const { error, message } = JSON.parse(json)

            const constructor = window[error]

            callback(new constructor(message))
        } else if (status >= 300) {
            callback(new Error('system error'))

            return
        } else {
            const userId = JSON.parse(json)

            sessionStorage.userId = userId

            callback(null)
        }
    }

    xhr.open('POST', 'http://localhost:8080/users/auth')

    xhr.setRequestHeader('Content-Type', 'application/json')

    const user = { username, password }

    const json = JSON.stringify(user)

    xhr.send(json)
}

function retrieveUser(callback) {
    validate.callback(callback)

    var xhr = new XMLHttpRequest

    xhr.onload = function () {
        const { status, responseText: json } = xhr

        if (status >= 500) {
            callback(new Error('system error'))

            return
        } else if (status >= 400) { // 400 - 499
            const { error, message } = JSON.parse(json)

            const constructor = window[error]

            callback(new constructor(message))
        } else if (status >= 300) {
            callback(new Error('system error'))

            return
        } else {
            const user = JSON.parse(json)

            callback(null, user)
        }
    }

    xhr.open('GET', `http://localhost:8080/users/${sessionStorage.userId}`)

    xhr.setRequestHeader('Authorization', sessionStorage.userId)

    xhr.send()
}

function logoutUser() {
    const user = db.users.findOne(user => user.id === sessionStorage.userId)

    if (!user) throw new Error('user not found')

    user.status = 'offline'

    db.users.updateOne(user)

    delete sessionStorage.userId
}

function getLoggedInUserId() {
    return sessionStorage.userId
}

function isUserLoggedIn() {
    return !!sessionStorage.userId
}

function cleanUpLoggedInUserId() {
    delete sessionStorage.userId
}

function retrieveUsersWithStatus() {
    const users = db.users.getAll()

    const index = users.findIndex(user => user.id === sessionStorage.userId)

    users.splice(index, 1)

    users.forEach(function (user) {
        delete user.name
        delete user.email
        delete user.password
        delete user.birthdate
    })

    users.sort(function (a, b) {
        return a.username < b.username ? -1 : 1
    }).sort(function (a, b) {
        return a.status > b.status ? -1 : 1
    })


    return users
}

function sendMessageToUser(userId, text) {
    validate.text(userId, 'userId', true)
    validate.text(text, 'text')

    // { id, users: [id, id], messages: [{ from: id, text, date }, { from: id, text, date }, ...] }

    // find chat in chats (by user ids)
    // if no chat yet, then create it
    // add message in chat
    // update or insert chat in chats
    // save chats

    let chat = db.chats.findOne(chat => chat.users.includes(userId) && chat.users.includes(sessionStorage.userId))

    if (!chat)
        chat = { users: [userId, sessionStorage.userId], messages: [] }

    const message = { from: sessionStorage.userId, text: text, date: new Date().toISOString() }

    chat.messages.push(message)

    if (!chat.id)
        db.chats.insertOne(chat)
    else
        db.chats.updateOne(chat)
}

function retrieveMessagesWithUser(userId) {
    validate.text(userId, 'userId', true)

    const chat = db.chats.findOne(chat => chat.users.includes(userId) && chat.users.includes(sessionStorage.userId))

    if (chat)
        return chat.messages

    return []
}

function createPost(image, text, callback) {
    validateUrl(image, 'image')
    if (text)
        validate.text(text, 'text')
    validate.callback(callback)

    var xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status, responseText: json } = xhr

        if (status >= 500) {
            callback(new Error('system error'))

            return
        } else if (status >= 400) { // 400 - 499
            const { error, message } = JSON.parse(json)

            const constructor = window[error]

            callback(new constructor(message))
        } else if (status >= 300) {
            callback(new Error('system error'))

            return
        } else {
            callback(null)
        }
    }

    xhr.open('POST', 'http://localhost:8080/posts')

    xhr.setRequestHeader('Authorization', sessionStorage.userId)
    xhr.setRequestHeader('Content-Type', 'application/json')

    const post = { image, text }

    const json = JSON.stringify(post)

    xhr.send(json)
}

function retrievePosts(callback) {
    validate.callback(callback)

    var xhr = new XMLHttpRequest

    xhr.onload = function () {
        const { status, responseText: json } = xhr

        if (status >= 500) {
            callback(new Error('system error'))

            return
        } else if (status >= 400) { // 400 - 499
            const { error, message } = JSON.parse(json)

            const constructor = window[error]

            callback(new constructor(message))
        } else if (status >= 300) {
            callback(new Error('system error'))

            return
        } else {
            const posts = JSON.parse(json)

            callback(null, posts)
        }
    }

    xhr.open('GET', `http://localhost:8080/posts`)

    xhr.setRequestHeader('Authorization', sessionStorage.userId)

    xhr.send()
}

function removePost(postId) {
    validate.text(postId, 'postId', true)

    const post = db.posts.findOne(post => post.id === postId)

    if (!post) throw new Error('post not found')

    if (post.author !== sessionStorage.userId) throw new Error('post does not belong to user')

    db.posts.deleteOne(post => post.id === postId)
}

function modifyPost(postId, text) {
    validate.text(postId, 'postId', true)
    validate.text(text, 'text')

    const post = db.posts.findOne(post => post.id === postId)

    if (!post) throw new Error('post not found')

    if (post.author !== sessionStorage.userId) throw new Error('post does not belong to user')

    post.text = text

    db.posts.updateOne(post)
}

const logic = {
    registerUser,
    loginUser,
    retrieveUser,
    logoutUser,
    getLoggedInUserId,
    isUserLoggedIn,
    cleanUpLoggedInUserId,

    retrieveUsersWithStatus,
    sendMessageToUser,
    retrieveMessagesWithUser,

    createPost,
    retrievePosts,
    removePost,
    modifyPost
}

export default logic