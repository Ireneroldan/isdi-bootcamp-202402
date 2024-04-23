import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { User } from '../data/index.ts'
import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'
import { error } from 'console'
import { ContentError } from 'com/errors.ts'

dotenv.config()

const { DuplicityError } = errors

describe ('registerUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('succeeds a new user', () =>
        User.deleteMany()
            .then(() => logic.registerUser('Paco', 'Martin', 'paco@martin.com', '123qwe123'))
            .then(() => User.findOne({ email: 'paco@martin.com'}))
            .then(user => {
                expect(!!user).to.be.true
                expect(user.name).to.equal('Paco')
                expect(user.surname).to.equal('Martin')
                expect(user.email).to.equal('paco@martin.com')
                expect(user.password).to.equal('123qwe123')
            })
    )

    it('fails on existing users', () =>
        User.deleteMany()
            .then(() => User.create({ name: 'Paco', surname: 'Martin', email: 'paco@martin.com', password: '123qwe123' }))
            .then(() =>
                logic.registerUser('Paco', 'Martin', 'paco@martin.com', '123qwe123')
                    .catch(error => {
                        expect(error).to.be.instanceOf(DuplicityError)
                        expect(error.message).to.equal('user already exists')
                    })
            )
    )

    it('fails on non string name', () => {
        User.deleteMany()
            //@ts-ignore
            .then(() => logic.registerUser({name: 123, surname: 'Martin', email: 'paco@martin.com', password: '123qwe123'}))
            .then(() => User.findOne({email: 'paco@martin.com'}))
            .catch(error => {
                expect(error).to.be.instanceOf(ContentError)
                expect(error.message).to.equal('name is not a string')
            })
    })

    it('fails on non string surname', () => {
        User.deleteMany()
            //@ts-ignore
            .then(() => logic.registerUser({name: 'Paco', surname: 123, email: 'paco@martin.com', password: '123qwe123'}))
            .then(() => User.findOne({email: 'paco@martin.com'}))
            .catch(error => {
                expect(error).to.be.instanceOf(ContentError)
                expect(error.message).to.equal('surname is not a string')
            })
    })

    it('fails on non string email', () => {
        User.deleteMany()
            //@ts-ignore
            .then(() => logic.registerUser({name: 'Paco', surname: 'Martin', email: 123, password: '123qwe123'}))
            .then(() => User.findOne({name: 'Paco'}))
            .catch(error => {
                expect(error).to.be.instanceOf(ContentError)
                expect(error.message).to.equal('email is not a string')
            })
    })

    it('fails on non string password', () => {
        User.deleteMany()
            //@ts-ignore
            .then(() => logic.registerUser({name: 'Paco', surname: 'Martin', email: 'paco@martin.com', password: 123}))
            .then(() => User.findOne({email: 'paco@martin.com'}))
            .catch(error => {
                expect(error).to.be.instanceOf(ContentError)
                expect(error.message).to.equal('password is not a string')
            })
    })

    it('fails on empty name', () => {
        User.deleteMany()
            //@ts-ignore
            .then(() => logic.registerUser({name: '', surname: 'Martin', email: 'paco@martin.com', password: '123qwe123'}))
            .then(() => User.findOne({email: 'paco@martin.com'}))
            .catch(error => {
                expect(error).to.be.instanceOf(ContentError)
                expect(error.message).to.equal('name is empty or blank')
            })
    })

    it('fails on empty surname', () => {
        User.deleteMany()
            //@ts-ignore
            .then(() => logic.registerUser({name: 'Paco', surname: '', email: 'paco@martin.com', password: '123qwe123'}))
            .then(() => User.findOne({email: 'paco@martin.com'}))
            .catch(error => {
                expect(error).to.be.instanceOf(ContentError)
                expect(error.message).to.equal('surname is empty or blank')
            })
    })

    it('fails on empty email', () => {
        User.deleteMany()
            //@ts-ignore
            .then(() => logic.registerUser({name: 'Paco', surname: 'Martin', email: '', password: '123qwe123'}))
            .then(() => User.findOne({name: 'Paco'}))
            .catch(error => {
                expect(error).to.be.instanceOf(ContentError)
                expect(error.message).to.equal('email is empty or blank')
            })
    })

    it('fails on empty password', () => {
        User.deleteMany()
            //@ts-ignore
            .then(() => logic.registerUser({name: 'Paco', surname: 'Martin', email: 'paco@martin.com', password: ''}))
            .then(() => User.findOne({email: 'paco@martin.com'}))
            .catch(error => {
                expect(error).to.be.instanceOf(ContentError)
                expect(error.message).to.equal('password is empty or blank')
            })
    })


    after(() => mongoose.disconnect())
})
