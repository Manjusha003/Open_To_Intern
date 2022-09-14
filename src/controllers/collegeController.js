const collegeModels = require("../models/collegeModels");
const internModels = require("../models/internModels");
const{isEmpty}=require("../validations/validators")

let createCollege = async function (req, res) {
    try {

        let data = req.body;
        const {name,fullName,logoLink} =data //destructuring

        if (!Object.keys(data).length) return res.send("Enter some data to create college");

        // name validation
        if (!name) return res.status(400).send("Name is Mandatory");
        if(!isEmpty(name)) return res.status(400).send("name is empty")
        const duplicateName = await collegeModels.findOne({ name: name });
        if (duplicateName) {
            return res.status(400).send({ status: false, msg: "Name Already Exists" });
        }

        if (!name.match(/^[ a-z ]+$/i)) {
            return res.status(400).send({ status: false, msg: "Please Provide correct input for name" })
        }

        //fullName validation
        if (!fullName) return res.status(400).send("FullName is mandatory");
        if(!isEmpty(fullName)) return res.status(400).send("Fullname is empty")
        const duplicateFullName = await collegeModels.findOne({ fullName: fullName });
        if (duplicateFullName) {
            return res.status(400).send({ status: false, msg: "FullName Already Exists" });
        }

       // logolink validation
        if (!logoLink) {
            return res.status(400).send({ status: false, msg: "Please Provide logoLink" })
        }
        const duplicateLogoLink = await collegeModels.findOne({ logoLink: logoLink });
        if (duplicateLogoLink) {
            return res.status(400).send({ status: false, msg: "This logo is Already Exists" });
        }

        let createdData = await collegeModels.create(data);
        res.status(201).send({status:true,msg:"College is created",data:createdData});
    }
    catch (error) {
        res.status(500).send(error.message);
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
module.exports = {createCollege,getCollege};
