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
import { VolunteerDetails } from "@/components/partner/VolunteerDetails"

// export type volunteerColumn = {
//     id: string,
//     // name: string,
// }

// interface vol {
//     id: number
// }
interface user_id {
    id: number,
    name: string,
    email: string,
    role: string,
}

interface vol {
    id: number,
    user_id: user_id,
}


const CellComponent = (row: CellContext<vol, unknown>) => {
    const router = useRouter()
    const projectedData = row.getValue() as string;
    // const val:slotItem = getValue()
    // return <Button onClick={() => { router.push(`/volunteers/${projectedData}`) }}>
    //     Details
    // </Button>
    return <VolunteerDetails volId={Number(projectedData)} />
}


export const columns: ColumnDef<vol>[] = [
    {
        accessorKey: "user_id.name",
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
