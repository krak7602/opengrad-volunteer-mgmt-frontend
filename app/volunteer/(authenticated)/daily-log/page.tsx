"use client"
import { useSession } from "next-auth/react"
import { SessionProvider } from "next-auth/react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import DataTable from "@/components/volunteer/DataTable"
import DailyLog from "@/components/volunteer/DailyLog"


export default function Page({
    params,
    searchParams,
}: {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const { data } = useSession();
    return (
        <div>
            <DailyLog />
        </div>

    )
}
