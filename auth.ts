import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { useToast } from "@/components/ui/use-toast"
import { signInSchema } from "@/lib/zod"
import { useSearchParams } from "next/navigation"

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: { strategy: "jwt" },
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials, request) => {
                let user = null
                // const params = (request.url.toString());
                const url = new URL(request.url)
                const params = url.searchParams
                console.log("Params: ", params)

                user = {
                    email: "email1@gmail.com",
                    password: "pass2#AA",
                    role: "volunteer"
                }
                // const cred = await signInSchema.parseAsync(credentials)
                console.log("Credentials:", credentials.email)
                // console.log("Credentials email:", cred)
                if (!user) {
                    throw new Error("User not found.")
                }
                // console.log("Cred: " , credentials.email)
                // if (email != user.email || password != user.password) {
                //     // "use client"
                //     // No user found, so this is their first attempt to login
                //     // meaning this is also the place you could do registration
                //     Error("User not found")
                //     // Error("This is what happens")
                //     // const { toast } = useToast()
                //     // toast({
                //     //     title: "Uh oh! Something went wrong.",
                //     //     description: "There was a problem with your request."
                //     // })

                // }

                // return user object with the their profile data
                return user
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            // const Exteduser: ExtendedUser = user;
            if (user) token.role = user.role;
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.role = token.role;
            }
            return session;
        },
    },
    trustHost: true
})