"use client"
import React, { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { AddOrgForm } from "@/components/volunteer/AddOrgForm"
import { AddOrgPopup } from "@/components/volunteer/AddOrgPopup"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CollapsibleTrigger, CollapsibleContent, Collapsible } from "@/components/ui/collapsible"
import { Textarea } from "@/components/ui/textarea"

export default function DailyLog() {
    const [numSlots, setNumSlots] = useState(1);
    const handleIncreaseCards = () => {
        setNumSlots(numSlots + 1);
    };
    return (
        <div>
            <Card className="w-full max-w-2xl border-transparent">
                <CardHeader>
                    <CardTitle>Daily Work Log</CardTitle>
                    <CardDescription>Log your daily activities and time spent.</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* <form className="grid gap-4"> */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                        <div>
                            <Label htmlFor="date">Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button className="w-full justify-start text-left font-normal" id="date" variant="outline">
                                        <CalendarDaysIcon className="mr-1 h-4 w-4 -translate-x-1" />
                                        <span>Select date</span>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent align="start" className="w-auto p-0">
                                    <Calendar initialFocus mode="single" />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <div className="grid gap-4">
                        {Array.from({ length: numSlots }, (_, index) => (
                            <Collapsible className="grid gap-4">
                                <CollapsibleTrigger className="flex w-full items-center justify-between text-lg font-semibold [&[data-state=open]>svg]:rotate-90">
                                    Time Period {index + 1}
                                    <ChevronRightIcon className="ml-auto h-5 w-5 transition-all" />
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div>
                                            <Label htmlFor="start-time">Start Time</Label>
                                            <Input id="start-time" type="time" />
                                        </div>
                                        <div>
                                            <Label htmlFor="end-time">End Time</Label>
                                            <Input id="end-time" type="time" />
                                        </div>
                                        <div className="col-span-2">
                                            <Label htmlFor="activity">Activity</Label>
                                            <Textarea className="min-h-[100px]" id="activity" placeholder="Describe your activity" />
                                        </div>
                                        <div className="md:col-span-4">
                                            <Label htmlFor="time-spent">Time Spent</Label>
                                            <Input id="time-spent" readOnly type="text" />
                                        </div>
                                    </div>
                                </CollapsibleContent>
                            </Collapsible>
                        ))}
                        {numSlots>1 && <Button className="flex items-center justify-center gap-2 bg-destructive hover:bg-destructive text-white hover:text-white" onClick={() => setNumSlots(numSlots - 1)} variant="outline">
                            {/* <PlusIcon className="h-4 w-4" /> */}
                            Delete Time Period
                        </Button>}
                        <Button className="flex items-center justify-center gap-2" onClick={() => setNumSlots(numSlots + 1)} variant="outline">
                            <PlusIcon className="h-4 w-4" />
                            Add Time Period
                        </Button>
                        <div className="time-periods grid gap-4" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="total-time">Total Time Spent</Label>
                            <Input id="total-time" readOnly type="text" />
                        </div>
                    </div>
                    {/* </form> */}
                </CardContent>
                <CardFooter>
                    <Button type="submit">Submit</Button>
                </CardFooter>
            </Card>
        </div>

    )
}


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


function ChevronRightIcon(props: { className: string }) {
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
            <path d="m9 18 6-6-6-6" />
        </svg>
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