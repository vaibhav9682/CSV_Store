const mongoose = require('mongoose')

const csvSchema = new mongoose.Schema({
    fileName: {
        type: String,
        require: true
    },
    data: []
},
    { timestamps: true }
)

const Files = mongoose.model('Files', csvSchema)
module.exports = Files;