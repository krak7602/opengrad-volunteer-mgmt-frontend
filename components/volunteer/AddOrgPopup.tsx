"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { addOrgSchema } from "@/lib/zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import * as React from "react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AddOrgPopup() {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
            <div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger>
                        <Button size="sm" variant="outline">
                            <PlusIcon className="h-4 w-4" />
                            <span className="sr-only">Add Organization</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold pb-6">Add Organization</DialogTitle>
                        </DialogHeader>
                        <AddOrgForm />
                    </DialogContent>
                </Dialog>
                {/* <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger
                        className="ml-auto inline-block text-sm text-gray-500 underline hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                        Forgot your password?
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold">Reset Password</DialogTitle>
                        </DialogHeader>
                        <PasswordResetForm />
                    </DialogContent>
                </Dialog> */}

            </div>

        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger >
                <Button size="sm" variant="outline">
                    <PlusIcon className="h-4 w-4" />
                    <span className="sr-only">Add Organization</span>
                </Button>
            </DrawerTrigger>
            <DrawerContent className="pb-6">
                <DrawerHeader className="text-left">
                    <DrawerTitle className="text-2xl font-bold px-1">Add Organization</DrawerTitle>
                </DrawerHeader>
                <div className="px-2">
                    <AddOrgForm />
                </div>

                {/* <DrawerFooter className="pt-2">
                    <DrawerClose className="text-left">
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter> */}
            </DrawerContent>
        </Drawer>
        // <Drawer open={open} onOpenChange={setOpen}>
        //     <DrawerTrigger
        //         className="ml-auto inline-block text-sm text-gray-500 underline hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
        //         Forgot your password?
        //     </DrawerTrigger>
        //     <DrawerContent className="pb-6">
        //         <DrawerHeader className="text-left">
        //             <DrawerTitle className="text-2xl font-bold px-1">Reset Password</DrawerTitle>
        //         </DrawerHeader>
        //         <div className="px-2">
        //             <PasswordResetForm />
        //         </div>

        //         {/* <DrawerFooter className="pt-2">
        //             <DrawerClose className="text-left">
        //                 <Button variant="outline">Cancel</Button>
        //             </DrawerClose>
        //         </DrawerFooter> */}
        //     </DrawerContent>
        // </Drawer>
    )
}

function AddOrgForm() {
    const form = useForm<z.infer<typeof addOrgSchema>>({
        resolver: zodResolver(addOrgSchema),
        defaultValues: {
            name: "",
            email: "",
        },
    })

    function onSubmit(values: z.infer<typeof addOrgSchema>) {
        console.log(values)
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Organization Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Add Organization</Button>
                </form>
            </Form>

        </div>
    )
}


function PlusIcon(props: { className: string }) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    )
}