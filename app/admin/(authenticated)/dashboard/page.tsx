"use client"
import React, { useState } from "react"
import {useListState} from "@mantine/hooks"
import { Button } from "@/components/ui/button"
export default function Page({
    params,
    searchParams,
}: {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    type th = {
        thing: string
    }
    // const [things, setThings] = useState<th[]>([{ thing: "thisone" }])
    const [things, setThings] = useListState(["this"])
    const putThings = () => {
        setThings.append("another")
        console.log(things)
    }
    return (
        <div>
            <h1>Admin Dashboard page</h1>
            <Button type='button' onClick={() => putThings()}> THhis</Button>
            {things?.map((thing, idx) => (
                <div key={idx}>{thing}</div>
            ))}
        </div>

    )
}
