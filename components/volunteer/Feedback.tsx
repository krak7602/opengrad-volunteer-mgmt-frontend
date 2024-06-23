"use client"
import { useRouter } from 'next/navigation'
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


export default function Feedback({ feedbackId }: { feedbackId: string }) {
    const router = useRouter()
    interface FeedbackItem {
        type: string,
        question: string,
        option_count: number,
        options: string[]
    }

    interface Feedback {
        recipientType: string,
        recipientCount: number,
        recipientList: partner[] | cohort[],
        feedbackItemCount: number,
        feedbackItems: FeedbackItem[],
    }

    interface cohort {
        id: number,
        name: string,
    }

    interface partner {
        id: number,
        name: string,
    }

    interface responseItem {
        type: string,
        desc: string,
        option: number,
    }

    interface response {
        feedbackId: number,
        responderId: number,
        responses: responseItem[]
    }

    const qnFeed: Feedback = {
        recipientType: "cohort",
        recipientCount: 2,
        recipientList: [{ id: 20204, name: "JEE Advanced 2020" }, { id: 2022, name: "NEET 2023" }],
        feedbackItemCount: 2,
        feedbackItems: [
            {
                type: "desc",
                question: "Describe something",
                option_count: 0,
                options: []
            },
            {
                type: "mcq",
                question: "What's your opinion on something",
                option_count: 2,
                options: ["This is option 1", "This is option 2"]
            }
        ]
    }

    let resps: responseItem[] = []
    qnFeed.feedbackItems.forEach(element => {
        resps.push({
            type: element.type,
            desc: "",
            option: 0
        })
    });

    const formSubmit = (e: React.FormEvent) => {
        router.push('/inbox')
    }


    return (
        <div>
            <div className="container mx-auto my-6 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-start justify-between pb-4">
                    <h1 className="text-2xl font-bold">Feedback</h1>
                    {/* <div className="text-xs text-gray-500">Log your daily activities and time spent.</div> */}
                </div>
                <div className="overflow-x-auto px-1 pt-2">
                    <form onSubmit={formSubmit}>
                        <div className=" flex flex-col gap-4">
                            {qnFeed.feedbackItems.map((value, index) => {
                                return (
                                    <div key={index} className="flex flex-col p-2 bg-gray-100 rounded ring-1 ring-gray-200">
                                        <div className=" font-medium text-md text-pretty py-2 text-sm">{index + 1}. {value.question}</div>
                                        {value.type === "desc" && <div>
                                            {/* <Textarea className="min-h-[100px] min-w-max" placeholder="Question" onChange={(e) => { handleDescChange(e, index) }} /> */}
                                            <Textarea className="min-h-[100px] min-w-max text-sm" />
                                        </div>}
                                        {value.type === "mcq" && <div>
                                            <RadioGroup>
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