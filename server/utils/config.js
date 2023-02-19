require("dotenv").config();

let PORT = process.env.PORT;
let MONGODB_URI = process.env.MONGODB_URI;
// API KEY

module.exports = {
    PORT,
    MONGODB_URI,
}