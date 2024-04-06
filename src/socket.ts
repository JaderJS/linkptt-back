import { Server, Socket } from 'socket.io'
import fs from "node:fs"

export const socketEvents = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log('Novo usuário conectado:', socket.id)

        socket.on('start', (data) => {
            io.emit('start', data)
        })

        socket.on('send', (data) => {
            io.emit('send', data)
        })

        socket.on("stop", (data) => {
            io.emit("stop", data)
        })
        socket.on("metadata", (data) => {
            io.emit("metadata", data)
        })

        socket.on("audio", (data) => {
            console.log(data)

            if (data instanceof Buffer) {
                io.emit("audio", data)
            }
            console.log("This data is not Blob")

        })
    })

    io.use((socket, next) => {
        const token = socket.handshake.auth.token
        console.log(token)
        next()
    })
}