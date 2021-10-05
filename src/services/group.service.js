'use strict'

const Group = require('../schemas/group.schema');
const BadRequestError = require("../core/exceptions/bad-request.error");
const UnauthorizedError = require("../core/exceptions/unauthorized.error");


const addGroup = async (group, user) => {
    group.userId = user.sub;
    return await new Group(group).save();
}

const getAll = async () => {
    return Group.find();
}

const getByUserId = async (user) => {
    console.log(user);
    return Group.find({userId:user.sub});
}

const getById = async (groupId,user) => {

    const result = await Group.findById(groupId);


    if(!result)
        throw new BadRequestError('invalid group id')

    if(result.userId.toString() !== user.sub)
        throw new UnauthorizedError('unauthorized leader id detected')

    return result;
}

const updateGroupMembers = async (group, user) => {
    const result = await Group.findById(group._id)

    if(!result)
        throw new BadRequestError('invalid group id')
    if(result.userId.toString() !== user.sub)
        throw new UnauthorizedError('unauthorized leader id detected')

    result.groupMembers = group.groupMembers;

    await new Group(result).save();

    return getByUserId(user);

}

const deleteGroup = async (groupId, user) => {

    const group = await getById(groupId,user);

    await Group.remove(group);

    return getByUserId(user);


}



const isUserAlreadyHaveSameNameGroup = async (name, userId) => {
    const group = await Group.findOne({name, userId})
    return group != null
}


module.exports = {
    addGroup,getAll,getByUserId,getById,updateGroupMembers,deleteGroup,isUserAlreadyHaveSameNameGroup
}
