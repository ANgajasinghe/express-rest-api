const express = require('express');
const {createTask} = require("../services/tasks.service");
const router = express.Router();


router.route('/api/tasks').get(async (req,res) => {
    // const  {title,description,location,email} = req.body
    // const ret = await createTask({title,description,location,email} )
    res.json({
        message:'work'
    });
})

router.route('/api/tasks').post(async (req,res) => {
    try {
        //const {title, description, location, email} = req.body
        const {title, description, location, email} = req.body
        console.log({title, description, location, email});
        const ret = await createTask({title, description, location, email})
         res.json(ret);
    } catch (e) {
        res.status(400).send('Error: ' + e)
    }
})

module.exports = router;