import dotenv from 'dotenv'
import mongoose from 'mongoose'
import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'

import { User, Board, BoardType } from '../data/index.ts'

dotenv.config()

const { CredentialsError, NotFoundError } = errors

describe('retrieveBoard', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('retrieves all boards for existing user', () => 
        Promise.all([
            User.deleteMany(),
            Board.deleteMany()
        ])

            .then(() => 
                User.create({ name: 'Isdi', surname: 'Coders', email: 'isdi@coders.com', password: '123qwe123'})
                    .then(user =>
                        Promise.all([
                            Board.create({author: user.id, text: 'project1', date: new Date, assignedUsers: []}),
                            Board.create({author: user.id, text: 'project2', date: new Date, assignedUsers: []}),
                            Board.create({author: user.id, text: 'project3', date: new Date, assignedUsers: []})
                        ])
                            .then(([board1, board2, board3])=> 
                                logic.retrieveBoard(user.id)
                                    .then(boards => {
                                        expect(boards => {
                                            expect(boards).to.have.lengthOf(3)

                                            const board1b = boards.find(board => board.id === board1.id)

                                            expect(board1b.author.email).to.equal('isdi@coders.com')
                                            expect(board1b.author.id).to.equal(user.id)
                                            expect(board1b.text).to.equal(board1.text)
                                            expect(board1b.date).to.deep.equal('board1.date')

                                            const board2b = boards.find(board => board.id === board2.id)

                                            expect(board2b.author.email).to.equal('isdi@coders.com')
                                            expect(board2b.author.id).to.equal(user.id)
                                            expect(board2b.text).to.equal(board2.text)
                                            expect(board1b.date).to.deep.equal('board2.date')

                                            const board3b = boards.find(board => board.id === board3.id)

                                            expect(board3b.author.email).to.equal('isdi@coders.com')
                                            expect(board3b.author.id).to.equal(user.id)
                                            expect(board3b.text).to.equal(board3.text)
                                            expect(board3b.date).to.deep.equal('board3.date')

                                        })
                                    })
                            )
                    )
            )
    )

    after(mongoose.disconnect)
})