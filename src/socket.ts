import { Server, Socket } from 'socket.io'
import fs from "node:fs"
import path from "node:path"
import { createId } from '@paralleldrive/cuid2'

export const socketEvents = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log('Novo usuário conectado:', socket.id)

        socket.on('start', (data) => {
            io.emit('start', data)
        })

        socket.on("stop", (data) => {
            io.emit("stop", data)
            // const chunks = fs.readFileSync(path.join(__dirname, "../", "/tmp"))
            // console.log(chunks)
        })

        socket.on("audio", async (data) => {
            
            if (data instanceof Buffer) {
                io.emit("audio", data)
                const filename = `${socket.id}+${createId()}.wav`
                // fs.appendFileSync(path.join(__dirname, "../", "/tmp", filename), data)
            }

        })
    })

    io.use((socket, next) => {
        const token = socket.handshake.auth.token
        console.log(token)
        next()
    })
}