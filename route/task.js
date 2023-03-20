const express = require("express")
const router = express.Router()

const {getAllTask, createTask, getTask, updateTask, deletetask} = require("../controller/tasks")



router.route("/").get(getAllTask).post(createTask)
router.route("/:id").get(getTask).patch(updateTask).delete(deletetask)





module.exports=router