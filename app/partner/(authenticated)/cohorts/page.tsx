"use client"
import React, { useState } from "react"
import {useListState} from "@mantine/hooks"
import { Button } from "@/components/ui/button"
import CohortListing from "@/components/partner/CohortListing"
export default function Page({
    params,
    searchParams,
}: {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    // type th = {
    //     thing: string
    // }
    // const [things, setThings] = useState<th[]>([{ thing: "thisone" }])
    // const [things, setThings] = useListState(["this"])
    // const putThings = () => {
    //     setThings.append("another")
    //     console.log(things)
    // }
    return (
        <div>
            <CohortListing />
        </div>

    )
}
