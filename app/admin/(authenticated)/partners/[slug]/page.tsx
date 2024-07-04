"use client"
import React, { useState } from "react"
import { useListState } from "@mantine/hooks"
import { Button } from "@/components/ui/button"
// import PartnerListing from "@/components/admin/PartnerListing"
import { AddVolunteer } from "@/components/admin/AddVolunteer"
import { VolunteerTable } from "@/components/admin/VolunteerTable"
import { columns, volunteerColumn } from "@/components/admin/VolunteerColumn"
export default function Page({
    params,
    searchParams,
}: {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const dat:volunteerColumn[] = [{ id: "101", name: "Someone" }, { id: "102", name: "Someone else" }]
    return (
        <div className="container mx-auto my-6 px-2 lg:px-8">
            <div className="flex flex-col lg:flex-row items-start justify-between mb-2 py-4 rounded bg-primary text-white px-4">
                <div className=" pb-1">
                    <h1 className="text-2xl font-bold">Volunteers</h1>
                    <div className=" text-sm">Name</div>
                </div>
                <div className="flex w-full flex-row justify-end">
                    <div className=" text-black">
                        <AddVolunteer id={Number(params.slug)}/>
                    </div>
                </div>
                {/* <h1 className="rounded-sm text-xs bg-primary text-white p-1 font-bold pl-1 md:mr-5"></h1> */}
            </div>
            <div className="overflow-x-auto">
                <VolunteerTable columns={columns} data={dat} />
            </div>
        </div>
    )
}
