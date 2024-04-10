import { prisma } from "./client";
import { compare, hash } from "bcryptjs";

const main = async () => {

    try {

        const password = await hash("admin", 10)


        await prisma.user.create({
            data: {
                role: "root",
                email: "jader.jader55@gmail.com", name: "Jader", username: "Jader", password,
                channels: {
                    create: {
                        channel: {
                            create: {
                                name: "LinkNetwork",
                                password,
                                owner: { connect: { email: "jader.jader55@gmail.com" } },
                                updated: { connect: { email: "jader.jader55@gmail.com" } },
                                avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzsxYKw_k6OlryRm9sRxEpzQQnl4ylJN8fn1QYCYYLTw&s"
                            }
                        }
                    }
                }
            },
        })

    } catch (error) {
        throw error
    }
}
main().then(() => console.log("Seed running sucessfly")).catch(console.error)
