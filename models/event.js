import mongoose from "mongoose"

const eventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  startingDate: {
    type: Date,
    default: new Date(),
    required: true,
  },
  endingDate: {
    type: Date,
    default: new Date(),
  },
  startingTime: {
    type: String,
    default: "00.00",
  },
  endingTime: {
    type: String,
    default: "23.59",
  },
  colorMood: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  image: String,
})

const event = mongoose.model("event", eventSchema)
export default event
