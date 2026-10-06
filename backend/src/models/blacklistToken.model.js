import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400
    }
})

const BlackListModel = mongoose.model("BlackListModel", schema)

export default BlackListModel