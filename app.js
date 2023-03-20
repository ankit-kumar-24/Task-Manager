const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const tasks = require("./route/task")
const connectDB = require('./db/conn')
const notFound = require("./middleware/not-found")
const errorhandlermiddleware = require("./middleware/error-handler")


const port = 3000

// Middleware
app.use(express.json())
app.use("/api/v1/task", tasks)
app.use(notFound)
app.use(errorhandlermiddleware)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
        console.log("Server is running")
    })
  } catch (error) {
    console.log(error)
  }
}


start();