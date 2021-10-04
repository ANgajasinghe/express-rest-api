const express = require('express');
const router = express.Router();
const {body, checkSchema} = require('express-validator');
const {registerUser, login} = require("../services/user.service");
const {registrationSchema} = require("../core/validations/user.validations");
const {validate} = require("../core/helpers/validation-helper");

router.route('/register').post(validate(checkSchema(registrationSchema)),
    async (req, res, next) => {
        try {
            console.log('callerd')
            const ret = await registerUser(req.body);
            res.json(ret);
        } catch (e) {
            next(e);
        }
    })

router.route('/login')
    .post(
        body('email').isEmail().withMessage('Please enter valid email'),
        body('password').isLength({min: 5}).withMessage('Password length should greater than 5'),
        async (req, res, next) => {
            try {
                const ret = await login(req.body);
                res.json(ret);
            } catch (e) {
                next(e);
            }
        })


module.exports = router;
