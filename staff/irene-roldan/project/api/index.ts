import dotenv from 'dotenv'
import mongoose, { ObjectId } from 'mongoose'
import express from 'express'
import logic from './logic/index.ts' 
import { errors } from 'com'
import jwt  from 'jsonwebtoken'
import cors from 'cors'
import tracer from 'tracer'
import colors from 'colors'
import { User } from './data/index.ts'


dotenv.config()

const { TokenExpiredError } = jwt

const { MONGODB_URL, PORT, JWT_SECRET, JWT_EXP } = process.env

const logger = tracer.colorConsole({
    filters: {
        debug: colors.green,
        info: colors.blue,
        warn: colors.yellow,
        error: colors.red
    }
})

const {
    ContentError,
    SystemError,
    DuplicityError,
    NotFoundError,
    CredentialsError,
    UnauthorizedError
} = errors

mongoose.connect(MONGODB_URL)
    .then(() => {
        const api = express()

        const jsonBodyParser = express.json()

        api.use(cors())

        
        api.get('/users', (req, res) => {
            const { authorization } = req.headers

            const token = authorization.slice(7)

            const { sub: userId } = jwt.verify(token, JWT_SECRET)

            try {
                //@ts-ignore
                logic.retrieveUsers(userId)
                    .then(users => res.json(users))
                    .catch(error => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)

                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError) {
                    logger.warn(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else if (error instanceof TokenExpiredError) {
                    logger.warn(error.message)

                    res.status(498).json({ error: UnauthorizedError.name, message: 'session expired' })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: SystemError.name, message: error.message })
                }
            }
        })

        api.post('/users', jsonBodyParser, (req, res) => {
            try {
                const { name, surname, email, password } = req.body

                logic.registerUser(name, surname, email, password)
                    .then(() => res.status(201).send())
                    .catch(error => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof DuplicityError) {
                            logger.warn(error.message)

                            res.status(409).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError) {
                    logger.warn(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: SystemError.name, message: error.message })
                }
            }
        })

        api.post('/users/auth', jsonBodyParser, (req, res) => {
            try {
                const { email, password } = req.body

                logic.authenticateUser(email, password)
                    .then(userId => {
                        const token = jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: JWT_EXP })

                        res.json(token)
                    })
                    .catch(error => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof CredentialsError) {
                            logger.warn(error.message)

                            res.status(401).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)

                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError) {
                    logger.warn(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: SystemError.name, message: error.message })
                }
            }
        })

        api.get('/users/:targetUserId', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { targetUserId } = req.params

                logic.retrieveUser(userId as string, targetUserId)
                    .then(user => res.json(user))
                    .catch(error => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)

                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError) {
                    logger.warn(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else if (error instanceof TokenExpiredError) {
                    logger.warn(error.message)

                    res.status(498).json({ error: UnauthorizedError.name, message: 'session expired' })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: SystemError.name, message: error.message })
                }
            }
        })


        api.get('/boards', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)
                
                //@ts-ignore
                logic.retrieveBoard(userId as ObjectId)
                    .then(boards => res.json(boards))
                    .catch(error => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)

                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError) {
                    logger.warn(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else if (error instanceof TokenExpiredError) {
                    logger.warn(error.message)

                    res.status(498).json({ error: UnauthorizedError.name, message: 'session expired' })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: SystemError.name, message: error.message })
                }
            }
        })

        api.post('/boards', jsonBodyParser, (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                const { text } = req.body

                logic.createBoard(userId as string, text)
                    .then(() => res.status(201).send())
                    .catch(error => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)

                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError) {
                    logger.warn(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else if (error instanceof TokenExpiredError) {
                    logger.warn(error.message)

                    res.status(498).json({ error: UnauthorizedError.name, message: 'session expired' })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: SystemError.name, message: error.message })
                }
            }
        })

        api.get('/board/:boardId', (req, res) => {
            try {
                const { authorization } = req.headers

                const token = authorization.slice(7)

                const { boardId } = req.params

                logic.retrieveOneBoard(boardId as string)
                    .then(board => res.json(board))
                    .catch(error => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)

                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)

                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError) {
                    logger.warn(error.message)

                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else if (error instanceof TokenExpiredError) {
                    logger.warn(error.message)

                    res.status(498).json({ error: UnauthorizedError.name, message: 'session expired' })
                } else {
                    logger.warn(error.message)

                    res.status(500).json({ error: SystemError.name, message: error.message })
                }
            }
        })

        api.get('/boards/:boardId/tasks/:columnType', (req, res) => {
            try {
                const { boardId, columnType } = req.params
        
                logic.retrieveTask(boardId, columnType)
                    .then(tasks => {
                        res.json(tasks)
                    })
                    .catch(error => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)
                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)
                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError) {
                    logger.warn(error.message)
                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else if (error instanceof TokenExpiredError) {
                    logger.warn(error.message)
                    res.status(498).json({ error: UnauthorizedError.name, message: 'session expired' })
                } else {
                    logger.warn(error.message)
                    res.status(500).json({ error: SystemError.name, message: error.message })
                }
            }
        })

        api.post('/boards/:boardId/tasks', jsonBodyParser, (req, res) => {
            try {
                const { authorization } = req.headers
                const token = authorization.slice(7)
                const { sub: userId } = jwt.verify(token, JWT_SECRET)
                const { boardId } = req.params
                const { title, description,columnType } = req.body
                
                logic.createTask(userId as string, title, description, boardId, columnType)
                    .then(() => {
                        res.status(201).send()
                    })
                    .catch(error => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)
                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)
                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError) {
                    logger.warn(error.message)
                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else if (error instanceof TokenExpiredError) {
                    logger.warn(error.message)
                    res.status(498).json({ error: UnauthorizedError.name, message: 'session expired' })
                } else {
                    logger.warn(error.message)
                    res.status(500).json({ error: SystemError.name, message: error.message })
                }
            }
        })

        api.delete('/tasks/:taskId', async (req, res) => { 
            try {
                const { taskId } = req.params
                await logic.deleteTask(taskId) 
                res.status(204).json({ message: 'La tarea fue eliminada exitosamente' })
            } catch (error) {
                console.error('Error eliminando la tarea', error)
                res.status(500).json({ error: SystemError.name, message: error.message })
            }
        })
        
        api.post('/tasks/:taskId', async (req, res) => {
            const { taskId } = req.params
            console.log(req.body)
            const { title, description, columnType } = req.body 

            logic.editTask(taskId, title, description, columnType)
                .then(updatedTask => {
                    if (!updatedTask) {
                        return res.status(404).json({ error: 'TaskNotFound', message: 'La tarea no fue encontrada' })
                    }

                    res.status(200).json(updatedTask)
                })
                .catch(error => {
                    console.error('Error editando la tarea', error)
                    res.status(500).json({ error: 'SystemError', message: error.message })
                })       
        })
        api.put('/tasks/:taskId', jsonBodyParser, async (req, res) => {
            try {
                const taskId = req.params.taskId;
                const { title, description, columnType } = req.body;
        
                const updatedTask = await logic.editTask(taskId, title, description, columnType);
        
                if (!updatedTask) {
                    return res.status(404).json({ error: 'TaskNotFound', message: 'La tarea no fue encontrada' });
                }
        
                res.status(200).json(updatedTask);
            } catch (error) {
                console.error('Error editando la tarea', error);
                res.status(500).json({ error: 'SystemError', message: error.message });
            }
        })
        api.post('/shareBoard', jsonBodyParser, (req, res) => {
            try {            
                const {  userId, boardId} = req.body
                logic.shareBoardWithUsers(boardId, userId)
                    .then(() => {
                        res.status(201).send()
                    })
                    .catch(error => {
                        if (error instanceof SystemError) {
                            logger.error(error.message)
                            res.status(500).json({ error: error.constructor.name, message: error.message })
                        } else if (error instanceof NotFoundError) {
                            logger.warn(error.message)
                            res.status(404).json({ error: error.constructor.name, message: error.message })
                        }
                    })
            } catch (error) {
                if (error instanceof TypeError || error instanceof ContentError) {
                    logger.warn(error.message)
                    res.status(406).json({ error: error.constructor.name, message: error.message })
                } else if (error instanceof TokenExpiredError) {
                    logger.warn(error.message)
                    res.status(498).json({ error: UnauthorizedError.name, message: 'session expired' })
                } else {
                    logger.warn(error.message)
                    res.status(500).json({ error: SystemError.name, message: error.message })
                }
            }
        })

        api.get('/sharedBoards', async (req, res) => {
            try {
                const { authorization } = req.headers
                const token = authorization.slice(7)
                const { sub: userId } = jwt.verify(token, JWT_SECRET)
                const sharedBoards = await logic.getShareBoards(userId)
                
                // Devolvemos los tableros compartidos como respuesta
                res.status(200).json(sharedBoards);
            } catch (error) {
                logger.error(error.message);
                res.status(500).json({ error: 'Internal Server Error', message: 'Ha ocurrido un error interno.' });
            }
        })

        api.delete('/board/:boardId', async (req, res) => {
            try {
                const { boardId } = req.params
                await logic.deleteBoard(boardId) 
                res.status(204).json({ message: 'el tablero fue eliminada exitosamente' })
            } catch (error) {
                console.error('Error eliminando el tablero', error)
                res.status(500).json({ error: SystemError.name, message: error.message })
            }
        })

        
        api.listen(PORT, () => logger.info(`API listening on port ${PORT}`))
    })
    .catch(error => logger.error(error))

    