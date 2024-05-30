"use client"
import { useSession } from "next-auth/react"
import { SessionProvider } from "next-auth/react"
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
        <div className="container mx-auto my-6 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start justify-between mb-2">
                <h1 className="text-2xl pb-6 font-bold">Inbox</h1>
            </div>
            <Tabs defaultValue="new" className="w-full">
                <TabsList>
                    <TabsTrigger value="new">New</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                <TabsContent value="new">
                    <div className="flex flex-col items-center justify-center h-[80vh] gap-6">
                        <EmptyInboxIcon className="w-16 h-16 text-gray-400" />
                        <div className=" px-8 text-center text-neutral-600">You do not have any new updates in your inbox.</div>
                    </div>
                </TabsContent>
                <TabsContent value="history">Change your history here.</TabsContent>
            </Tabs>

        </div>
    )
}

const EmptyInboxIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
    </svg>
);
