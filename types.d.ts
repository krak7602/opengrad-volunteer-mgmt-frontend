import { type DefaultSession } from "next-auth"
declare module "next-auth" {
    interface User {
        role: string,
        auth_id?: number,
    }
    interface Session {
        user: {
            role: string,
            auth_id?: number,
        } & DefaultSession["user"]
    }
}

import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
    interface JWT {
        role: string,
        auth_id?: number,
    }
}