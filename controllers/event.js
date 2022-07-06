import express from "express"
import mongoose from "mongoose"

import Event from "../models/event.js"

export const getEvent = async (req, res) => {
  const { id } = req.params

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No event with id: ${id}`)

    const event = await Event.findById(id)

    res.json(event)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getEvents = async (req, res) => {
  const { month, year } = req.params
  try {
    const events = await Event.find({
      $expr: {
        $or: [
          {
            $and: [
              { $gte: ["$startingDate", new Date(year, Number(month) - 1, 1)] },
              {
                $lte: ["$startingDate", new Date(year, Number(month), 0)],
              },
            ],
          },
          {
            $and: [
              { $gte: ["$endingDate", new Date(year, Number(month) - 1, 1)] },
              {
                $lte: ["$endingDate", new Date(year, Number(month), 0)],
              },
            ],
          },
        ],
      },
    })

    res.status(200).json(events)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const postEvent = async (req, res) => {
  const post = req.body
  const newEvent = new Event(post)

  try {
    await newEvent.save()

    res.status(200).json(newEvent)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteEvent = async (req, res) => {
  const { id } = req.params

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No event with id: ${id}`)

    await Event.findByIdAndRemove(id)

    res.json({ message: "Event deleted successfully." })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const updateEvent = async (req, res) => {
  const { id } = req.params
  const {
    startingDate,
    endingDate,
    startingTime,
    endingTime,
    colorMood,
    title,
    description,
    image,
  } = req.body

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No event with id: ${id}`)

    const updatedEvent = {
      startingDate,
      endingDate,
      startingTime,
      endingTime,
      colorMood,
      title,
      description,
      image,
      _id: id,
    }

    await Event.findByIdAndUpdate(id, updatedEvent, { new: true })

    res.json(updatedEvent)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
