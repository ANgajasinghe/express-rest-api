const express = require('express');
const router = express.Router();
const {body, validationResult, checkSchema} = require('express-validator');
const {registerUser, login} = require("../services/user.service");
const {registrationSchema} = require("../core/validations/user.validations");
const {validate} = require("../core/helpers/validation-helper");
const UnauthorizedError = require("../core/exceptions/unauthorized.error");

router.route('/api/register').post(validate(checkSchema(registrationSchema)),
    async (req, res) => {
        try {
            const ret = await registerUser(req.body);
            res.json(ret);
        } catch (e) {
            console.log(e);
            res.status(400).send('Error: ' + e.message)
        }
    })

router.route('/api/login')
    .post(
        body('email').isEmail().withMessage('Please enter valid email'),
        body('password').isLength({min: 5}).withMessage('Password length should greater than 5'),
        async (req, res , next) => {
            try {
                const ret = await login(req.body);
                res.json(ret);
            } catch (e) {
                next(e);
            }


        })


module.exports = router;
