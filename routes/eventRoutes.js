const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const validate = require("../middleware/validate");
const { createEventSchema, registerSchema } = require("../utils/validators");


router.post("/", eventController.createEvent);
router.post("/:id/register", eventController.registerUser);
router.delete("/:id/register/:userId", eventController.cancelRegistration);
router.get("/upcoming", eventController.listUpcomingEvents);
router.get("/:id", eventController.getEventDetails);
router.get("/:id/stats", eventController.getEventStats);

router.post("/", validate(createEventSchema), eventController.createEvent);
router.post("/:id/register", validate(registerSchema), eventController.registerUser);

module.exports = router;
