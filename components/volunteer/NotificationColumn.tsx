import { Cell, CellContext, ColumnDef } from "@tanstack/react-table"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { Getter } from "jotai"

// export interface cohortColumn {
//     id: number,
//     name: string,
//     startDate: string,
//     endDate: string,
// }
interface notif {
    id: number,
    typeofnotification: "form",
    Message: string,
    form_id: number,
    receipient_id: number[]
}

const CellComponent = (row: CellContext<notif, unknown>) => {
    const router = useRouter()
    const pushPage = (id: string) => {
        router.push(`/feedback/${id}`)
    }
    const projectedData = row.getValue() as string;
    // const val:slotItem = getValue()
    return <Button onClick={() => { pushPage(projectedData) }}>
        Details
    </Button>
}


export const columns: ColumnDef<notif>[] = [
    {
        accessorKey: "Message",
        header: "Message",
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
        accessorKey: "form_id",
        header: "Details",
        meta: {
            align: 'right'
        },
        cell: CellComponent

    }

]
