const express = require("express");
const router = express.Router();
const payrollController = require("../controllers/payrollController");

router.get("/", payrollController.getPayroll);
router.post("/", payrollController.createPayroll);

module.exports = router;
