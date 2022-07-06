import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"

import eventRoutes from "./routes/event.js"

const app = express()
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors({ origin: true }))

app.use("/event", eventRoutes)
app.get("/", (req, res) => {
  res.send("welcome to wacana API")
})

const PORT = process.env.PORT || 5000

const CONNECTION_URL = process.env.CONNECTION_URL

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message))
