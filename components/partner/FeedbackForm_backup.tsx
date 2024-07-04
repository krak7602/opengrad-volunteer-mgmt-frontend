"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { AddOrgForm } from "@/components/volunteer/AddOrgForm"
import { AddOrgPopup } from "@/components/volunteer/AddOrgPopup"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { CollapsibleTrigger, CollapsibleContent, Collapsible } from "@/components/ui/collapsible"
import { Textarea } from "@/components/ui/textarea"
import { TimePicker12Demo } from '../ui/time-picker-12h-demo';
import { format } from "date-fns"
import { PopoverClose } from '@radix-ui/react-popover';
import LogField from '@/components/volunteer/LogField';
import { useToast } from "@/components/ui/use-toast"
import { columns } from "@/components/volunteer/logColumn" // Not needed
import { LogTable } from "@/components/volunteer/logTable" // Not needed

export default function FeedbackForm() {
    interface FeedbackItem {
        id: number,
        type: string,
        question: string,
        option_count: number,
        option1: string,
        option2: string,
        option3: string,
        option4: string, 
    }
    const [numFields, setNumFields] = useState(0);
    
    const [formData, setFormData] = useState<FeedbackItem[]>();
    const formSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // console.log(demoSlot)
        console.log(formData?.map((slot, index) => (slot)))

        toast({
            description: "Your form has been submitted successfully"
        })

        const dayBuf: logDay = {
            date: date,
            slots: formData
        }

        const dayBufArr: logDay[] = [];
        dayBufArr.push(dayBuf)
        dayBufArr.push(dayBuf)



        // const dayLog: logDay = {
        //     date: date,
        //     slots: formData
        // }

        // const logHis = logData;
        // logHis?.logs.push(dayLog);
        console.log("Daybuf:", dayBuf)
        console.log("JSON:", JSON.stringify(dayBuf))
        console.log("Fuul:", JSON.stringify(dayBufArr))
        //     fs.writeFile('logHis.json', JSON.stringify(dayBuf), (err) => {
        //         if (err) {
        //             console.log('Error writing file:', err);
        //         } else {
        //             console.log('Successfully wrote file');
        //         }
        //     });
        router.push('/dashboard')
    }

    // <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
    //                 <div className='grid grid-cols-1 gap-4'>
    //                     <Label htmlFor="date">Date</Label>
    //                     <Popover>
    //                         <PopoverTrigger asChild>
    //                             <Button
    //                                 type="button"
    //                                 variant={"outline"}
    //                                 className={cn(
    //                                     " w-full md:w-[280px] justify-start text-left font-normal",
    //                                     !date && "text-muted-foreground"
    //                                 )}
    //                             >
    //                                 {/* <Button className="w-full justify-start text-left font-normal" id="date" variant="outline"> */}
    //                                 <CalendarDaysIcon className="mr-1 h-4 w-4 -translate-x-1" />
    //                                 {date ? format(date, "PPP") : <span>Select a date</span>}
    //                             </Button>
    //                         </PopoverTrigger>
    //                         <PopoverContent align="start" className="w-auto p-0">
    //                             <PopoverClose>
    //                                 <Calendar initialFocus mode="single" selected={date} onSelect={setDate} />
    //                             </PopoverClose>
    //                         </PopoverContent>
    //                     </Popover>
    //                 </div>
    //             </div>

    return (

        <div className="overflow-x-auto px-1 pt-2">
            <form onSubmit={formSubmit}>
                
                <div>
                    {formData?.map((item, index) => (
                        // <div>Something</div>
                            <LogField handleSlotFieldChange={handleSlotFieldChange} handleTimeChange={handleTimeChange} index={index} />
                        // <Collapsible key={index} defaultOpen className="gap-6">
                        //     <CollapsibleTrigger className="flex w-full items-center justify-between text-lg font-semibold [&[data-state=open]>svg]:rotate-90">
                        //         Slot #{index + 1}: {slot.activity}
                        //         <ChevronRightIcon className="ml-auto h-5 w-5 transition-all" />
                        //     </CollapsibleTrigger>
                        //     <CollapsibleContent>
                        //         <LogField handleSlotFieldChange={handleSlotFieldChange} handleTimeChange={handleTimeChange} index={index} />
                        //     </CollapsibleContent>
                        // </Collapsible>
                    ))}
                    <div className="flex">
                        {numFields > 0 && <Button type="button" className="mr-3 flex items-center justify-center gap-2 bg-destructive hover:bg-destructive text-white hover:text-white" onClick={(e) => { handleDecreaseSlots(e) }} variant="outline">
                            <RemoveIcon className="h-4 w-4 text-white" />
                            Delete Field
                        </Button>}
                        <Popover>
                            <PopoverTrigger>
                                <Button type="button" className="flex items-center justify-center gap-2" variant="outline">
                                    <PlusIcon className="h-4 w-4 text-black" />
                                    Add Field
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 flex flex-wrap">
                                <PopoverClose onClick={(e) => { handleIncreaseSlots(e, "Text") }} className="m-1 grow h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                                    Text
                                </PopoverClose>
                                <PopoverClose onClick={(e) => { handleIncreaseSlots(e, "Options") }} className="m-1 grow h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                                    Options
                                </PopoverClose>
                                
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* <h1>numSlots: {numSlots}</h1> */}
                    {/* <LogField handleSlotFieldChange={handleSlotFieldChange} handleTimeChange={handleTimeChange} index={0} /> */}
                </div>
                <div>
                    <Button type='submit' className="my-2">Submit</Button>
                </div>
            </form>




            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="total-time">Total Time Spent</Label>
                            <Input id="total-time" readOnly type="text" />
                        </div>
                    </div> */}
        </div>
    )
}

export function DailyLog() {
    const router = useRouter()
    const [numSlots, setNumSlots] = useState(0);
    const [formData, setFormData] = useState<slotItem[]>();
    // const [logData, setLogData] = useState<logHist>()
    const [date, setDate] = useState<Date>();
    const { toast } = useToast()
    const handleSlotFieldChange = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number, field: string) => {
        const handleData = formData
        if (handleData) {
            if (field == "details") {
                handleData[index].details = e.target.value;
            }
        }

    }

    function getData(): logDay[] {
        // Fetch data from your API here.
        return [{ "date": new Date("2024-06-28T18:30:00.000Z"), "slots": [{ "id": 0, "hourStart": "07", "minStart": "00", "hourEnd": "08", "minEnd": "00", "activity": "Content Creation", "details": "Created P" }, { "id": 1, "hourStart": "10", "minStart": "30", "hourEnd": "11", "minEnd": "00", "activity": "Mentoring", "details": "Mentored Q" }] },
        { "date": new Date("2024-06-29T18:30:00.000Z"), "slots": [{ "id": 0, "hourStart": "08", "minStart": "00", "hourEnd": "09", "minEnd": "00", "activity": "Content Creation", "details": "Created X" }, { "id": 1, "hourStart": "10", "minStart": "30", "hourEnd": "11", "minEnd": "00", "activity": "Mentoring", "details": "Mentored Y" }] },
        { "date": new Date("2024-06-29T18:30:00.000Z"), "slots": [{ "id": 0, "hourStart": "08", "minStart": "00", "hourEnd": "09", "minEnd": "00", "activity": "Content Creation", "details": "Created X" }, { "id": 1, "hourStart": "10", "minStart": "30", "hourEnd": "11", "minEnd": "00", "activity": "Mentoring", "details": "Mentored Y" }] },
        { "date": new Date("2024-06-29T18:30:00.000Z"), "slots": [{ "id": 0, "hourStart": "08", "minStart": "00", "hourEnd": "09", "minEnd": "00", "activity": "Content Creation", "details": "Created X" }, { "id": 1, "hourStart": "10", "minStart": "30", "hourEnd": "11", "minEnd": "00", "activity": "Mentoring", "details": "Mentored Y" }] },
        { "date": new Date("2024-06-29T18:30:00.000Z"), "slots": [{ "id": 0, "hourStart": "08", "minStart": "00", "hourEnd": "09", "minEnd": "00", "activity": "Content Creation", "details": "Created X" }, { "id": 1, "hourStart": "10", "minStart": "30", "hourEnd": "11", "minEnd": "00", "activity": "Mentoring", "details": "Mentored Y" }] },
        { "date": new Date("2024-06-29T18:30:00.000Z"), "slots": [{ "id": 0, "hourStart": "08", "minStart": "00", "hourEnd": "09", "minEnd": "00", "activity": "Content Creation", "details": "Created X" }, { "id": 1, "hourStart": "10", "minStart": "30", "hourEnd": "11", "minEnd": "00", "activity": "Mentoring", "details": "Mentored Y" }] },
        { "date": new Date("2024-06-29T18:30:00.000Z"), "slots": [{ "id": 0, "hourStart": "08", "minStart": "00", "hourEnd": "09", "minEnd": "00", "activity": "Content Creation", "details": "Created X" }, { "id": 1, "hourStart": "10", "minStart": "30", "hourEnd": "11", "minEnd": "00", "activity": "Mentoring", "details": "Mentored Y" }] },
        { "date": new Date("2024-06-29T18:30:00.000Z"), "slots": [{ "id": 0, "hourStart": "08", "minStart": "00", "hourEnd": "09", "minEnd": "00", "activity": "Content Creation", "details": "Created X" }, { "id": 1, "hourStart": "10", "minStart": "30", "hourEnd": "11", "minEnd": "00", "activity": "Mentoring", "details": "Mentored Y" }] },
        { "date": new Date("2024-06-29T18:30:00.000Z"), "slots": [{ "id": 0, "hourStart": "08", "minStart": "00", "hourEnd": "09", "minEnd": "00", "activity": "Content Creation", "details": "Created X" }, { "id": 1, "hourStart": "10", "minStart": "30", "hourEnd": "11", "minEnd": "00", "activity": "Mentoring", "details": "Mentored Y" }] },
        { "date": new Date("2024-06-29T18:30:00.000Z"), "slots": [{ "id": 0, "hourStart": "08", "minStart": "00", "hourEnd": "09", "minEnd": "00", "activity": "Content Creation", "details": "Created X" }, { "id": 1, "hourStart": "10", "minStart": "30", "hourEnd": "11", "minEnd": "00", "activity": "Mentoring", "details": "Mentored Y" }] },
        { "date": new Date("2024-06-29T18:30:00.000Z"), "slots": [{ "id": 0, "hourStart": "08", "minStart": "00", "hourEnd": "09", "minEnd": "00", "activity": "Content Creation", "details": "Created X" }, { "id": 1, "hourStart": "10", "minStart": "30", "hourEnd": "11", "minEnd": "00", "activity": "Mentoring", "details": "Mentored Y" }] },
        { "date": new Date("2024-06-29T18:30:00.000Z"), "slots": [{ "id": 0, "hourStart": "08", "minStart": "00", "hourEnd": "09", "minEnd": "00", "activity": "Content Creation", "details": "Created X" }, { "id": 1, "hourStart": "10", "minStart": "30", "hourEnd": "11", "minEnd": "00", "activity": "Mentoring", "details": "Mentored Y" }] },
        { "date": new Date("2024-06-29T18:30:00.000Z"), "slots": [{ "id": 0, "hourStart": "08", "minStart": "00", "hourEnd": "09", "minEnd": "00", "activity": "Content Creation", "details": "Created X" }, { "id": 1, "hourStart": "10", "minStart": "30", "hourEnd": "11", "minEnd": "00", "activity": "Mentoring", "details": "Mentored Y" }] },
        { "date": new Date("2024-06-29T18:30:00.000Z"), "slots": [{ "id": 0, "hourStart": "08", "minStart": "00", "hourEnd": "09", "minEnd": "00", "activity": "Content Creation", "details": "Created X" }, { "id": 1, "hourStart": "10", "minStart": "30", "hourEnd": "11", "minEnd": "00", "activity": "Mentoring", "details": "Mentored Y" }] },
        { "date": new Date("2024-06-29T18:30:00.000Z"), "slots": [{ "id": 0, "hourStart": "08", "minStart": "00", "hourEnd": "09", "minEnd": "00", "activity": "Content Creation", "details": "Created X" }, { "id": 1, "hourStart": "10", "minStart": "30", "hourEnd": "11", "minEnd": "00", "activity": "Mentoring", "details": "Mentored Y" }] },
        { "date": new Date("2024-06-29T18:30:00.000Z"), "slots": [{ "id": 0, "hourStart": "08", "minStart": "00", "hourEnd": "09", "minEnd": "00", "activity": "Content Creation", "details": "Created X" }, { "id": 1, "hourStart": "10", "minStart": "30", "hourEnd": "11", "minEnd": "00", "activity": "Mentoring", "details": "Mentored Y" }] },
        { "date": new Date("2024-06-29T18:30:00.000Z"), "slots": [{ "id": 0, "hourStart": "08", "minStart": "00", "hourEnd": "09", "minEnd": "00", "activity": "Content Creation", "details": "Created X" }, { "id": 1, "hourStart": "10", "minStart": "30", "hourEnd": "11", "minEnd": "00", "activity": "Mentoring", "details": "Mentored Y" }] },
        { "date": new Date("2024-06-29T18:30:00.000Z"), "slots": [{ "id": 0, "hourStart": "08", "minStart": "00", "hourEnd": "09", "minEnd": "00", "activity": "Content Creation", "details": "Created X" }, { "id": 1, "hourStart": "10", "minStart": "30", "hourEnd": "11", "minEnd": "00", "activity": "Mentoring", "details": "Mentored Y" }] },
        { "date": new Date("2024-06-29T18:30:00.000Z"), "slots": [{ "id": 0, "hourStart": "08", "minStart": "00", "hourEnd": "09", "minEnd": "00", "activity": "Content Creation", "details": "Created X" }, { "id": 1, "hourStart": "10", "minStart": "30", "hourEnd": "11", "minEnd": "00", "activity": "Mentoring", "details": "Mentored Y" }] },
        { "date": new Date("2024-06-29T18:30:00.000Z"), "slots": [{ "id": 0, "hourStart": "08", "minStart": "00", "hourEnd": "09", "minEnd": "00", "activity": "Content Creation", "details": "Created X" }, { "id": 1, "hourStart": "10", "minStart": "30", "hourEnd": "11", "minEnd": "00", "activity": "Mentoring", "details": "Mentored Y" }] },
        { "date": new Date("2024-06-29T18:30:00.000Z"), "slots": [{ "id": 0, "hourStart": "08", "minStart": "00", "hourEnd": "09", "minEnd": "00", "activity": "Content Creation", "details": "Created X" }, { "id": 1, "hourStart": "10", "minStart": "30", "hourEnd": "11", "minEnd": "00", "activity": "Mentoring", "details": "Mentored Y" }] },];
    }

    const dataLogx = getData()

    const handleTimeChange = (value: string, index: number, field: string, pos: string) => {
        const handleData = formData
        if (pos == "start") {
            if (handleData) {
                if (field == "hour") {
                    handleData[index].hourStart = value;
                } else if (field == "min") {
                    handleData[index].minStart = value;
                }
            }
        } else if (pos == "end") {
            if (handleData) {
                if (field == "hour") {
                    handleData[index].hourEnd = value;
                } else if (field == "min") {
                    handleData[index].minEnd = value;
                }
            }
        }

    }
    const handleIncreaseSlots = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, activity: string) => {
        if (numSlots === 0) {
            const handleData: slotItem[] = [
                {
                    id: numSlots,
                    hourStart: "--",
                    minStart: "--",
                    hourEnd: "--",
                    minEnd: "--",
                    activity: activity,
                    details: ""
                }]
            setFormData(handleData)
            setNumSlots(numSlots + 1)
        } else {
            const handleData = formData
            handleData?.push({
                id: numSlots,
                hourStart: "--",
                minStart: "--",
                hourEnd: "--",
                minEnd: "--",
                activity: activity,
                details: ""
            })
            setFormData(handleData)
            setNumSlots(numSlots + 1)
        }
    };
    const handleDecreaseSlots = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (numSlots > 0) {
            const handleData = formData
            handleData?.pop()
            setFormData(handleData)
            setNumSlots(numSlots - 1)
        }
    }



    const formSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // console.log(demoSlot)
        console.log(formData?.map((slot, index) => (slot)))

        toast({
            description: "Your form has been submitted successfully"
        })

        const dayBuf: logDay = {
            date: date,
            slots: formData
        }

        const dayBufArr: logDay[] = [];
        dayBufArr.push(dayBuf)
        dayBufArr.push(dayBuf)



        // const dayLog: logDay = {
        //     date: date,
        //     slots: formData
        // }

        // const logHis = logData;
        // logHis?.logs.push(dayLog);
        console.log("Daybuf:", dayBuf)
        console.log("JSON:", JSON.stringify(dayBuf))
        console.log("Fuul:", JSON.stringify(dayBufArr))
        //     fs.writeFile('logHis.json', JSON.stringify(dayBuf), (err) => {
        //         if (err) {
        //             console.log('Error writing file:', err);
        //         } else {
        //             console.log('Successfully wrote file');
        //         }
        //     });
        router.push('/dashboard')
    }

    interface slotItem {
        id: number,
        hourStart: string,
        minStart: string,
        hourEnd: string,
        minEnd: string,
        activity: string,
        details: string,
    }

    interface logDay {
        date?: Date,
        slots?: slotItem[],
    }




    // const [date1, setDate1] = useState<Date>();
    // const [date2, setDate2] = useState<Date>();
    // const [date3, setDate3] = useState<Date>();

    return (
        <div className="container mx-auto my-6 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start justify-between mb-2 pb-4">
                <h1 className="text-2xl pb-1 font-bold">Daily Log </h1>
                {/* <div className="text-xs text-gray-500">Log your daily activities and time spent.</div> */}
            </div>
            <Tabs defaultValue="new-log" className="w-full">
                <TabsList>
                    <TabsTrigger value="new-log">New Log</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                <TabsContent value="new-log">
                    {/* <div className="flex flex-col items-center justify-center h-[80vh] gap-6">
                    </div> */}
                    <div className="overflow-x-auto px-1 pt-2">
                        <form onSubmit={formSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                                <div className='grid grid-cols-1 gap-4'>
                                    <Label htmlFor="date">Date</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                type="button"
                                                variant={"outline"}
                                                className={cn(
                                                    " w-full md:w-[280px] justify-start text-left font-normal",
                                                    !date && "text-muted-foreground"
                                                )}
                                            >
                                                {/* <Button className="w-full justify-start text-left font-normal" id="date" variant="outline"> */}
                                                <CalendarDaysIcon className="mr-1 h-4 w-4 -translate-x-1" />
                                                {date ? format(date, "PPP") : <span>Select a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent align="start" className="w-auto p-0">
                                            <PopoverClose>
                                                <Calendar initialFocus mode="single" selected={date} onSelect={setDate} />
                                            </PopoverClose>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                            {date &&
                                <div>
                                    {formData?.map((slot, index) => (
                                        // <div>Something</div>
                                        <Collapsible key={index} defaultOpen className="gap-6">
                                            <CollapsibleTrigger className="flex w-full items-center justify-between text-lg font-semibold [&[data-state=open]>svg]:rotate-90">
                                                Slot #{index + 1}: {slot.activity}
                                                <ChevronRightIcon className="ml-auto h-5 w-5 transition-all" />
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <LogField handleSlotFieldChange={handleSlotFieldChange} handleTimeChange={handleTimeChange} index={index} />
                                            </CollapsibleContent>
                                        </Collapsible>
                                    ))}
                                    <div className="flex">
                                        {numSlots > 0 && <Button type="button" className="mr-3 flex items-center justify-center gap-2 bg-destructive hover:bg-destructive text-white hover:text-white" onClick={(e) => { handleDecreaseSlots(e) }} variant="outline">
                                            <RemoveIcon className="h-4 w-4 text-white" />
                                            Delete Slot
                                        </Button>}
                                        <Popover>
                                            <PopoverTrigger>
                                                <Button type="button" className="flex items-center justify-center gap-2" variant="outline">
                                                    <PlusIcon className="h-4 w-4 text-black" />
                                                    Add Slot
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-80 flex flex-wrap">
                                                <PopoverClose onClick={(e) => { handleIncreaseSlots(e, "Content Creation") }} className="m-1 grow h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                                                    Content Creation
                                                </PopoverClose>
                                                <PopoverClose onClick={(e) => { handleIncreaseSlots(e, "Tech") }} className="m-1 grow h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                                                    Tech
                                                </PopoverClose>
                                                <PopoverClose onClick={(e) => { handleIncreaseSlots(e, "Mentoring") }} className="m-1 grow h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                                                    Mentoring
                                                </PopoverClose>
                                                <PopoverClose onClick={(e) => { handleIncreaseSlots(e, "Design/Marketing") }} className="m-1 grow h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                                                    Design/Marketing
                                                </PopoverClose>
                                                <PopoverClose onClick={(e) => { handleIncreaseSlots(e, "Offline Outreach") }} className="m-1 grow h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                                                    Offline Outreach
                                                </PopoverClose>
                                                <PopoverClose onClick={(e) => { handleIncreaseSlots(e, "Other") }} className="m-1 grow h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                                                    Other
                                                </PopoverClose>
                                            </PopoverContent>
                                        </Popover>
                                    </div>

                                    {/* <h1>numSlots: {numSlots}</h1> */}
                                    {/* <LogField handleSlotFieldChange={handleSlotFieldChange} handleTimeChange={handleTimeChange} index={0} /> */}
                                </div>
                            }
                            <div>
                                <Button type='submit' className="my-2">Submit</Button>
                            </div>
                        </form>




                        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="total-time">Total Time Spent</Label>
                            <Input id="total-time" readOnly type="text" />
                        </div>
                    </div> */}
                    </div>
                </TabsContent>
                <TabsContent value="history">
                    <div className="container px-0 py-1">
                        <LogTable columns={columns} data={dataLogx} />
                    </div>
                </TabsContent>
            </Tabs>

        </div>
        // <div className="container mx-auto my-6 px-4 sm:px-6 lg:px-8">
        //     <div className="flex flex-col sm:flex-row items-start justify-between mb-2">
        //         <h1 className="text-2xl pb-6 font-bold">Assigned Mentees</h1>
        //     </div>
        // <div>
        //     <Card className="w-full max-w-2xl border-transparent">
        //         <div className="container mx-auto my-6 px-4 sm:px-6 lg:px-8">
        //             <CardHeader className="p-0 pb-4">
        //                 <CardTitle className="text-2xl pb-1 font-bold">Daily Work Log</CardTitle>
        //                 <CardDescription>Log your daily activities and time spent.</CardDescription>
        //             </CardHeader>
        //             <CardContent className="p-0">
        //                 {/* <form className="grid gap-4"> */}
        //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
        //                     <div>
        //                         <Label htmlFor="date">Date</Label>
        //                         <Popover>
        //                             <PopoverTrigger asChild>
        //                                 <Button
        //                                     variant={"outline"}
        //                                     className={cn(
        //                                         " w-full md:w-[280px] justify-start text-left font-normal",
        //                                         !date1 && "text-muted-foreground"
        //                                     )}
        //                                 >
        //                                     {/* <Button className="w-full justify-start text-left font-normal" id="date" variant="outline"> */}
        //                                     <CalendarDaysIcon className="mr-1 h-4 w-4 -translate-x-1" />
        //                                     {date1 ? format(date1, "PPP") : <span>Select a date</span>}
        //                                 </Button>
        //                             </PopoverTrigger>
        //                             <PopoverContent align="start" className="w-auto p-0">
        //                                 <Calendar initialFocus mode="single" selected={date1} onSelect={setDate1} />
        //                             </PopoverContent>
        //                         </Popover>
        //                     </div>
        //                 </div>
        //                 <div className="grid gap-4">
        //                     {Array.from({ length: numSlots }, (_, index) => (
        //                         <Collapsible className="gap-6">
        //                             <CollapsibleTrigger className="flex w-full items-center justify-between text-lg font-semibold [&[data-state=open]>svg]:rotate-90">
        //                                 Time Period {index + 1}
        //                                 <ChevronRightIcon className="ml-auto h-5 w-5 transition-all" />
        //                             </CollapsibleTrigger>
        //                             <CollapsibleContent>
        //                                 {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4"> */}
        //                                 <div className="flex-wrap flex-col pl-1">
        //                                     <div className=" flex flex-wrap">
        //                                         <div className="py-3 md:px-5">
        //                                             <Label htmlFor="start-time">Start Time</Label>
        //                                             <TimePicker12Demo date={date2} setDate={setDate2} />
        //                                             {/* <Input id="start-time" type="time" /> */}
        //                                         </div>
        //                                         <div className="py-3 md:px-5">
        //                                             <Label htmlFor="end-time">End Time</Label>
        //                                             <TimePicker12Demo date={date3} setDate={setDate3} />
        //                                             {/* <Input id="end-time" type="time" /> */}
        //                                         </div>
        //                                     </div>

        //                                     <div className="col-span-2 py-3">
        //                                         <Label htmlFor="activity">Activity</Label>
        //                                         <Textarea className="min-h-[100px] min-w-max" id="activity" placeholder="Describe your activity" />
        //                                     </div>
        //                                     {/* <div className="md:col-span-4">
        //                                     <Label htmlFor="time-spent">Time Spent</Label>
        //                                     <Input id="time-spent" readOnly type="text" />
        //                                 </div> */}
        //                                 </div>
        //                             </CollapsibleContent>
        //                         </Collapsible>
        //                     ))}
        //                     {numSlots > 1 && <Button className="flex items-center justify-center gap-2 bg-destructive hover:bg-destructive text-white hover:text-white" onClick={() => setNumSlots(numSlots - 1)} variant="outline">
        //                         {/* <PlusIcon className="h-4 w-4" /> */}
        //                         Delete Time Period
        //                     </Button>}
        //                     <Button className="flex items-center justify-center gap-2" onClick={() => setNumSlots(numSlots + 1)} variant="outline">
        //                         <PlusIcon className="h-4 w-4" />
        //                         Add Time Period
        //                     </Button>
        //                     <div className="time-periods grid gap-4" />
        //                 </div>
        //                 {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        //                 <div>
        //                     <Label htmlFor="total-time">Total Time Spent</Label>
        //                     <Input id="total-time" readOnly type="text" />
        //                 </div>
        //             </div> */}
        //                 {/* </form> */}
        //             </CardContent>
        //             <CardFooter className="p-0">
        //                 <Button type="submit">Submit</Button>
        //             </CardFooter>
        //         </div>
        //         {/* <Card className="container mx-auto my-6 px-4 sm:px-6 lg:px-8"> */}

        //     </Card>
        // </div>

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


// function PlusIcon(props: { className: string }) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <path d="M5 12h14" />
//             <path d="M12 5v14" />
//         </svg>
//     )
// }

const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill={"none"} {...props}>
        <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const RemoveIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill={"none"} {...props}>
        <path d="M20 12L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);


