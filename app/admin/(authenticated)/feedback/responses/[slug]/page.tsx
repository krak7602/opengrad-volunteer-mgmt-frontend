"use client"
import React, { useEffect, useState } from "react"
import { useListState } from "@mantine/hooks"
import { Button } from "@/components/ui/button"
import { useFetch } from "@mantine/hooks"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

export default function Page({
    params,
    searchParams,
}: {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const [responseCount, setResponseCount] = useState(0)
    const [currentResponseId, setCurrentResponseId] = useState(0)
    interface responseItem {
        id: number,
        feedbackitem_id: number,
        item_type: string,
        option_ans: string,
        descr_ans: string,
        question: string
    }
    interface userResponse {
        id: number,
        form_id: number,
        vol_id: number,
        feedbackitemResponses: responseItem[]
    }
    const title = searchParams["title"]
    const { data, loading, error, refetch, abort } = useFetch<userResponse[]>(
        `http://localhost:5001/forms/getresponse/${params.slug}`
    );
    useEffect(() => {
        if (data) {
            setResponseCount(data?.length);
            console.log(data)
        }
    }, [data]);

    const incrementResponseId = () => {
        if (currentResponseId <= responseCount - 1) {
            setCurrentResponseId(currentResponseId + 1);
        }

    }

    const decrementResponseId = () => {
        if (currentResponseId > 0) {
            setCurrentResponseId(currentResponseId - 1);
        }

    }

    const cohortList= [
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

    return (
        <div className="container mx-auto my-6 px-2 lg:px-8">
            <div className="flex flex-col lg:flex-row items-start justify-between mb-2 pt-4 pb-2 rounded bg-primary text-white px-4">
                <div className="">
                    <h1 className="text-xl font-bold">{title}</h1>
                    {data && <div className=" text-sm">
                        {data[currentResponseId].vol_id}
                    </div>}
                    {/* <div className=" text-sm">Name</div> */}
                </div>
                {/* <div className="flex gap-1 w-full flex-row justify-end"> */}
                <div className=" self-end flex items-center justify-end space-x-2 py-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={decrementResponseId}
                        disabled={currentResponseId === 0}
                    >
                        <ArrowLeftIcon />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={incrementResponseId}
                        disabled={currentResponseId === responseCount - 1}
                    >
                        <ArrowRightIcon />
                    </Button>
                </div>


                {/* <TabsContent value="students" className=" text-black m-0" >
                        <AddStudent />
                    </TabsContent>
                    <TabsList>
                        <TabsTrigger value="students">
                            <UserMultipleIcon />
                        </TabsTrigger>
                        <TabsTrigger value="volunteers">
                            <AcademicCapIcon />
                        </TabsTrigger>
                    </TabsList> */}
                {/* </div> */}
                {/* <h1 className="rounded-sm text-xs bg-primary text-white p-1 font-bold pl-1 md:mr-5"></h1> */}
            </div>
            <div className="overflow-x-auto">
                {data && <div>
                    {data[currentResponseId].feedbackitemResponses.map((value, index) => {
                        return (
                            <div key={index} className=" px-2">
                                <div className=" font-semibold">{index + 1}. {value.question}</div>
                                {value.item_type === "descriptive" && <div>
                                    <div>{value.descr_ans}</div>
                                </div>}
                                {value.item_type === "multiplechoice" && <div>
                                    <div>{value.option_ans}</div>
                                </div>}
                                {index != data[currentResponseId].feedbackitemResponses.length - 1 && <div className=" py-1">
                                    <Separator />
                                </div>}
                            </div>

                        )
                    })}
                </div>}

            </div>
        </div>

    )
}


const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"} {...props}>
        <path d="M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"} {...props}>
        <path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);