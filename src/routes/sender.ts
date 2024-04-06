
import { FastifyInstance } from "fastify"
import fs from "node:fs"
import path from "node:path"

export const sender = async (server: FastifyInstance) => {

    server.get(`/`, async (req, res) => {

        const path_ = path.join(__dirname, "../../", "/audio.wav")
        const stream = fs.createReadStream(path_)

        stream.on('error', (err) => {
            console.error('Error reading audio file:', err);
            // Destrua o socket para lidar com o evento de erro
            req.socket.destroy(err);
        })

        stream.on("data", (chunk) => {
            req.socket.emit("data", chunk)
            console.log(chunk)
        })

        stream.on("end", () => {
            return { msg: "Finish transmission" }
        })



        // return res.status(501).send({ msg: "Method not implemented" })
    })

}