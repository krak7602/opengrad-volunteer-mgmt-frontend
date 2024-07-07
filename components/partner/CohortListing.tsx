import { CohortTable } from "@/components/partner/CohortTable"
import { columns } from "@/components/partner/CohortColumn"
import { useFetch } from "@/lib/useFetch"
import { Skeleton } from "@/components/ui/skeleton"
import { useSession } from 'next-auth/react'

export default function CohortListing() {
    const session = useSession();
    interface poc {
        id: number,
    }

    interface cohortColumn {
        id: number,
        name: string,
        startDate: string,
        endDate: string,
        poc: poc[]
    }

    const { data, loading, error, refetch, abort } = useFetch<cohortColumn[]>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/cohort/poc/${session.data?.user.auth_id}`, {
        headers: {
            authorization: `Bearer ${session.data?.user.auth_token}`
        }, autoInvoke:true,
    },[session]);
    // const dat: cohortColumn[] = [{ id: "101", name: "GATE 2023" }, { id: "102", name: "NEET 2024" }]
    return (
        <div className="container mx-auto my-6 px-2 lg:px-8">

            <div className="flex flex-col lg:flex-row items-start justify-between mb-2 pt-4 pb-6 rounded bg-primary text-white px-4">
                <div className=" pb-1">
                    <h1 className="text-2xl font-bold">Cohorts</h1>
                    {/* <div className=" text-xs text-primary bg-white rounded-full text-center px-2 mt-1 w-fit">Members</div> */}
                </div>
                {/* <div className="flex w-full flex-row justify-end">
                        <div className=" text-black">
                            <AddCohort />
                        </div>
                    </div> */}
                {/* <h1 className="rounded-sm text-xs bg-primary text-white p-1 font-bold pl-1 md:mr-5"></h1> */}
            </div>
            <div className="overflow-x-auto">
                {/* <CohortTable columns={columns} data={dat} /> */}
                {loading && <div>
                    <div className="flex flex-col space-y-3">
                        <Skeleton className=" h-11 w-full rounded-md" />
                        {/* <div className="space-y-2"> 
                                <Skeleton className=" h-11 w-full rounded-md" />
                                <Skeleton className="h-11 w-full rounded-md" />
                            {/* </div> */}
                    </div>
                </div>}
                {data && <div>
                    <CohortTable columns={columns} data={data} />
                </div>}
            </div>
        </div>
    )
}
