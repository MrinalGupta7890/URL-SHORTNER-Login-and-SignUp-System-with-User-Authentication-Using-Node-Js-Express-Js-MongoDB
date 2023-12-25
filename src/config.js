const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb+srv://mrinalgupta7890:QPxhojTvjTeF1SZa@cluster0.oq0jyg8.mongodb.net/");

// check database connected or not
connect.then(() => {
    console.log("Database connected successfully");
})
.catch(() => {
    console.log("Database cannot be connected")
});


// create a schema
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


// Collection part
const collection = new mongoose.model("users", LoginSchema);

module.exports = collection;


// const shortUrlSchema = new mongoose.Schema({
//     full: {
//       type: String,
//       required: true
//     },
//     short: {
//       type: String,
//       required: true,
//       default: shortId.generate
//     },
//     clicks: {
//       type: Number,
//       required: true,
//       default: 0
//     }
//   })
  
//   module.exports = mongoose.model('ShortUrl', shortUrlSchema)