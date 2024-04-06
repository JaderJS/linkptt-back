import { User } from "../schemas/user"
import { createId } from "@paralleldrive/cuid2"

// const usersLoggedIn = new Map<string, User>()

export class UserController {

    private usersLoggedIn = new Map<string, User>()

    addUser(user: User) {
        const cuid = createId()
        this.usersLoggedIn.set(cuid, user)
        return this.getUser(cuid)
    }

    getUser(key: string) {
        return this.usersLoggedIn.get(key)
    }

    getUsers() {
        const users = Object.fromEntries(this.usersLoggedIn)
        return users
    }

    removeUser(key: string) {
        return this.usersLoggedIn.delete(key)
    }
}

export default new UserController() 