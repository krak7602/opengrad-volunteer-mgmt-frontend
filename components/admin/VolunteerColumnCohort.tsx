import { ColumnDef, CellContext } from "@tanstack/react-table"
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

export type volunteerColumn = {
    id: string,
    // name: string,
}

interface vol {
    id: number
}


const CellComponent = (row: CellContext<vol, unknown>) => {
    const router = useRouter()
    const projectedData = row.getValue() as string;
    // const val:slotItem = getValue()
    return <Button onClick={() => { router.push(`/volunteers/${projectedData}`) }}>
        Details
    </Button>
}


export const columns: ColumnDef<vol>[] = [
    {
        accessorKey: "id",
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
        // cell: ({ getValue }) => {
        //     const router = useRouter()
        //     const projectedData = getValue() as string;
        //     // const val:slotItem = getValue()
        //     return <Button onClick={() => { router.push(`/partners/${projectedData}`) }}>
        //         Details
        //     </Button>
        // }

    }

]
