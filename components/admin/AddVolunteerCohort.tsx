import * as React from "react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
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
import axios from "axios"
import { useSession } from 'next-auth/react'
import { useFetch } from "@mantine/hooks"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator
} from "@/components/ui/command"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function AddVolunteerCohort({ cohId }: { cohId: string }) {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const [studName, setStudName] = React.useState("")
    const [studEmail, setStudEmail] = React.useState("")
    const [studPhone, setStudPhone] = React.useState("")
    const [volSelected, setVolSelected] = React.useState<vol>()
    const session = useSession();
    const [send, setSend] = React.useState(false)
    interface vol {
        id: number
    }

    interface vols {
        id: number,
        name: string,
        startDate: number,
        endDate: number,
        vol: vol[]
    }
    const { data, loading, error, refetch, abort } = useFetch<vols[]>(
        `http://localhost:5001/cohort/volByCohort/${cohId})}`, {
        headers: {
            authorization: `bearer ${session.data?.user.auth_token}`
        }
    }
    );
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (studEmail && studName && studPhone) {
                const resp = await axios.post(
                    `http://localhost:5001/students/create`,
                    {
                        "name": studName,
                        "email": studEmail,
                        "phone": studPhone,
                        "volId": 2,
                        "cohortId": Number(cohId)
                    }, {
                    headers: {
                        Authorization: `bearer ${session.data?.user.auth_token}`
                    }
                }
                    // { withCredentials: true }
                );

                if (resp.data.success) {
                    setSend(true)
                }


                console.log("The error is this:", resp.data)
            }

            // console.log("This is the data:",resp.data)
        } catch (e) {
            console.log(e)
        }
    }

    // if (isDesktop) {
    //     return (
    //         <Dialog open={open} onOpenChange={setOpen}>
    //             <DialogTrigger asChild>
    //                 <Button variant="outline">
    //                     <PlusIcon />
    //                 </Button>
    //             </DialogTrigger>
    //             <DialogContent className="sm:max-w-[425px]">
    //                 <DialogHeader>
    //                     <DialogTitle>Add Volunteer</DialogTitle>
    //                     {/* <DialogDescription>
    //                         Make changes to your profile here. Click save when you're done.
    //                     </DialogDescription> */}
    //                 </DialogHeader>
    //                 <StudentAddForm />
    //             </DialogContent>
    //         </Dialog>
    //     )
    // }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline">
                    <PlusIcon />
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Add Volunteer</DrawerTitle>
                    {/* <DrawerDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DrawerDescription> */}
                </DrawerHeader>
                {/* <StudentAddForm className="px-4" /> */}
                <div className=" px-4">
                    <form onSubmit={onSubmit} className="grid items-start gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input type="text" id="name" onChange={e => { setStudName(e.target.value) }} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" id="email" onChange={e => { setStudEmail(e.target.value) }} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Email</Label>
                            <Input type="number" id="phone" maxLength={10} onChange={e => { setStudPhone(e.target.value) }} />
                        </div>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    <Label htmlFor="enddate">Members</Label>
                                </AccordionTrigger>
                                <AccordionContent>
                                    {/* <div>
                                        <div className="flex flex-wrap gap-2">
                                            {data?.map((value, index) => (
                                                <div key={index} className="bg-gray-500 text-white rounded-sm text-xs font-semibold px-1 flex flex-row items-center">
                                                    <div>{value.name}</div>
                                                    <CancelIcon onClick={() => RemovePartner(index)} className=" w-3 h-3 ml-1 text-white" />
                                                </div>
                                            ))}
                                        </div>
                                    </div> */}
                                    <Command >
                                        <CommandInput placeholder="Select Volunteer" />
                                        <CommandList >
                                            <CommandEmpty>No recipient found.</CommandEmpty>
                                            <CommandGroup className=" overflow-y-auto h-32 lg:h-56">
                                                {data && data.constructor === Array && <div>
                                                    {data[0].vol.map((value) => (
                                                        <CommandItem
                                                            key={value.id}
                                                            value={value.id.toString()}
                                                            onSelect={(currentValue) => {
                                                                setVolSelected(value)
                                                                // setValue(currentValue === value ? "" : currentValue)
                                                                // setOpen(false)
                                                            }}
                                                        >
                                                            {/* <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            value === partner.name ? "opacity-100" : "opacity-0"
                                                        )}
                                                    /> */}
                                                            {value.id}
                                                        </CommandItem>
                                                    ))}
                                                </div>}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        {/* <div className="grid gap-2">
                <Label htmlFor="username"></Label>
                <Input id="username" defaultValue="@shadcn" />
            </div> */}
                        <Button type="submit">Add</Button>
                    </form>
                </div>
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

function StudentAddForm({ className }: React.ComponentProps<"form">) {
    const [studName, setStudName] = React.useState("")
    const [studEmail, setStudEmail] = React.useState("")
    const [studPhone, setStudPhone] = React.useState("")
    const session = useSession();
    const [send, setSend] = React.useState(false)
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (studEmail && studName && studPhone) {
                const resp = await axios.post(
                    `http://localhost:5001/students/create`,
                    {
                        "name": studName,
                        "email": studEmail,
                        "phone": studPhone,
                        "volId": 2,
                        "cohortId": 1
                    }, {
                    headers: {
                        Authorization: `bearer ${session.data?.user.auth_token}`
                    }
                }
                    // { withCredentials: true }
                );

                if (resp.data.success) {
                    setSend(true)
                }


                console.log("The error is this:", resp.data)
            }

            // console.log("This is the data:",resp.data)
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <form onSubmit={onSubmit} className={cn("grid items-start gap-4", className)}>
            <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" onChange={e => { setStudName(e.target.value) }} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" onChange={e => { setStudEmail(e.target.value) }} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="phone">Email</Label>
                <Input type="number" id="phone" maxLength={10} onChange={e => { setStudPhone(e.target.value) }} />
            </div>
            {/* <div className="grid gap-2">
                <Label htmlFor="username"></Label>
                <Input id="username" defaultValue="@shadcn" />
            </div> */}
            <Button type="submit">Add</Button>
        </form>
    )
}

const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill={"none"} {...props}>
        <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);