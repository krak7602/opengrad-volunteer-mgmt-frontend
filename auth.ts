import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { useToast } from "@/components/ui/use-toast"
import { signInSchema } from "@/lib/zod"
import { useSearchParams } from "next/navigation"
import { NextApiRequest, NextApiResponse } from "next"


export const { handlers, signIn, signOut, auth } = NextAuth(
    // console.log(req)
    // return 
    {
        // secret: process.env.AUTH_SECRET,

        providers: [
            Credentials({
                credentials: {
                    email: { label: "Email", type: "email" },
                    password: { label: "Password", type: "password" },
                    role: { label: "Role", type: "text" }
                },
                authorize: async (credentials) => {
                    // let user = null
                    let volunteer1 = null
                    let partner1 = null
                    let admin1 = null
                    // const params = (request.url.toString());
                    // const url = new URL(request.url)
                    // const params = url.searchParams
                    // console.log("Params:", params)
                    // const { email, password } = await signInSchema.parseAsync(credentials)
                    // console.log("The creds:",credentials);
                    // console.log("The email:",email);
                    // console.log("The password:",password);
                    // const cred = {email: params}
                    // const cred = { email: params.get("email"), password: params.get("password") }
                    const { email, password, role } = await signInSchema.parseAsync(credentials)
                    volunteer1 = {
                        email: "volunteer1@gmail.com",
                        password: "volu2#AA",
                        role: "volunteer"
                    }
                    partner1 = {
                        email: "partner1@gmail.com",
                        password: "part2#AA",
                        role: "partner"
                    }
                    admin1 = {
                        email: "admin1@gmail.com",
                        password: "admi2#AA",
                        role: "admin"
                    }
                    // user = {
                    //     email: "email1@gmail.com",
                    //     password: "pass2#AA",
                    //     role: role
                    // }
                    // const cred = await signInSchema.parseAsync(credentials)
                    // console.log("Credentials:", cred)
                    // console.log("Params:", params)

                    // console.log(cred.email)
                    // console.log("Credentials email:", cred.email)
                    // console.log("Cred password: ", cred.password)

                    // if (cred.email != user.email || cred.password != user.password) {
                    // if (email != user.email || password != user.password) {
                    //     throw new Error("User not found.")
                    // }

                    if (role === "admin") {
                        if (email != admin1.email || password != admin1.password) {
                            throw new Error("Adminstrator account not found.")
                        }
                    }
                    if (role === "partner") {
                        if (email != partner1.email || password != partner1.password) {
                            throw new Error("Organization account not found.")
                        }
                    }
                    if (role === "volunteer") {
                        if (email != volunteer1.email || password != volunteer1.password) {
                            throw new Error("Volunteer account not found.")
                        }
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
                    return {email:email, password:password, role:role}
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
    }
)