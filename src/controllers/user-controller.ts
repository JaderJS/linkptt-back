// import { User } from "../schemas/user"
import { createId } from "@paralleldrive/cuid2"

// const usersLoggedIn = new Map<string, User>()

type User = {
    cuid: string,
    username: string,
    rooms: string[]
}

export class UserController {

    private users = new Map<string, User>()

    addUser(socketId: string, user: User) {
        this.users.set(socketId, user)
        return this.getUser(socketId)
    }

    updateRoom(socketId: string, room: string) {
        const user = this.getUser(socketId)

        if (!user) {
            return
        }
        if (user?.rooms?.includes(room)) {
            return
        }
        user?.rooms?.push(room)

        this.users.set(socketId, user)
    }
    removeRoom(socketId: string, room: string) {
        const user = this.getUser(socketId)

        if (!user || !user.rooms) {
            return
        }


        user.rooms = user.rooms.filter((r) => r !== room) as any

        this.users.set(socketId, user)
    }


    getUser(socketId: string) {
        return this.users.get(socketId)
    }

    hasUser(socketId: string) {
        return this.users.has(socketId)
    }

    getUsers() {
        const users = Object.fromEntries(this.users)
        return users
    }

    removeUser(socketId: string) {
        return this.users.delete(socketId)
    }
}

export default new UserController() 