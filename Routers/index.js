const express = require("express")

const router = express.Router()

const authRoute = require("./auth")
const storyRoute = require("./story")
const userRoute = require("./user")
const commentRoute = require("./comment")

res.setHeader('Access-Control-Allow-Origin', 'https://kandqcourier.services');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

router.use("/auth",authRoute)
router.use("/story",storyRoute)
router.use("/user",userRoute)
router.use("/comment",commentRoute)


module.exports = router
