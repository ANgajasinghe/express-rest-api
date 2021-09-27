'use strict'

const Users = require('../schemas/user.schema');
const bcrypt = require("bcrypt");
const UnauthorizedError = require("../core/exceptions/unauthorized.error");



const registerUser = async (registerData) => {
    return await new Users(registerData).save();
}

const login = async (loginData) => {
    const {email, password} = loginData;

    const user = await Users.findOne({email});
    if(user == null) throw new UnauthorizedError('invalid email');

    const isPasswordMatch = bcrypt.compareSync(password, user.password)
    if(!isPasswordMatch) throw new UnauthorizedError('invalid password, please check your password');

    return {isPasswordMatch}

}

const isUsernameExist = async (email) => {

    const user = await Users.findOne({email});
    return user != null
}

module.exports = {registerUser, login, isUsernameExist};



