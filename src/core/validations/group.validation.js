const {isUserAlreadyHaveSameNameGroup} = require("../../services/group.service");

const groupSchema = {
    name: {
        notEmpty: true,
        errorMessage: "Name field cannot be empty",
        custom: {
            options: (value,{req}) => {
                return isUserAlreadyHaveSameNameGroup(value,req.user.sub)
                    .then(result => {
                        if (result) {
                            return Promise.reject('Group name already in exist')
                        }
                    })
            }
        }
    }
}

module.exports = {groupSchema}
