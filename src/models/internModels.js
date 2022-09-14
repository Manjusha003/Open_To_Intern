
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId; //need to check;


const internSchema = new mongoose.Schema({
    name: { type: String, reguired: true },
    email: { type: String, unique: true, required: true },
    mobile: { type: Number, required: true, unique: true },
    collegeId: { type: ObjectId, ref:'college' },
    isDeleted: { type: Boolean, default: false }

}, { timestamps: true });

module.exports = mongoose.model('intern', internSchema);


