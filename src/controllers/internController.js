const mongoose = require('mongoose');
const collegeModels = require('../models/collegeModels');
const internModels = require("../models/internModels");
const { isEmpty } = require('../validations/validators');


// ============================== CREATE INTERN  post/functionup/interns ===========================
const createIntern = async function (req, res) {
    try {
        let data = req.body;
        const{name,email,mobile,collegeName}=data

        if (Object.keys(data).length == 0) return res.send("Data is mandatory to create intern");


        // Name validation
      if (!name) return res.status(400).send({ status: false, message: "Name is mandatory" });
      if(!isEmpty(name))return res.status(400).send({ status: false, message: "name is empty" });
      if(!(/^[a-zA-Z\. ]*$/).test(name)) return res.send({status:false,message:"name is not valid"});

      //Email validation
        if (!email) return res.status(400).send({ status: false, message: "Email is mandatory" });
        if(!isEmpty(email))return res.status(400).send({ status: false, message: "email is empty" });
        data.email=data.email.trim()
        if (!(/^[a-z0-9_]{3,}@[a-z]{3,}[.]{1}[a-z]{3,6}$/).test(data.email)) {
            return res.status(400).send({status: false , message: "Email is invalid"})
        }
        let emailCheck = await internModels.findOne({ email: email });
        if (emailCheck) return res.status(400).send({ status: false, message: " This Email is already used" });
        

        //mobile Validation

        if (!mobile) return res.status(400).send({ status: false, message: "Mobile is mandatory" });
        if(!isEmpty(mobile))return res.status(400).send({ status: false, msg: "mobile is empty" });
        data.mobile=data.mobile.trim()
        if(!(/^[0-9]{10}$/).test(data.mobile)){
            return res.status(400).send({status:false,msg:"mobile number is invalid must be of 10 digits"})
        }
        let mobileCheck = await internModels.findOne({ mobile: mobile });
        if (mobileCheck) return res.status(400).send({ status: false, msg: "This Mobile Number is already used" })   
    
    // collegeName validation
    if (!collegeName) return res.status(400).send({ status: false, msg: "collegeName is mandatory" });
    if(!isEmpty(collegeName))return res.status(400).send({ status: false, msg: "collegeName is empty" });
    data.collegeName=data.collegeName.trim();
    let findCollegeName=await collegeModels.findOne({name:data.collegeName});
    if(!findCollegeName)return res.status(400).send({status:false,msg:"No college found with the given name"})
     data["collegeId"] = findCollegeName._id;

    // Create Intern

    let createData = await internModels.create(data);
    res.status(201).send({ status: true, data: createData });   
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }

}

module.exports.createIntern = createIntern;