"use client"
import React, { useState } from "react"
import { useListState } from "@mantine/hooks"
import { Button } from "@/components/ui/button"
// import PartnerListing from "@/components/admin/PartnerListing"
import { AddStudent } from "@/components/admin/AddStudent"
import { VolunteerTable } from "@/components/admin/VolunteerTable"
import { columns, volunteerColumn } from "@/components/admin/VolunteerColumn"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
export default function Page({
    params,
    searchParams,
}: {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const dat: volunteerColumn[] = [{ id: "101", name: "Someone" }, { id: "102", name: "Someone else" }]
    return (
        <Tabs id="cohort-tab" defaultValue="students">
            <div className="container mx-auto my-6 px-2 lg:px-8">
                <div className="flex flex-col lg:flex-row items-start justify-between mb-2 py-4 rounded bg-primary text-white px-4">
                    <div className=" pb-1">
                        <h1 className="text-2xl font-bold">Name</h1>
                        {/* <div className=" text-sm">Name</div> */}
                    </div>
                    <div className="flex gap-1 w-full flex-row justify-end">

                        <TabsContent value="students" className=" text-black m-0" >
                            <AddStudent />
                        </TabsContent>
                        <TabsContent value="volunteers" className=" text-black m-0" >
                            <AddStudent />
                        </TabsContent>
                        <TabsList>
                            <TabsTrigger value="students">
                                <AcademicCapIcon />
                            </TabsTrigger>
                            <TabsTrigger value="volunteers">
                                <UserMultipleIcon />
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    {/* <h1 className="rounded-sm text-xs bg-primary text-white p-1 font-bold pl-1 md:mr-5"></h1> */}
                </div>
                <div className="overflow-x-auto">
                    <TabsContent value="students">Make changes to your account here.</TabsContent>
                    <TabsContent value="volunteers">
                        <VolunteerTable columns={columns} data={dat} />
                    </TabsContent>
                </div>
            </div>
        </Tabs >

    )
}

const UserMultipleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    </svg>
);

const AcademicCapIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
    </svg>
);

