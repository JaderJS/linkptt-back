
import { FastifyInstance } from "fastify"
import userController from "../controllers/user-controller"
import { Server } from "socket.io"
import { ZodError, z } from "zod"
import { prisma } from "../database/client"
import { compare } from "bcryptjs"
import { sign } from 'jsonwebtoken'
import { config } from "../../config"


export const credentials = async (server: FastifyInstance, io: Server) => {

    server.get(`/users`, async (req, res) => {

        // const connectedClients = Object.keys(io.sockets.sockets).map((socketId) => socketId)

        // return res.send(connectedClients)

    })

    server.post(`/login`, async (req, res) => {

        const schema = z.object({ email: z.string(), password: z.string() })

        try {
            const { email, password } = schema.parse(req.body)

            const user = await prisma.user.findUniqueOrThrow({ where: { email } })

            const authorized = await compare(password, user.password)

            if (!authorized) {
                return res.status(400).send({ msg: "Email or password invalid" })
            }

            const token = sign({ cuid: user.cuid, username: user.username }, config.secretToken, { expiresIn: "7d" })

            return { msg: "Authorized", data: { user, token } }


        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).send({ msg: 'Erro de validação', errors: error.errors })
            }

            return res.status(500).send({ msg: "Internal error", errors: error })
        }
    })

    server.post(`/logout`, async (req, res) => {


        return res.status(501).send({ msg: "Method not implemented" })

    })

}

