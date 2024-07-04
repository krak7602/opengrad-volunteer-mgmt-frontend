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
import FeedbackForm from "@/components/partner/FeedbackForm"


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
            <FeedbackForm />
        </div>

    )
}
