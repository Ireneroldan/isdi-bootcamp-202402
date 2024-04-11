import db from './data/index.mjs'
import logic from './logic.mjs'

describe('logic', function(){
    describe('register user', function(){
        it('succed a new user', () => {
            db.users.deleteOne((user) =>user.username === 'pepe')
            
            logic.registerUser('Pepe Roni', '2000-01-01', 'pepe@roni.com', 'peperoni', '123qwe123')

            const user = db.users.findOne((user) => user.username === 'peperoni')

            expect(!!user).toBe(true) 
            expect(user.name).toBe('Pepe Roni')
            expect(user.birthdate).toBe('2000-01-01')
            expect(user.email).toBe('pepe@roni.com')
            expect(user.username).toBe('peperoni')
            expect(user.password).toBe('123qwe123')
        })

        it('fails on existing users', () => {
            db.users.deleteOne(() => user.username === 'pepe')

            db.users.insertOne({name:'Pepe', birthdate:'2000-01-01', email: 'pepe@pepe.com', username: 'pepe', password: '123qwe123'})

            let errorThrow
            try {
                logic.registerUser('Pepe', '2000-01-01', 'pepe@pepe.com', 'pepe', '123qwe123')
            } catch (error) {
                errorThrow = error

            }
            expect(errorThrow).toBeInstanceOf(Error)
            expect(errorThrow.message).toBe('user already exists')
        })
    })
})