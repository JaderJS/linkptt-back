
import { FastifyInstance } from "fastify"
import { prisma } from "../database/client"
import { ZodError, z } from "zod"
import { hash } from "bcryptjs"


export const channels = async (server: FastifyInstance) => {

    server.get(`/`, async (req, res) => {

        const channels = await prisma.channels.findMany({ where: { isPuclib: true } })
        return res.send({ data: channels.map((channel) => channel) })
    })

    server.post(`/`, async (req, res) => {
        const schema = z.object({
            name: z.string(),
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