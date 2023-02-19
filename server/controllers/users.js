const userRouter = require("express").Router()
const axios = require("axios");

userRouter.post('/newUser', (request, response, error) => {
    console.log('got the request')
})

module.exports = userRouter
