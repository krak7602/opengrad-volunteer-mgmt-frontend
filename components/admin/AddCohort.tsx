import * as React from "react"
import { useState } from "react";

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useListState } from '@mantine/hooks';
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
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { PopoverClose } from '@radix-ui/react-popover';
import { format } from "date-fns"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import axios from "axios"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator
} from "@/components/ui/command"


export function AddCohort() {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const [orgName, setOrgName] = React.useState("")
    const [fromDate, setFromDate] = React.useState<Date>();
    const [toDate, setToDate] = React.useState<Date>();
    const [recipientPartners, setRecipientPartners] = useListState<partner>([])
    const [recipientPartnerCount, setRecipientPartnerCount] = useState(0)
    interface partner {
        id: number,
        name: string,
    }
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        console.log("orgName:", orgName);
        if (fromDate && toDate) {
            console.log("From:",)
            console.log("To:",)
        }

        try {
            if (fromDate && toDate && orgName !== "") {
                const resp = await axios.post(
                    `http://localhost:5001/cohort/create`,
                    {
                        "name": orgName,
                        "startDate": `${fromDate.getDate()}-${fromDate.getMonth() + 1}-${fromDate.getFullYear()}`,
                        "endDate": `${toDate.getDate()}-${toDate.getMonth() + 1}-${toDate.getFullYear()}`,
                        "poc": [1]
                    }
                    // { withCredentials: true }
                );

                console.log("The error is this:", resp.data)
            }
            // console.log("This is the data:",resp.data)
        } catch (e) {
            console.log(e)
        }
    }

    const partnerList: partner[] = [
        {
            id: 112,
            name: "NIT Trichy",
        },
        {
            id: 113,
            name: "NIT Suratkal",
        },
        {
            id: 114,
            name: "NIT Calicut",
        },
        {
            id: 115,
            name: "IIT Kharagpur",
        },
    ]

    const AddPartner = (selectedPartner: string) => {
        let found = false
        recipientPartners?.forEach(element => {
            if (element.name === selectedPartner) found = true;
        })
        if (!found) {
            partnerList.forEach(element => {
                if (element.name === selectedPartner) {
                    // if (recipientPartnerCount === 0) {
                    //     const handlePartners: partner[] = [element]
                    //     setRecipientPartners(handlePartners)
                    //     setRecipientPartnerCount(recipientPartnerCount + 1)
                    // } else {
                    //     const handlePartners = recipientPartners
                    //     handlePartners?.push(element)
                    //     setRecipientPartners(handlePartners)
                    //     setRecipientPartnerCount(recipientPartnerCount + 1)
                    // }
                    setRecipientPartners.append(element)
                    setRecipientPartnerCount(recipientPartnerCount + 1)
                }
            });
        }
    }

    const RemovePartner = (id: number) => {
        // const handleCohorts = recipientCohorts
        // handleCohorts?.splice(id, 1)
        // setRecipientCohorts(handleCohorts)
        // setRecipientCohortCount(recipientCohortCount - 1)
        setRecipientPartners.remove(id)
        setRecipientPartnerCount(recipientPartnerCount - 1)
    }
    // if (isDesktop) {
    //     return (
    //         <Dialog open={open} onOpenChange={setOpen}>
    //             <DialogTrigger asChild>
    //                 <Button variant="outline">Add Cohort</Button>
    //             </DialogTrigger>
    //             <DialogContent className="sm:max-w-[425px]">
    //                 <DialogHeader>
    //                     <DialogTitle>Add Cohort</DialogTitle>
    //                     {/* <DialogDescription>
    //                         Make changes to your profile here. Click save when you're done.
    //                     </DialogDescription> */}
    //                 </DialogHeader>
    //                 <PartnerAddForm />
    //             </DialogContent>
    //         </Dialog>
    //     )
    // }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                {/* <div>Add cohort</div> */}
                <Button variant="outline">Add Cohort</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Add Cohort</DrawerTitle>
                    {/* <DrawerDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DrawerDescription> */}
                </DrawerHeader>
                {/* <PartnerAddForm className="px-4" /> */}
                <div className=" px-4">
                    <form onSubmit={onSubmit} className="grid items-start gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Cohort Name</Label>
                            <Input type="text" id="name" onChange={e => { setOrgName(e.target.value) }} />
                        </div>
                        <div>
                            {/* <Label htmlFor="startdate">Start Date</Label> */}
                            <Accordion type="single" collapsible>
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>
                                        <Label htmlFor="enddate">Start Date</Label>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <Calendar initialFocus mode="single" selected={fromDate} onSelect={setFromDate} />
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                            {/* <Calendar className=" h-30" initialFocus mode="single" selected={fromDate} onSelect={setFromDate} /> */}

                        </div>
                        <div>
                            {/* <Label htmlFor="enddate">End Date</Label> */}
                            {/* <Calendar initialFocus mode="single" selected={toDate} onSelect={setToDate} /> */}
                            <Accordion type="single" collapsible>
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>
                                        <Label htmlFor="enddate">End Date</Label>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <Calendar initialFocus mode="single" selected={toDate} onSelect={setToDate} />
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>

                        </div>
                        <div>
                            <Accordion type="single" collapsible>
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>
                                        <Label htmlFor="enddate">Members</Label>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div>
                                            <div className="flex flex-wrap gap-2">
                                                {recipientPartners?.map((value, index) => (
                                                    <div key={index} className="bg-gray-500 text-white rounded-sm text-xs font-semibold px-1 flex flex-row items-center">
                                                        <div>{value.name}</div>
                                                        <CancelIcon onClick={() => RemovePartner(index)} className=" w-3 h-3 ml-1 text-white" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <Command >
                                            <CommandInput placeholder="Add Member Organization" />
                                            <CommandList >
                                                <CommandEmpty>No recipient found.</CommandEmpty>
                                                <CommandGroup className=" overflow-y-auto h-32 lg:h-56">
                                                    {partnerList.map((partner) => (
                                                        <CommandItem
                                                            key={partner.id}
                                                            value={partner.name}
                                                            onSelect={(currentValue) => {
                                                                AddPartner(currentValue)
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
                                                            {partner.name}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>

                        </div>


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

function PartnerAddForm({ className }: React.ComponentProps<"form">) {
    const [openCommand, setOpenCommand] = React.useState(false)
    const [orgName, setOrgName] = React.useState("")
    const [fromDate, setFromDate] = React.useState<Date>();
    const [toDate, setToDate] = React.useState<Date>();
    // const [recipientCohorts, setRecipientCohorts] = useListState<cohort>([])
    // const [recipientCohortCount, setRecipientCohortCount] = useState(0)
    interface partner {
        id: number,
        name: string,
    }
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        console.log("orgName:", orgName);
        console.log("From:", fromDate)
        console.log("To:", toDate)
    }
    // const AddCohort = (selectedCohort: string) => {
    //     let found = false
    //     recipientCohorts?.forEach(element => {
    //         if (element.name === selectedCohort) found = true;
    //     })
    //     if (!found) {
    //         cohortList.forEach(element => {
    //             if (element.name === selectedCohort) {
    //                 // if (recipientCohortCount === 0) {
    //                 //     const handleCohorts: cohort[] = [element]
    //                 //     setRecipientCohorts(handleCohorts)
    //                 //     setRecipientCohortCount(recipientCohortCount + 1)
    //                 // } else {
    //                 //     const handleCohorts = recipientCohorts
    //                 //     handleCohorts?.push(element)
    //                 //     setRecipientCohorts(handleCohorts)
    //                 //     setRecipientCohortCount(recipientCohortCount + 1)
    //                 // }
    //                 setRecipientCohorts.append(element)
    //                 setRecipientCohortCount(recipientCohortCount + 1)
    //             }
    //         });
    //     }
    // }
    const partnerList: partner[] = [
        {
            id: 112,
            name: "NIT Trichy",
        },
        {
            id: 113,
            name: "NIT Suratkal",
        },
        {
            id: 114,
            name: "NIT Calicut",
        },
        {
            id: 115,
            name: "IIT Kharagpur",
        },
    ]
    return (
        <form className={cn("grid items-start gap-4", className)}>
            <div className="grid gap-2">
                <Label htmlFor="name">Cohort Name</Label>
                <Input type="text" id="name" onChange={e => { setOrgName(e.target.value) }} />
            </div>
            <div>
                {/* <Label htmlFor="startdate">Start Date</Label> */}
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            <Label htmlFor="enddate">Start Date</Label>
                        </AccordionTrigger>
                        <AccordionContent>
                            <Calendar initialFocus mode="single" selected={fromDate} onSelect={setFromDate} />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                {/* <Calendar className=" h-30" initialFocus mode="single" selected={fromDate} onSelect={setFromDate} /> */}

            </div>
            <div>
                {/* <Label htmlFor="enddate">End Date</Label> */}
                {/* <Calendar initialFocus mode="single" selected={toDate} onSelect={setToDate} /> */}
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            <Label htmlFor="enddate">End Date</Label>
                        </AccordionTrigger>
                        <AccordionContent>
                            <Calendar initialFocus mode="single" selected={toDate} onSelect={setToDate} />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

            </div>
            <div>
                {/* <Label htmlFor="enddate">End Date</Label> */}
                {/* <Calendar initialFocus mode="single" selected={toDate} onSelect={setToDate} /> */}
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            <Label htmlFor="enddate">End Date</Label>
                        </AccordionTrigger>
                        <AccordionContent>
                            <Calendar initialFocus mode="single" selected={toDate} onSelect={setToDate} />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

            </div>



            {/* <div className="grid gap-2">
                <Label htmlFor="username"></Label>
                <Input id="username" defaultValue="@shadcn" />
            </div> */}
            <Button onSubmit={onSubmit} type="submit">Add</Button>
        </form>
    )
}


//  <Popover>
//     <PopoverTrigger asChild>
//         <Button
//             type="button"
//             variant={"outline"}
//             className={cn(
//                 " w-full md:w-[280px] justify-start text-left font-normal",
//                 !toDate && "text-muted-foreground"
//             )}
//         >
//             {/* <Button className="w-full justify-start text-left font-normal" id="date" variant="outline"> */}
//             <CalendarDaysIcon className="mr-1 h-4 w-4 -translate-x-1" />
//             {toDate ? format(toDate, "PPP") : <span>Select a date</span>}
//         </Button>
//     </PopoverTrigger>
//     <PopoverContent align="start" className="w-auto p-0">
//         <PopoverClose>
//             <Calendar initialFocus mode="single" selected={toDate} onSelect={setToDate} />
//         </PopoverClose>
//     </PopoverContent>
// </Popover> 
function CalendarDaysIcon(props: { className: string }) {
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
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M3 10h18" />
            <path d="M8 14h.01" />
            <path d="M12 14h.01" />
            <path d="M16 14h.01" />
            <path d="M8 18h.01" />
            <path d="M12 18h.01" />
            <path d="M16 18h.01" />
        </svg>
    )
}

const CancelIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"} {...props}>
        <path d="M19.0005 4.99988L5.00045 18.9999M5.00045 4.99988L19.0005 18.9999" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);