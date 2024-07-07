"use client"
import { useSession } from "next-auth/react"
import DailyLog from "@/components/volunteer/DailyLog"


export default function Page({
    params,
    searchParams,
}: {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    return (
        <div>
            <DailyLog />
        </div>

    )
}
