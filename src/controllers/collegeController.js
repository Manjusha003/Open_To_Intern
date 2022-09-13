const collegeModels = require("../models/collegeModels");

let createCollege = async function (req, res) {
    try {
        let data = req.body;
        let createdData = await collegeModels.create(data);
        res.send(createdData);
    }
    catch (error) {
        res.send(error.message);
    }

}

module.exports.createCollege = createCollege;