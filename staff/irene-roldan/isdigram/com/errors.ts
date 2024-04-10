class ContentError extends Error {
    constructor(message){
        super(message)

        this.name = this.constructor.name
    }
}

class SystemError extends Error {
    constructor(message){
        super(message)

        this.name = this.constructor.name
    }
}

class DuplicityError extends Error {
    constructor(message){
        super(message)

        this.name = this.constructor.name
    }
}

const errors = {
    ContentError,
    SystemError,
    DuplicityError
}

export {
    ContentError,
    SystemError,
    DuplicityError
}

export default errors