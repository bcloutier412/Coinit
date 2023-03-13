require("dotenv").config();

let PORT = process.env.PORT;
let MONGODB_URI = process.env.MONGODB_URI;
let PROXY = process.env.PROXY

module.exports = {
    PORT,
    MONGODB_URI,
    PROXY
}