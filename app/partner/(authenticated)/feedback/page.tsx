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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


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
            <Tabs defaultValue="new">
                <TabsList>
                    <TabsTrigger value="new">New Form</TabsTrigger>
                    <TabsTrigger value="search">Search</TabsTrigger>
                </TabsList>
                <TabsContent value="new">
                    <FeedbackForm />
                </TabsContent>
                <TabsContent value="search">Search for feedback</TabsContent>
            </Tabs>
        </div>

    )
}
