const mongoose = require('mongoose');
const collegeModels = require('../models/collegeModels');
const internModels = require("../models/internModels");

const createIntern = async function (req, res) {
    try {
        let data = req.body;

        if (Object.keys(data).length == 0) return res.send("Data is mandatory to create intern");

        if (!data.name) return res.status(400).send({ status: false, msg: "Name is mandatory" });
        if (!data.email) return res.status(400).send({ status: false, msg: "Email is mandatory" });
        if (!data.mobile) return res.status(400).send({ status: false, msg: "Mobile is mandatory" });

        if (!(/^[a-z0-9_]{3,}@[a-z]{3,}[.]{1}[a-z]{3,6}$/).test(data.email)) {
            return res.status(400).send({status: false , msg: "Email is invalid"})
        }
        if(!(/^[0-9]{10,14}$/).test(data.mobile)){
            return res.status(400).send({status:false,msg:"mobile number is invalid must be of 10 digits"})
        }
       
        let emailCheck = await internModels.findOne({ email: data.email });
        if (emailCheck) return res.status(400).send({ status: false, msg: "Email already exists in database" });
        
        let mobileCheck = await internModels.findOne({ mobile: data.mobile });
        if (mobileCheck) return res.status(400).send({ status: false, msg: "Mobile already exists" })   
       if (!mongoose.Types.ObjectId.isValid(data.collegeId)) return res.send("Collegeid is invalid");
        let collegeIdCheck = await collegeModels.findById({ _id: data.collegeId });
        if (!collegeIdCheck) return res.status(400).send({ status: false, msg: "College id does not exist in college collection" });

        let collegeNam=await collegeModels.findOne({name:data.collegeName});
        data["collegeId"] = collegeNam._id;

        if(!collegeNam)return res.status(404).send({status:false,msg:"No college found with the given name"})

       let createData = await internModels.create(data);
        res.status(201).send({ status: true, data: createData });
        
       
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }

}

module.exports.createIntern = createIntern;