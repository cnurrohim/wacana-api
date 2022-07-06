import express from "express"
import {
  getEvent,
  postEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../controllers/event.js"
const router = express.Router()

router.get("/month/:month/year/:year", getEvents)
router.get("/:id", getEvent)
router.post("/", postEvent)
router.patch("/:id", updateEvent)
router.delete("/:id", deleteEvent)

export default router
