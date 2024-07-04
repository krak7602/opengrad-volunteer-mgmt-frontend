import { CohortTable } from "@/components/partner/CohortTable"
import { columns, cohortColumn } from "@/components/partner/CohortColumn"

export default function CohortListing() {
    const dat: cohortColumn[] = [{ id: "101", name: "GATE 2023" }, { id: "102", name: "NEET 2024" }]
    return (
        <div className="container mx-auto my-6 px-2 lg:px-8">
            
                <div className="flex flex-col lg:flex-row items-start justify-between mb-2 pt-4 pb-6 rounded bg-primary text-white px-4">
                    <div className=" pb-1">
                        <h1 className="text-2xl font-bold">Cohorts</h1>
                        <div className=" text-xs text-primary bg-white rounded-full text-center px-2 mt-1 w-fit">Members</div>
                    </div>
                    {/* <div className="flex w-full flex-row justify-end">
                        <div className=" text-black">
                            <AddCohort />
                        </div>
                    </div> */}
                    {/* <h1 className="rounded-sm text-xs bg-primary text-white p-1 font-bold pl-1 md:mr-5"></h1> */}
                </div>
                <div className="overflow-x-auto">
                    <CohortTable columns={columns} data={dat} />
                </div>
        </div>
    )
}
