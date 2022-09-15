const collegeModels = require("../models/collegeModels");
const internModels = require("../models/internModels");
const { isEmpty,validLogoLink } = require("../validations/validators")


// ========================== CREATE COLLEGE  post/functionup/colleges =============================

let createCollege = async function (req, res) {
    try {

        let data = req.body;
        const { name, fullName, logoLink } = data //destructuring

        if (!Object.keys(data).length) return res.send({ status: false, msg: "Enter some data to create college" });

        // name validation
        if (!name) return res.status(400).send({ status: false, msg: "Name is Mandatory" });
        if (!isEmpty(name)) return res.status(400).send({ status: false, msg: "name is empty" })
        const duplicateName = await collegeModels.findOne({ name: name });
        if (duplicateName) {
            return res.status(400).send({ status: false, msg: "Name Already Exists" });
        }

        if (!name.match(/^[ a-z ]+$/i)) {
            return res.status(400).send({ status: false, msg: "Please Provide correct input for name" })
        }

        //fullName validation
        if (!fullName) return res.status(400).send({ status: false, msg: "FullName is mandatory" });
        if (!isEmpty(fullName)) return res.status(400).send({ status: false, msg: "Fullname is empty" })
        const checkFullName = await collegeModels.findOne({ fullName: fullName });
        if (checkFullName) {
            return res.status(400).send({ status: false, msg: " This FullName is Already Exists" });
        }

        // logolink validation
        if (!logoLink) {
            return res.status(400).send({ status: false, msg: "Please Provide logoLink" })
        }
       
        if (!isEmpty(logoLink)) return res.status(400).send({ status: false, msg: "logolink is empty" });
       if(!validLogoLink(logoLink))
        return res.status(400).send({status:false,msg:"logolink is invalid"});
        const checkLogoLink = await collegeModels.findOne({ logoLink: logoLink });
        if (checkLogoLink) {
            return res.status(400).send({ status: false, msg: "This logo is Already Exists" });
        }

        let createdData = await collegeModels.create(data);
        res.status(201).send({ status: true, msg: "College is created", data: createdData });
    }
    catch (error) {
        res.status(500).send(error.message);
    }

}

// ============================ GET COLLEGE DETAILS get/functionup/collegeDetails ===========================

let getCollege = async function (req, res) {
    try {
        let data = req.query.collegeName;
        data=data.toUpperCase();
        if (!data) return res.status(400).send({status:false,msg:"Enter college name to get the list of interns"});
        let collegeId = await collegeModels.findOne({ name: data })
        if (!collegeId) return res.status(400).send({status:false,msg:"college not found"})
        let interns = await internModels.find({ collegeId: collegeId._id, isDeleted: false }).select({ _id: 1, name: 1, email: 1, mobile: 1 })


        let collegeData = await collegeModels.findOne({ name: data }).select({ name: 1, fullName: 1, logoLink: 1, _id: 0 });

        collegeData = collegeData.toObject();


        collegeData["Interns"] = interns

        return res.status(200).send({ data: collegeData });
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}
module.exports = { createCollege, getCollege };
