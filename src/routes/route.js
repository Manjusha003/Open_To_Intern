const express = require('express');
const router = express.Router();
const collegeController=require('../controllers/collegeController')

router.get('/hello',collegeController.createCollege)


module.exports = router;