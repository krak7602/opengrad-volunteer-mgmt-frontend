"use client"
import React, { FormEvent, useState } from 'react';
import { useListState } from '@mantine/hooks';
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
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
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Separator } from "@/components/ui/separator"

import { Check, ChevronsUpDown, Divide } from "lucide-react"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"


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
import Question from '@/components/admin/Question';
import axios from "axios"
import { useFetch } from "@mantine/hooks"
import { useSession } from 'next-auth/react'

export default function FeedbackForm() {
    interface FeedbackItem {
        type: string,
        question: string,
        option_count: number,
        options: string[]
    }

    interface Feedback {
        title: string,
        recipientType: string,
        recipientCount: number,
        recipientList: partner[] | cohort[],
        feedbackItemCount: number,
        feedbackItems: FeedbackItem[],
    }
    const session = useSession();
    interface cohortColumn {
        id: number,
        name: string,
        startDate: string,
        endDate: string,
    }
    const cohortData = useFetch<cohortColumn[]>(
        'http://localhost:5001/cohort/all', {
        headers: {
            authorization: `bearer ${session.data?.user.auth_token}`
        }
    }
    );
    interface poc {
        id: number,
        user_id: user_id,
    }

    interface user_id {
        id: number,
        name: string,
        email: string,
        role: string
    }
    const partnerData = useFetch<poc[]>(
        `http://localhost:5001/user/get/poc`, {
        headers: {
            authorization: `bearer ${session.data?.user.auth_token}`
        }
    }
    );

    const router = useRouter()
    const [questionCount, setQuestionCount] = useState(0);
    const [cohortAdd, setCohortAdd] = useState(false);
    const [partnerAdd, setPartnerAdd] = useState(true);
    const [feedbackTitle, setFeedbackTitle] = useState("")
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [recipientCohortCount, setRecipientCohortCount] = useState(0)
    const [recipientPartnerCount, setRecipientPartnerCount] = useState(0)
    const [recipientCohorts, setRecipientCohorts] = useListState<cohortColumn>([])
    const [recipientPartners, setRecipientPartners] = useListState<poc>([])
    const [questions, setQuestions] = useListState<FeedbackItem>([])


    let qst: FeedbackItem = {
        type: "mcq",
        question: "",
        option_count: 0,
        options: []
    }

    interface cohort {
        id: number,
        name: string,
    }

    interface partner {
        id: number,
        name: string,
    }



    const toggleClick = (option: string) => {
        if (option === 'cohorts') {
            setCohortAdd(!cohortAdd);
            setPartnerAdd(false);
            // const handleCohorts: cohort[] = []
            // setRecipientCohorts(handleCohorts)
            // setRecipientCohortCount(0)
            // const handlePartners: partner[] = []
            // setRecipientPartners(handlePartners)
            // setRecipientPartnerCount(0)
            setRecipientCohorts.setState([])
            setRecipientCohortCount(0)
            setRecipientPartners.setState([])
            setRecipientPartnerCount(0)
        } else if (option === 'partners') {
            setCohortAdd(false);
            setPartnerAdd(!partnerAdd);
            // const handleCohorts: cohort[] = []
            // setRecipientCohorts(handleCohorts)
            // setRecipientCohortCount(0)
            // const handlePartners: partner[] = []
            // setRecipientPartners(handlePartners)
            // setRecipientPartnerCount(0)
            setRecipientCohorts.setState([])
            setRecipientCohortCount(0)
            setRecipientPartners.setState([])
            setRecipientPartnerCount(0)
        }
    }

    // const AddPartner = (selectedPartner: string) => {
    //     let found = false
    //     recipientPartners?.forEach(element => {
    //         if (element.name === selectedPartner) found = true;
    //     })
    //     if (!found) {
    //         partnerList.forEach(element => {
    //             if (element.name === selectedPartner) {
    //                 if (recipientPartnerCount === 0) {
    //                     const handlePartners: partner[] = [element]
    //                     setRecipientPartners(handlePartners)
    //                     setRecipientPartnerCount(recipientPartnerCount + 1)
    //                 } else {
    //                     const handlePartners = recipientPartners
    //                     handlePartners?.push(element)
    //                     setRecipientPartners(handlePartners)
    //                     setRecipientPartnerCount(recipientPartnerCount + 1)
    //                 }
    //             }
    //         });
    //     }
    // }
    const AddPartner = (selectedPartner: poc) => {
        let found = false
        recipientPartners?.forEach(element => {
            if (element.user_id.name === selectedPartner.user_id.name) found = true;
        })
        if (!found && partnerData.data) {
            partnerData.data.forEach(element => {
                if (element.user_id.name === selectedPartner.user_id.name) {
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

    // const AddCohort = (selectedCohort: string) => {
    //     let found = false
    //     recipientCohorts?.forEach(element => {
    //         if (element.name === selectedCohort) found = true;
    //     })
    //     if (!found) {
    //         cohortList.forEach(element => {
    //             if (element.name === selectedCohort) {
    //                 if (recipientCohortCount === 0) {
    //                     const handleCohorts: cohort[] = [element]
    //                     setRecipientCohorts(handleCohorts)
    //                     setRecipientCohortCount(recipientCohortCount + 1)
    //                 } else {
    //                     const handleCohorts = recipientCohorts
    //                     handleCohorts?.push(element)
    //                     setRecipientCohorts(handleCohorts)
    //                     setRecipientCohortCount(recipientCohortCount + 1)
    //                 }
    //             }
    //         });
    //     }
    // }
    const AddCohort = (selectedCohort: cohortColumn) => {
        let found = false
        recipientCohorts?.forEach(element => {
            if (element.name === selectedCohort.name) found = true;
        })
        if (!found && cohortData.data) {
            cohortData.data.forEach(element => {
                if (element.name === selectedCohort.name) {
                    // if (recipientCohortCount === 0) {
                    //     const handleCohorts: cohort[] = [element]
                    //     setRecipientCohorts(handleCohorts)
                    //     setRecipientCohortCount(recipientCohortCount + 1)
                    // } else {
                    //     const handleCohorts = recipientCohorts
                    //     handleCohorts?.push(element)
                    //     setRecipientCohorts(handleCohorts)
                    //     setRecipientCohortCount(recipientCohortCount + 1)
                    // }
                    setRecipientCohorts.append(element)
                    setRecipientCohortCount(recipientCohortCount + 1)
                }
            });
        }
    }

    const RemovePartner = (id: number) => {
        // const handlePartners = recipientPartners
        // handlePartners?.splice(id, 1)
        // setRecipientPartners(handlePartners)
        // setRecipientPartnerCount(recipientPartnerCount - 1)
        setRecipientPartners.remove(id)
        setRecipientPartnerCount(recipientPartnerCount - 1)
    }

    const RemoveCohort = (id: number) => {
        // const handleCohorts = recipientCohorts
        // handleCohorts?.splice(id, 1)
        // setRecipientCohorts(handleCohorts)
        // setRecipientCohortCount(recipientCohortCount - 1)
        setRecipientCohorts.remove(id)
        setRecipientCohortCount(recipientCohortCount - 1)
    }

    const handleIncreaseQuestions = (type: string) => {
        // const handleQuestions = questions
        // handleQuestions.push(
        //     {
        //         type: type,
        //         question: "",
        //         option_count: 0,
        //         options: []
        //     })
        // setQuestions(handleQuestions)
        // setQuestionCount(questionCount + 1)
        setQuestions.append({
            type: type,
            question: "",
            option_count: 0,
            options: []
        })
        setQuestionCount(questionCount + 1)
    }

    const RemoveQuestion = (id: number) => {
        // const handleQuestions = questions
        // handleQuestions.splice(id, 1)
        // setQuestions(handleQuestions)
        // setQuestionCount(questionCount - 1)
        setQuestions.remove(id)
        setQuestionCount(questionCount - 1)
    }

    const addOption = (questionId: number) => {
        // const handleQuestions = questions
        // if (handleQuestions[questionId].option_count < 4) {
        //     handleQuestions[questionId].option_count += 1;
        //     setQuestions(handleQuestions)
        // }

        if (questions[questionId].option_count < 4) {
            const opt: string[] = questions[questionId].options
            opt.push("")
            setQuestions.setItem(questionId, {
                type: questions[questionId].type,
                question: questions[questionId].question,
                option_count: questions[questionId].option_count + 1,
                options: opt
            })
        }
    }

    const removeOption = (questionId: number, optId: number) => {
        const opt: string[] = questions[questionId].options
        opt.splice(optId, 1)
        setQuestions.setItem(questionId, {
            type: questions[questionId].type,
            question: questions[questionId].question,
            option_count: questions[questionId].option_count - 1,
            options: opt
        })

    }

    // const handleAddOption = (index: number) => {
    //     const handleQuestions = questions
    //     qst.option_count += 1
    //     qst.options.push("")
    //     // if (handleQuestions[index].option_count < 4) {
    //     //     handleQuestions[index].options.push("")
    //     //     setQuestions(handleQuestions)
    //     // }
    // }

    const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
        // const handleQuestions = questions
        // // handleQuestions[index].question = e.target.value
        // qst.question = e.target.value
        // setQuestions(handleQuestions)
        setQuestions.setItem(index, {
            type: questions[index].type,
            question: e.target.value,
            option_count: questions[index].option_count,
            options: questions[index].options
        })
    }

    const handleOptionsChange = (e: React.ChangeEvent<HTMLTextAreaElement>, qnIndex: number, optIndex: number) => {
        //     const handleQuestions = questions
        //     // handleQuestions[qnIndex].options[optIndex] = e.target.value
        //     qst.options[optIndex] = e.target.value
        //     setQuestions(handleQuestions)
        const opt: string[] = questions[qnIndex].options
        opt[optIndex] = e.target.value
        setQuestions.setItem(qnIndex, {
            type: questions[qnIndex].type,
            question: questions[qnIndex].question,
            option_count: questions[qnIndex].option_count,
            options: opt
        })
    }

    // const [formData, setFormData] = useState<FeedbackItem[]>();
    const formSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (recipientPartnerCount != 0) {
            try {
                if (questionCount != 0) {
                    const parts = recipientPartners.map(x => x.id)
                    const resp = await axios.post(
                        `http://localhost:5001/forms/create`,
                        {
                            "receipientType": "poc",
                            "receipientId": parts,
                            "feedbackItemCount": recipientPartnerCount,
                            "feedbackItems": questions,
                        }, {
                        headers: {
                            Authorization: `bearer ${session.data?.user.auth_token}`
                        }
                    }
                        // { withCredentials: true }
                    );
                    if (resp.data.id) {
                        const resp2 = await axios.post(
                            `http://localhost:5001/notification/poc/create`,
                            {
                                "typeofnotification": "form",
                                "Message": feedbackTitle,
                                "form_id": resp.data.id,
                                "receipient_id": parts
                            }, {
                            headers: {
                                Authorization: `bearer ${session.data?.user.auth_token}`
                            }
                        }
                            // { withCredentials: true }
                        );
                    }


                    console.log("The error is this:", resp.data)
                }
                // console.log("This is the data:",resp.data)
            } catch (e) {
                console.log(e)
            }

            // const feedback: Feedback = {
            //     title: feedbackTitle,
            //     recipientType: "partner",
            //     recipientCount: recipientPartnerCount,
            //     recipientList: recipientPartners,
            //     feedbackItemCount: questionCount,
            //     feedbackItems: questions,
            // }
            // console.log(feedback)
        } else if (recipientCohortCount != 0) {
            try {
                if (questionCount != 0) {
                    const cohs = recipientCohorts.map(x => x.id)
                    const resp = await axios.post(
                        `http://localhost:5001/forms/create`,
                        {
                            "receipientType": "cohort",
                            "receipientId": cohs,
                            "feedbackItemCount": recipientCohortCount,
                            "feedbackItems": questions,
                        }, {
                        headers: {
                            Authorization: `bearer ${session.data?.user.auth_token}`
                        }
                    }
                        // { withCredentials: true }
                    );
                    if (resp.data.id) {
                        const resp2 = await axios.post(
                            `http://localhost:5001/notification/cohort/create`,
                            {
                                "typeofnotification": "form",
                                "Message": feedbackTitle,
                                "form_id": resp.data.id,
                                "receipient_id": cohs
                            }, {
                            headers: {
                                Authorization: `bearer ${session.data?.user.auth_token}`
                            }
                        }
                            // { withCredentials: true }
                        )
                    }



                    console.log("The error is this:", resp.data)
                }
                // console.log("This is the data:",resp.data)
            } catch (e) {
                console.log(e)
            }
            // const feedback: Feedback = {
            //     title: feedbackTitle,
            //     recipientType: "cohort",
            //     recipientCount: recipientCohortCount,
            //     recipientList: recipientCohorts,
            //     feedbackItemCount: questionCount,
            //     feedbackItems: questions,
            // }
            // console.log(feedback)
        }
        router.push('/dashboard')

        // // console.log(demoSlot)
        // console.log(formData?.map((slot, index) => (slot)))

        // toast({
        //     description: "Your form has been submitted successfully"
        // })

        // const dayBuf: logDay = {
        //     date: date,
        //     slots: formData
        // }

        // const dayBufArr: logDay[] = [];
        // dayBufArr.push(dayBuf)
        // dayBufArr.push(dayBuf)



        // // const dayLog: logDay = {
        // //     date: date,
        // //     slots: formData
        // // }

        // // const logHis = logData;
        // // logHis?.logs.push(dayLog);
        // console.log("Daybuf:", dayBuf)
        // console.log("JSON:", JSON.stringify(dayBuf))
        // console.log("Fuul:", JSON.stringify(dayBufArr))
        // //     fs.writeFile('logHis.json', JSON.stringify(dayBuf), (err) => {
        // //         if (err) {
        // //             console.log('Error writing file:', err);
        // //         } else {
        // //             console.log('Successfully wrote file');
        // //         }
        // //     });
        // router.push('/dashboard')
    }


    const frameworks = [
        {
            value: "next.js",
            label: "Next.js",
        },
        {
            value: "sveltekit",
            label: "SvelteKit",
        },
        {
            value: "nuxt.js",
            label: "Nuxt.js",
        },
        {
            value: "remix",
            label: "Remix",
        },
        {
            value: "astro",
            label: "Astro",
        },
    ]

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

    const cohortList: cohort[] = [
        {
            id: 112,
            name: "JEE Advanced 2020",
        },
        {
            id: 113,
            name: "NEET 2024",
        },
        {
            id: 114,
            name: "GMAT 2023",
        },
    ]

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
            <form onSubmit={formSubmit} className="flex flex-col gap-2">
                <Textarea onChange={(e) => setFeedbackTitle(e.target.value)} placeholder="Form Title" className=' text-wrap focus-visible:ring-transparent border-none underline-offset-2 underline decoration-primary decoration-4 font-bold text-2xl ' />
                <div className="flex w-full flex-col items-start rounded-md border px-3 py-3">
                    <div className="flex w-full flex-row px-1 py-1 items-center justify-between">
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="lg:w-fit w-full font-light py-3 rounded-lg px-3  mb-2 flex justify-center items-center mr-2">
                                    <PlusIcon className="h-4 w-4" />
                                    <div className="hidden md:block mx-2">
                                        Add Recipient
                                    </div>
                                </Button>
                                {/* <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-[200px] justify-between mb-2"s
                                >
                                    Add Recipient...
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button> */}
                            </PopoverTrigger>
                            {partnerAdd && <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandInput placeholder="Add Recipient" />
                                    <CommandList>
                                        <CommandEmpty>No recipient found.</CommandEmpty>
                                        <CommandGroup>
                                            {partnerData.data && partnerData.data.constructor === Array && <div>
                                                {partnerData.data.map((partner) => (
                                                    <CommandItem
                                                        key={partner.id}
                                                        value={partner.user_id.name}
                                                        onSelect={(currentValue) => {
                                                            AddPartner(partner)
                                                            setValue(currentValue === value ? "" : currentValue)
                                                            setOpen(false)
                                                        }}
                                                    >
                                                        {/* <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            value === partner.name ? "opacity-100" : "opacity-0"
                                                        )}
                                                    /> */}
                                                        {partner.user_id.name}
                                                    </CommandItem>
                                                ))}
                                            </div>}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>}
                            {cohortAdd && <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandInput placeholder="Add Recipient" />
                                    <CommandList>
                                        <CommandEmpty>No recipient found.</CommandEmpty>
                                        <CommandGroup>
                                            {cohortData.data && cohortData.data.constructor === Array && <div>
                                                {cohortData.data.map((cohort) => (
                                                    <CommandItem
                                                        key={cohort.id}
                                                        value={cohort.name}
                                                        onSelect={(currentValue) => {
                                                            AddCohort(cohort)
                                                            setValue(currentValue === value ? "" : currentValue)
                                                            setOpen(false)
                                                        }}
                                                    >
                                                        {/* <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            value === cohort.name ? "opacity-100" : "opacity-0"
                                                        )}
                                                    /> */}
                                                        {cohort.name}
                                                    </CommandItem>
                                                ))}
                                            </div>}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>}

                            {/* <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandInput placeholder="Add Recipient" />
                                    <CommandList>
                                        <CommandEmpty>No recipient found.</CommandEmpty>
                                        <CommandGroup>
                                            {frameworks.map((framework) => (
                                                <CommandItem
                                                    key={framework.value}
                                                    value={framework.value}
                                                    onSelect={(currentValue) => {
                                                        setValue(currentValue === value ? "" : currentValue)
                                                        setOpen(false)
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            value === framework.value ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    {framework.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent> */}

                        </Popover>
                        {/* <Button className="lg:w-fit w-full bg-slate-700  hover:bg-slate-800 font-light text-white py-3 rounded-lg px-3  mb-2 flex justify-center items-center mr-2">
                            <PlusIcon className="h-4 w-4 text-white" />
                            <div className="hidden md:block  text-white mx-2">Add Recipient</div>
                        </Button> */}
                        <ToggleGroup type="single" defaultValue='partners' className=" ml-1 gap-0 mb-2 rounded bg-slate-200">
                            <ToggleGroupItem className=" px-2 font-light rounded-l-sm rounded-r-none data-[state=on]:bg-primary data-[state=on]:text-white" onClick={() => toggleClick("partners")} value="partners">
                                <div className=' text-xs'>Partners</div>
                            </ToggleGroupItem>
                            {/* <div className=' font-extralight text-gray-600 text-2xl'>/</div> */}
                            <ToggleGroupItem className=" px-2  font-light rounded-l-none rounded-r-sm data-[state=on]:bg-primary data-[state=on]:text-white" onClick={() => toggleClick("cohorts")} value="cohorts">
                                <div className=' text-xs'>Cohorts</div>
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                    <Separator />
                    <div className=' px-1 pt-2'>
                        <div className="flex flex-wrap gap-2">
                            {recipientCohorts?.map((value, index) => (
                                <div key={index} className="bg-gray-500 text-white rounded-sm text-xs font-semibold px-1 flex flex-row items-center">
                                    <div>{value.name}</div>
                                    <CancelIcon onClick={() => RemoveCohort(index)} className=" w-3 h-3 ml-1 text-white" />
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {recipientPartners?.map((value, index) => (
                                <div key={index} className=" bg-gray-500 text-white rounded-sm text-xs font-semibold px-1 flex flex-row items-center">
                                    <div>{value.user_id.name}</div>
                                    <CancelIcon onClick={() => RemovePartner(index)} className=" w-3 h-3 ml-1 text-white" />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {questions?.map((value, index) => (
                    <div key={index}>
                        <div className="rounded-sm bg-gray-100 border p-2">
                            <div className=" flex flex-col">
                                {/* <div>{index+1}.</div> */}
                                <div className="flex flex-row justify-between items-center pb-1">
                                    <div className=' font-light text-xs px-1'>{index + 1}</div>
                                    {value.type === "descriptive" && <div className=' font-light text-xs'>
                                        Descriptive
                                    </div>}
                                    {value.type === "multiplechoice" && <div className=' font-light text-xs'>
                                        Multiple Choice
                                    </div>}
                                    {/* <div className=' font-light text-xs'>Descriptive</div> */}
                                    <CancelIconLight className='font-light text-xs h-3' onClick={() => RemoveQuestion(index)} />
                                </div>

                                <Textarea className="min-h-[100px] min-w-max" placeholder="Question" onChange={(e) => { handleDescChange(e, index) }} />


                                {value.type === "multiplechoice" && <div className="flex flex-col gap-2 pt-2">
                                    {value.options.map((opt, idx) => (
                                        <div key={idx} className=" flex flex-row gap-0">
                                            <div className='rounded-l-md bg-green-600 text-white pr-1 flex flex-col justify-between items-center'>
                                                <div className="p-1 ">{(String.fromCharCode('A'.charCodeAt(0) + idx))}</div>
                                                <CancelIcon className="font-light text-green-200 text-xs h-9 py-3" onClick={() => removeOption(index, idx)} />
                                            </div>
                                            <Textarea className="min-h-1 min-w-max rounded-l-none rounded-r-md border-green-600 border-2 m-0 focus-visible:ring-transparent" placeholder="Option description" onChange={(e) => { handleOptionsChange(e, index, idx) }} />
                                        </div>
                                    ))}
                                    <Button onClick={() => addOption(index)} type="button" className=" mt-2 flex items-center justify-center gap-2" variant="outline">
                                        <PlusIcon className="h-4 w-4 text-black" />
                                        Add Option
                                    </Button>
                                </div>}

                            </div>
                        </div>
                    </div>))}

                <div className="flex flex-col md:flex-row gap-2">
                    <Popover>
                        <PopoverTrigger type='button' className="px-4 py-1 flex items-center justify-center gap-2 border rounded-sm w-full lg:w-fit">
                            {/* <Button className=" mt-2 flex items-center justify-center gap-2 border rounded-sm"> */}
                            <PlusIcon className="h-4 w-4 text-black" />
                            Add Question
                            {/* </Button> */}
                        </PopoverTrigger>
                        <PopoverContent className="w-80 flex flex-wrap">
                            <PopoverClose onClick={() => { handleIncreaseQuestions("descriptive") }} className="m-1 grow h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                                Descriptive
                            </PopoverClose>
                            <PopoverClose onClick={() => { handleIncreaseQuestions("multiplechoice") }} className="m-1 grow h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                                Multiple Choice
                            </PopoverClose>
                        </PopoverContent>
                    </Popover>
                    {/*DIv location */}
                    <div>
                        <Button type='submit' className=" w-full lg:w-fit">Submit</Button>
                    </div>
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

const CancelIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"} {...props}>
        <path d="M19.0005 4.99988L5.00045 18.9999M5.00045 4.99988L19.0005 18.9999" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const CancelIconLight = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"} {...props}>
        <path d="M19.0005 4.99988L5.00045 18.9999M5.00045 4.99988L19.0005 18.9999" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);



const CancelCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"} {...props}>
        <path d="M15.7494 15L9.75 9M9.75064 15L15.75 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M22.75 12C22.75 6.47715 18.2728 2 12.75 2C7.22715 2 2.75 6.47715 2.75 12C2.75 17.5228 7.22715 22 12.75 22C18.2728 22 22.75 17.5228 22.75 12Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>);