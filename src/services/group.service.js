'use strict'

const Group = require('../schemas/group.model');


const addGroup = async (group,user) => {
    group.userId = user.sub;
    return await new Group(group).save();
}

const isUserAlreadyHaveSameNameGroup = async (name,userId) => {

    const group = await Group.findOne({name,userId})
    return group != null
}


module.exports={
    addGroup,
    isUserAlreadyHaveSameNameGroup
}
