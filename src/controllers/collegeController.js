const collegeModels = require("../models/collegeModels");

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

module.exports.createCollege = createCollege;