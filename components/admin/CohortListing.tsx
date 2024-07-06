import { AddCohort } from "@/components/admin/AddCohort"
import { CohortTable } from "@/components/admin/CohortTable"
import { columns } from "@/components/admin/CohortColumn"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator
} from "@/components/ui/command"
import { useFetch } from "@mantine/hooks"
import { Skeleton } from "@/components/ui/skeleton"
import { useSession } from 'next-auth/react'

export default function CohortListing() {
    const session = useSession();
    interface cohortColumn {
        id: number,
        name: string,
        startDate: string,
        endDate: string,
    }
    const { data, loading, error, refetch, abort } = useFetch<cohortColumn[]>(
        'http://localhost:5001/cohort/all', {
        headers: {
            authorization: `bearer ${session.data?.user.auth_token}`
        }
    }
    );

    // const dat: cohortColumn[] = [{ id: "101", name: "GATE 2023" }, { id: "102", name: "NEET 2024" }]
    return (
        <div>
            <div className="container mx-auto my-6 px-2 lg:px-8">
                <div className="flex flex-col lg:flex-row items-start justify-between mb-2 py-4 rounded bg-primary text-white px-4">
                    <div className=" pb-1">
                        <h1 className="text-2xl font-bold">Cohorts</h1>
                        <div className=" text-xs text-primary bg-white rounded-full text-center px-2 mt-1 w-fit">Members</div>
                    </div>
                    <div className="flex w-full flex-row justify-end">
                        <div className=" text-black">
                            <AddCohort />
                        </div>
                    </div>
                    {/* <h1 className="rounded-sm text-xs bg-primary text-white p-1 font-bold pl-1 md:mr-5"></h1> */}
                </div>
                <div className="overflow-x-auto">
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
        </div>

    )
}
