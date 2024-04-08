import { FastifyReply, FastifyRequest } from "fastify";
import { JwtPayload, decode, verify } from "jsonwebtoken"
import { config } from "../../config";
import { prisma } from "../database/client";

export const verifyToken = async (req: FastifyRequest, res: FastifyReply) => {
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
        return res.status(401).send({ msg: "Unothorized: token missing" })
    }
    try {
        const payload = verify(token, config.secretToken) as JwtPayload
        const user = await prisma.user.findUniqueOrThrow({ where: { cuid: payload?.cuid }, select: { cuid: true, email: true, name: true, username: true, role: true } })
        req.body = { user }
    } catch (error) {
        return res.status(403).send({ msg: "Unothorized: Error validation" })
    }
}