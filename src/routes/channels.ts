
import { FastifyInstance } from "fastify"
import { prisma } from "../database/client"
import { ZodError, z } from "zod"
import { hash } from "bcryptjs"
import { verifyToken } from "../middleware/auth"


export const channels = async (server: FastifyInstance) => {

    server.get(`/`, { preHandler: verifyToken }, async (req, res) => {

        const { user } = req.body as any
        if (!user) {
            return res.status(400).send({ msg: "No user" })
        }

        const channelsToUser = await prisma.user.findUniqueOrThrow({
            where: {
                cuid: user.cuid
            }, include: {
                channels: {
                    include: {
                        channel: {
                            select: {
                                id: true,
                                name: true,
                                isPuclib: true,
                            }
                        }
                    }
                }
            }
        })

        return res.send({ channels: channelsToUser.channels.map((channel) => channel.channel) })
    })

    server.post(`/`, async (req, res) => {
        const schema = z.object({
            name: z.string(),
            avatarUrl: z.string().url(),
            password: z.string(),
            createdBy: z.string().cuid(),
            updatedBy: z.string().cuid(),
            isPublic: z.boolean()
        })

        try {
            const { password, ...rest } = schema.parse(req.body)

            const data = await prisma.channels.create({ data: { ...rest, password: await hash(password, 10) } })

            return res.status(201).send({ msg: "User created", data })

        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).send({ msg: 'Erro de validação', errors: error.errors })
            }
            return res.status(500).send({ msg: 'Erro interno do servidor' })
        }

    })

    server.delete(`/`, async (req, res) => {
        const schema = z.object({
            id: z.number(),
        })

        try {
            const { id } = schema.parse(req.body)
            await prisma.channels.delete({ where: { id: id } })
            return res.status(200).send({ msg: "User deleted" })

        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).send({ msg: 'Erro de validação', errors: error.errors })
            }
            return res.status(500).send({ msg: 'Erro interno do servidor' })
        }
    })

}