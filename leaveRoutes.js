const express = require("express");
const router = express.Router();
const leaveController = require("../controllers/leaveController");

router.post("/apply", leaveController.applyLeave);
router.get("/", leaveController.getLeaves);
router.put("/:id", leaveController.approveLeave);

module.exports = router;