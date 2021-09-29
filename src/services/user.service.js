'use strict'

const Users = require('../schemas/user.schema');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const UnauthorizedError = require("../core/exceptions/unauthorized.error");



const registerUser = async (registerData) => {
    return await new Users(registerData).save();
}

const login = async (loginData) => {
    const {email, password} = loginData;

    const user = await Users.findOne({email});
    if(user == null) throw new UnauthorizedError('invalid email');

    // validate pwd
    const isPasswordMatch = bcrypt.compareSync(password, user.password)
    if(!isPasswordMatch) throw new UnauthorizedError('invalid password, please check your password');

    // setting up jwt
    const token = jwt.sign({
        sub: user._id,
        email
    },process.env.SECRECT,{expiresIn: "1h"})

    return {
        token,
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
    }

}

const isUsernameExist = async (email) => {

    const user = await Users.findOne({email});
    return user != null
}

module.exports = {registerUser, login, isUsernameExist};



