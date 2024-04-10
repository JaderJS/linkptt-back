import { FastifyInstance } from "fastify"
import multer from "fastify-multer"

export const utils = async (server: FastifyInstance) => {

    const upload = multer({ dest: `/tmp` })

    server.register(multer.contentParser)

    server.post(`/upload`, { preHandler: upload.single("file") }, async (req, res) => {

        const archive = { path: "", pathUrl: "", size: "" } 

        res.send({ msg: "Upload successfly", archive })
    })
}