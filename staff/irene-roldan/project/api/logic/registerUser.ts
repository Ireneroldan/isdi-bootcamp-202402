import { validate, errors } from 'com'

import { UserType, User } from '../data/index.ts'

const { DuplicityError, SystemError } = errors

function registerUser(name: string, surname: string, email: string, password: string): Promise<void> {
    validate.text(name, 'name')
    validate.text(surname, 'surname')
    validate.email(email)
    validate.password(password)

    return User.findOne({ $or: [{ email }] })
        .catch(error => { throw new SystemError(error.message) })
        .then((user: UserType) => {
            if (user)
                throw new DuplicityError('user already exists')

            user = {
                name: name.trim(),
                surname: surname,
                email: email,
                password: password
            }

            return User.create(user)
                .catch(error => { throw new SystemError(error.message) })
                .then(user => { })
        })
}

export default registerUser