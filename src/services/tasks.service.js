const Tasks  = require('../schemas/tasks.model')


async function createTask (task){
    try {

      return  await new Tasks(task).save();
    } catch (e) {
        throw e;
    }
}

module.exports = {createTask};
