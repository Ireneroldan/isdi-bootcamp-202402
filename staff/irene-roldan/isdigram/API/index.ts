import { MongoClient } from 'mongodb'
import express from 'express'
import logic from './logic/index.ts'
import { errors } from 'com'

const { ContentError, SystemError, DuplicityError } = errors

const client = new MongoClient('mongodb://localhost:27017')

client.connect()
    .then(connection => {
        const db = connection.db('isdigram')

        const users = db.collection('users')

        logic.users = users

        const api = express()

        const jsonBodyParser = express.json()

        api.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('Access-Control-Allow-Methods', '*')
            res.setHeader('Access-Control-Allow-Headers', '*')

            next()
        })

        api.post('/users', jsonBodyParser, (req, res) => {
            try {
                const { name, birthdate, email, username, password } = req.body

                logic.registerUser(name, birthdate, email, username, password, error => {
                    if (error) {
                        if (error instanceof SystemError)
                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        else if (error instanceof DuplicityError)
                            res.status(409).json({ error: error.constructor.name, message: error.message })
                        else
                            res.status(500).json({ error: error.constructor.name, message: error.message })

                        return
                    }

                    res.status(201).send()
                })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError)
                    res.status(406).json({ error: error.constructor.name, message: error.message })
                else res.status(500).json({ error: error.constructor.name, message: error.message })
            }
        })

        api.post('/users/auth', jsonBodyParser, (req, res) => {
            try {
                const { username, password } = req.body

                logic.loginUser(username, password, (error, userId) => {
                    if (error) {
                        res.status(400).json({ error: error.constructor.name, message: error.message })

                        return
                    }

                    res.json(userId)
                })
            } catch (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })
            }
        })

        api.get('/users/:targetUserId', (req, res) => {
            try {
                const { authorization: userId } = req.headers

                const { targetUserId } = req.params

                logic.retrieveUser(userId, targetUserId, (error, user) => {
                    if (error) {
                        res.status(400).json({ error: error.constructor.name, message: error.message })

                        return
                    }

                    res.json(user)
                })
            } catch (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })
            }
        })

        api.get('/posts', (req, res) => {
            try {
                const { authorization: userId } = req.headers

                logic.retrievePosts(userId, (error, posts) => {
                    if (error) {
                        res.status(400).json({ error: error.constructor.name, message: error.message })

                        return
                    }

                    res.json(posts)
                })

            } catch (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })
            }
        })

        api.post('/posts', jsonBodyParser, (req, res) => {
            try {
                const { authorization: userId } = req.headers

                const { image, text } = req.body

                logic.createPost(userId, image, text, error => {
                    if (error) {
                        res.status(400).json({ error: error.constructor.name, message: error.message })

                        return
                    }

                    res.status(201).send()
                })

            } catch (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })
            }
        })

        // ...

        api.listen(8080, () => console.log('API listening on port 8080'))
    })
    .catch(error => console.error(error))