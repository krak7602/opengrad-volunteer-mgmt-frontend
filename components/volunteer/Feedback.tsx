"use client"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useFetch, useListState } from "@mantine/hooks"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import axios from "axios";

export default function Feedback({ feedbackId, title }: { feedbackId: string, title: string }) {
    const router = useRouter()
    // interface responseItem {
    //     id: number,
    //     feedbackitem_id: number,
    //     item_type: string,
    //     option_ans: string,
    //     descr_ans: string,
    //     question: string
    // }
    // interface userResponse {
    //     id: number,
    //     form_id: number,
    //     vol_id: number,
    //     feedbackitemResponses: responseItem[]
    // }


    const { data, loading, error, refetch, abort } = useFetch<Feedback>(
        `http://localhost:5001/forms/get/${feedbackId}`
    );
    interface FeedbackItem {
        id: number,
        type: string,
        question: string,
        option_count: number,
        options: string[]
    }

    // interface Feedback {
    //     title: string,
    //     recipientType: string,
    //     recipientCount: number,
    //     recipientList: partner[] | cohort[],
    //     feedbackItemCount: number,
    //     feedbackItems: FeedbackItem[],
    // }
    interface Feedback {
        id: number,
        recipientType: string,
        recipientId: number[],
        feedbackIitemCount: number,
        feedbackItems: FeedbackItem[],
    }

    // interface cohort {
    //     id: number,
    //     name: string,
    // }

    // interface partner {
    //     id: number,
    //     name: string,
    // }

    // interface responseItem {
    //     type: string,
    //     desc: string,
    //     option: number,
    // }

    interface responseItem {
        feedbackitem_id: number,
        item_type: string,
        option_ans: string,
        descr_ans: string,
        question: string,
    }

    // interface response {
    //     feedbackId: number,
    //     responderId: number,
    //     responses: responseItem[]
    // }
    interface response {
        form_id: number,
        vol_id: number,
        feedbackitemResponses: responseItem[],
    }

    // const qnFeed: Feedback = {
    //     title: "This is the very long title that is used for this form",
    //     recipientType: "cohort",
    //     recipientCount: 2,
    //     recipientList: [{ id: 20204, name: "JEE Advanced 2020" }, { id: 2022, name: "NEET 2023" }],
    //     feedbackItemCount: 2,
    //     feedbackItems: [
    //         {
    //             type: "desc",
    //             question: "Describe something",
    //             option_count: 0,
    //             options: []
    //         },
    //         {
    //             type: "mcq",
    //             question: "What's your opinion on something",
    //             option_count: 2,
    //             options: ["This is option 1", "This is option 2"]
    //         }
    //     ]
    // }

    const [respItems, setRespItems] = useListState<responseItem>()

    let resps: responseItem[] = []
    // qnFeed.feedbackItems.forEach(element => {
    //     resps.push({
    //         type: element.type,
    //         desc: "",
    //         option: 0
    //     })
    // });
    useEffect(() => {
        if (data) {
            // (data?.length);
            data.feedbackItems.forEach(element => {
                setRespItems.append({
                    feedbackitem_id: element.id,
                    item_type: element.type,
                    option_ans: "",
                    descr_ans: "",
                    question: element.question,

                })
                // resps.push({
                //     type: element.type,
                //     desc: "",
                //     option: 0
                // })
            });

            console.log(data)
        }
    }, [data]);

    const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
        setRespItems.setItem(index, {
            feedbackitem_id: respItems[index].feedbackitem_id,
            item_type: respItems[index].item_type,
            option_ans: respItems[index].option_ans,
            descr_ans: e.target.value,
            question: respItems[index].question,
        })
    }

    const handleOptChange = (ans: string, index: number) => {
        setRespItems.setItem(index, {
            feedbackitem_id: respItems[index].feedbackitem_id,
            item_type: respItems[index].item_type,
            option_ans: ans,
            descr_ans: respItems[index].descr_ans,
            question: respItems[index].question,
        })
    }

    const formSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (data) {
                const resp = await axios.post(
                    `http://localhost:5001/forms/response`,
                    {
                        "form_id": data?.id,
                        "vol_id": 4,
                        "feedbackitemResponses": respItems,
                    }
                    // { withCredentials: true }
                );
                // console.log("This is the data:",resp.data)
                console.log("the data:", resp.data)
            }

        } catch (e) {
            console.log(e)
        }
        router.push('/inbox')
    }


    return (
        <div>
            <div className="container mx-auto my-6 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-start justify-between pb-4">
                    <div className=" underline decoration-4 decoration-primary text-2xl font-bold">{title}</div>
                    {/* <div className="text-xs text-gray-500">Log your daily activities and time spent.</div> */}
                </div>
                <div className="overflow-x-auto px-1 pt-2">
                    <form onSubmit={formSubmit}>
                        <div className=" flex flex-col gap-4">
                            {data?.feedbackItems.map((value, index) => {
                                return (
                                    <div key={index} className="flex flex-col p-2 bg-gray-100 rounded ring-1 ring-gray-200">
                                        <div className=" font-medium text-md text-pretty py-2 text-sm">{index + 1}. {value.question}</div>
                                        {value.type === "descriptive" && <div>
                                            {/* <Textarea className="min-h-[100px] min-w-max" placeholder="Question" onChange={(e) => { handleDescChange(e, index) }} /> */}
                                            <Textarea className="min-h-[100px] min-w-max text-sm" onChange={(e) => { handleDescChange(e, index) }} />
                                        </div>}
                                        {value.type === "multiplechoice" && <div>
                                            <RadioGroup onValueChange={e => {handleOptChange(e, index)}}>
                                                {value.options.map((opt, idx) => (
                                                    <div key={idx} className="flex items-center space-x-2">
                                                        <RadioGroupItem value={opt} id={opt} />
                                                        <Label className=' font-normal' htmlFor={opt}>{opt}</Label>
                                                    </div>
                                                ))}
                                            </RadioGroup>

                                        </div>}
                                    </div>
                                )
                            })}
                            <Button type='submit' className=" w-full lg:w-fit">Submit</Button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}