"use client"
import { signIn } from "next-auth/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import EyeIcon from "@/components/ui/EyeIcon"
import EyeSlashIcon from "@/components/ui/EyeSlashIcon"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import React from "react"
import { signInSchema } from "@/lib/zod"
import { PasswordResetForm } from "@/components/volunteer/PasswordResetForm"



export default function SignIn() {
    const router = useRouter()
    const [showPassword, setShowPassword] = React.useState(false)
    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })


    async function onSubmit(values: z.infer<typeof signInSchema>) {
        // await signIn("credentials", { values, redirect: false })
        await signIn("credentials", { redirect: false }, values)
        router.push("/dashboard")
    }

    async function togglePasswordVisiblity() {
        setShowPassword(!showPassword)
    }

    return (
        <Form {...form}>
            <Card>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Sign in to your account</CardTitle>
                        <CardDescription>
                            Enter your email and password to access your volunteer account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} required type="email" />
                                        </FormControl>
                                        <FormDescription>
                                            {/* Enter your email shared with OpenGrad. */}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="relative space-y-2">
                                        <div className="flex items-center">
                                            <FormLabel>Password</FormLabel>
                                            <Dialog>
                                                <DialogTrigger
                                                className="ml-auto inline-block text-sm text-gray-500 underline hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                                                    Forgot your password?
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle className="text-2xl font-bold">Reset Password</DialogTitle>
                                                        <DialogDescription>
                                                            <PasswordResetForm/>
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                </DialogContent>
                                            </Dialog>
                                            {/* <Link
                                                className="ml-auto inline-block text-sm text-gray-500 underline hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                                href="#">
                                                Forgot your password?
                                            </Link> */}
                                        </div>
                                        <FormControl>
                                            <div>
                                                <Input placeholder="" {...field} required type={showPassword ? "text" : "password"} />
                                                <Button className="absolute top-9 right-1 h-7 w-7" size="icon" variant="ghost" onClick={togglePasswordVisiblity}>
                                                    {/* <EyeIcon className={showPassword ? "visible h-4 w-4" : "hidden"} />
                                                    <EyeSlashIcon className={showPassword ? "hidden" : "visible h-4 w-4"} />
                                                    <span className="sr-only">Toggle password visibility</span> */}
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormDescription>
                                            {/* Provide a Password. */}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" type="submit">Sign in</Button>
                    </CardFooter>
                </form>
            </Card>
        </Form>
    )
}

