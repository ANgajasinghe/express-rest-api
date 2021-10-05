const express = require('express');
const router = express.Router();
const {validate} = require("../core/helpers/validation-helper");
const {checkSchema} = require("express-validator");
const {groupSchema} = require("../core/validations/group.validation");
const {addGroup, getAll, getByUserId, getById, updateGroupMembers, deleteGroup} = require("../services/group.service");

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

router.route('/group').get(
    async (req, res, next) => {
        try {
            const ret = await getAll();
            res.json(ret);
        } catch (e) {
            next(e);
        }
    })

router.route('/group-by-leader').get(
    async (req, res, next) => {
        try {
            const ret = await getByUserId(req.user);
            res.json(ret);
        } catch (e) {
            next(e);
        }
    })
router.route('/group/:id').get(
    async (req, res, next) => {
        try {
            const ret = await getById(req.params.id,req.user);
            res.json(ret);
        } catch (e) {
            next(e);
        }
    })

router.route('/group').put(
    async (req, res, next) => {
        try {
            const ret = await updateGroupMembers(req.body,req.user);
            res.json(ret);
        } catch (e) {
            next(e);
        }
    })

router.route('/group/:id').delete(
    async (req, res, next) => {
        try {
            const ret = await deleteGroup(req.params.id,req.user);
            res.json(ret);
        } catch (e) {
            next(e);
        }
    })



module.exports = router;
