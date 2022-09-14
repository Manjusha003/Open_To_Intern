const collegeModels = require("../models/collegeModels");
const internModels = require("../models/internModels");

let createCollege = async function (req, res) {
    try {
        let data = req.body;

        if (!Object.keys(data).length) return res.send("Enter some data to create college");
        if (!data.name) return res.send("Name is Mandatory");
        if (!data.fullName) return res.send("FullName is mandatory");



        let createdData = await collegeModels.create(data);
        res.send(createdData);
    }
    catch (error) {
        res.send(error.message);
    }

}


let getCollege = async function (req, res) {
    try {
        let data = req.query.collegeName;
        let collegeId = await collegeModels.findOne({ name: data })
        let interns = await internModels.find({ collegeId: collegeId._id, isDeleted: false }).select({ _id: 1, name: 1, email: 1, mobile: 1 })
        let collegeData = await collegeModels.findOne({ name: data }).select({ name: 1, fullName: 1, logoLink: 1, _id: 0 });
        // console.log(collegeData)
        collegeData = collegeData.toObject();
        collegeData["Interns"] = interns;
        // console.log(collegeData)
        res.send({ data: collegeData });
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}
module.exports.createCollege = createCollege;
module.exports.getCollege = getCollege;