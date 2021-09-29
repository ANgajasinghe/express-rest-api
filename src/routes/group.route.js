const express = require('express');
const router = express.Router();
const {validate} = require("../core/helpers/validation-helper");
const {checkSchema} = require("express-validator");
const {groupSchema} = require("../core/validations/group.validation");
const {addGroup} = require("../services/group.service");

router.route('/group').post(
    validate(checkSchema(groupSchema)),
    async (req, res, next) => {
        try {
            const ret = await addGroup(req.body,req.user);
            res.json(ret);
        } catch (e) {
            next(e);
        }
    })

module.exports = router;
