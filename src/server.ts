import Fastify from "fastify"
import FastifyIO from "fastify-socket.io"
import cors from '@fastify/cors'
import { Server } from "socket.io"

import { socketEvents } from "./socket"
import { credentials } from "./routes/credentials"
import { sender } from "./routes/sender"
import { config } from "../config"
import { channels } from "./routes/channels"


const app = Fastify({ logger: false })

app.register(FastifyIO, { cors: { origin: "*" } })
app.register(cors, { origin: "*" })

app.register(credentials)
app.register(sender, { prefix: "/debug" })
app.register(channels, { prefix: "/channels" })

app.ready(() => {
    socketEvents(app.io)
})

app.listen({ port: config.port }).then(() => { console.log(`🔥 Running server in ${config.port}`) })

app.addHook('preHandler', (request, response, done) => {

    (request as any).socketContext = {
        socket: app.io,
    }
    done()
})


declare module "fastify" {
    interface FastifyInstance {
        io: Server<{ hello: string }>,
    }
    interface FastifyRequest {
        socketContext: {
            socket: typeof FastifyIO
        }
    }
}
