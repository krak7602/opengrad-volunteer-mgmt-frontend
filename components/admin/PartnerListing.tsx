import { AddPartner } from "@/components/admin/AddPartner"
import { PartnerTable } from "@/components/admin/PartnerTable"
import { columns, partnerColumn } from "@/components/admin/PartnerColumn"
import { auth } from "@/auth"
// import { useAppSelector } from "@/lib/store";
import { useSession, SessionProvider } from 'next-auth/react'
import {  useListState } from "@mantine/hooks"
import { useFetch } from "@/lib/useFetch"
import { title } from '@/lib/atoms'
import { useAtom } from "jotai";
import { useEffect } from "react"

export default function PartnerListing() {
    interface poc {
        id: number,
        user_id: user_id,
    }

    interface user_id {
        id: number,
        name: string,
        email: string,
        role: string
    }

    const { data, loading, error, refetch, abort } = useFetch<poc[]>(
        `http://localhost:5001/user/get/poc`
    );



    const dat: partnerColumn[] = [{ id: "101", name: "NIT" }, { id: "102", name: "IIT" }]
    // const authData = useAppSelector((state) => state.auth);
    // console.log(authData)
    const session = useSession();
    useEffect(() => {
        if (data) {
            // setResponseCount(data?.length);
            console.log(data)
        }
    }, [data]);
    // setTitleAt("this is it")

    return (
        <div className="container mx-auto my-6 px-2 lg:px-8">
            {/* <div>{authData.role}</div> */}
            <div>{session?.data?.user?.email}</div>
            <div className="flex flex-col lg:flex-row items-start justify-between mb-2 py-4 rounded bg-primary text-white px-4">
                <h1 className="text-2xl pb-1 font-bold">Partners</h1>
                <div className="flex w-full flex-row justify-end">
                    <div className=" text-black">
                        <AddPartner />
                    </div>
                </div>
                {/* <h1 className="rounded-sm text-xs bg-primary text-white p-1 font-bold pl-1 md:mr-5"></h1> */}
            </div>
            <div className="overflow-x-auto">
                {data && <div>
                    <PartnerTable columns={columns} data={data} />
                </div>}
            </div>
        </div>
    )
}
