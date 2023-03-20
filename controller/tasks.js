const Task = require('../model/task')
const asyncWrapper = require("../middleware/async")  // this is used for try catch block
const {createCustomError} = require("../errors/custom-error")

const getAllTask = asyncWrapper(async (req, res) => {

    const tasks = await Task.find({});
    // res.status(200).json({tasks,amount:tasks.length})
    res.status(200).json({ success: true, data: { tasks, amount: tasks.length } })

})

const createTask = asyncWrapper(async (req, res) => {

    // const task = new Task(req.body);
    // const CreateTask = await task.save()
    // res.status(200).json(createTask)

    const task = await Task.create(req.body)
    res.status(200).json({ task })

})

const getTask = asyncWrapper(async (req, res, next) => {

    const _id = req.params.id;
   // console.log(_id)
    const task = await Task.findOne({ _id: _id })
    if (!task) {
        // const error = new Error('Not Found')
        // error.status = 404
        // return next(error)
        // return res.status(404).json({ msg: `No task with Id ${task}` })

        return next(createCustomError(`No task with Id ${task}`,404))
    }
    res.status(200).json(task)

})

const updateTask = asyncWrapper(async (req, res) => {

    const _id = req.params.id;
    console.log(_id)
    const task = await Task.findOne({ _id: _id })
    console.log(task)
    if (!task) {
       // return res.status(404).json({ msg: `Task id : ${_id} not exist` })
       return next(createCustomError(`No task with Id ${task}`,404))
    }
    const UpdateTask = await Task.findOneAndUpdate(_id, {
        $set: req.body
    }, { new: true })
    res.status(200).json({ UpdateTask })

})



const deletetask = asyncWrapper(async (req, res) => {

    const _id = req.params.id;
    const task = await Task.findOneAndDelete({ _id })
    if (!task) {
      //  return res.status(404).json({ msg: `Task id : ${_id} not exist` })
      return next(createCustomError(`No task with Id ${task}`,404))
    }
    res.status(200).json("Task deleted successfully")

})







module.exports = {
    getAllTask, createTask, getTask, updateTask, deletetask
}