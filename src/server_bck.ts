import express from "express"
import { Router, Response, Request } from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import { config } from "../config"

// import { router as credentials } from "./routes/credentials"
import { socketEvents } from "./socket"


const app = express()
const http = createServer(app)
const route = Router()
const io = new Server(http, {})

socketEvents(io)

app.use(express.json())
app.use(route)
// app.use("/", credentials)

route.get('/', (req: Request, res: Response) => {
    res.json({ message: 'hello world with Typescript' })
})

http.listen(config.port, () => { console.log(`🔥 server running on port ${config.port}`) })

