import { CellContext, ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { Getter } from "jotai"

export interface cohortColumn {
    id: number,
    name: string,
    startDate: string,
    endDate: string,
}

const CellComponent = (row: CellContext<cohortColumn, unknown>) => {
    const router = useRouter()
    const pushPage = (id: string) => {
        router.push(`/cohorts/${id}`)
    }
    const projectedData = row.getValue() as string;
    return <Button onClick={() => { pushPage(projectedData) }}>
        Details
    </Button>
}


export const columns: ColumnDef<cohortColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
        meta: {
            align: 'left'
        },
        cell: ({ getValue }) => {
            const projectedData = getValue() as string;
            return (
                <div>{projectedData}</div>
            )
        }
    },
    {
        accessorKey: "id",
        header: "Details",
        meta: {
            align: 'right'
        },
        cell: CellComponent

    }

]
