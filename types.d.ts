import { type DefaultSession } from "next-auth"
declare module "next-auth" {
    interface User {
        role: string
    }
    interface Session {
        user: {
            role: string
        } & DefaultSession["user"]
    }
}

import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
    interface JWT {
        role: string
    } 
}