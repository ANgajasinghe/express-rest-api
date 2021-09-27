const {body, checkSchema, validationResult} = require('express-validator');
const {isUsernameExist} = require('../../services/user.service');

const registrationSchema = {
    email: {
        normalizeEmail: true,
        custom: {
            options: value => {
                return isUsernameExist(value)
                    .then(result => {
                        if (result) {
                            return Promise.reject('Username already in use')
                        }
                    })
            }
        }
    },
    name: {
        notEmpty: true,
        errorMessage: "Name field cannot be empty"
    },
    password: {
        isStrongPassword: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1
        },
        errorMessage: "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number",
    }
}

module.exports = {registrationSchema}
