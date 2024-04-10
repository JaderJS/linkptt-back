import { Server, Socket } from 'socket.io'
import fs from "node:fs"
import path from "node:path"
import { createId } from '@paralleldrive/cuid2'
import { verify } from 'jsonwebtoken'
import { config } from '../config'
import { prisma } from './database/client'

type Lobby = {
    cuid: string,
    roomId: number
}

import userController from './controllers/user-controller'



export const socketEvents = (io: Server) => {
    io.on('connection', async (socket: Socket) => {

        // userController.addUser(socket.id, )
        // console.log('Novo usuário conectado:', socket.id)

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

        socket.on("start:audio", (data) => {
            const user = userController.getUser(socket.id)
            if (!user || user?.rooms.length === 0) {
                return
            }
            socket.broadcast.to(user.rooms).emit("start:audio", data)
        })

        socket.on("sender:audio", (buffer, data) => {

            if (buffer instanceof Buffer) {
                // console.log(data)
                io.to(data.to).emit("sender:audio", buffer, data)
                // socket.to(data.to).emit("audio", buffer, data)
                // const filename = `${socket.id}+${createId()}.wav`
            }
        })

        socket.on("stop:audio", (data) => {
            const user = userController.getUser(socket.id)
            if (!user || user?.rooms.length === 0) {
                io.emit("stop:audio")
                return
            }
            socket.broadcast.to(user.rooms).emit("stop:audio", data)
        })


        socket.on("join:room", async (data) => {
            if (!data) {
                return
            }
            try {
                const token = socket.handshake.auth.token
                const { username, cuid_ } = verify(token, config.secretToken) as any

                data?.map(async ({ cuid, name }: any) => {
                    console.log(cuid, name)
                    prisma.channels.findUniqueOrThrow({ where: { cuid, users: { some: { userCuid: { equals: cuid_ } } } } }).then((channel) => {
                        socket.join(`${channel.cuid}`)
                        userController.updateRoom(socket.id, channel.cuid)
                        socket.emit("info:room", `${username} se conectou ao canal ${channel.name}`)
                    })

                })

            } catch (error) {
                console.error(error)
            }

        })

        socket.on("disconnect", () => {
            userController.removeUser(socket.id)
        })

    })

    io.use((socket, next) => {
        const token = socket.handshake.auth.token
        try {
            const { username, cuid } = verify(token, config.secretToken) as any
            if (!userController.hasUser(socket.id)) {
                userController.addUser(socket.id, { username, cuid, rooms: [] })
            }
            next()
        } catch {
            console.error(`JWT must be provided`)
        }
    })
}