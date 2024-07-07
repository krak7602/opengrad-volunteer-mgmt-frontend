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
//     name: string,
// }
// export type volunteerColumn = {
//     id: string,
//     name: string,
// }

// interface vol {
//     id: number
// }

interface user_id {
    id: number,
    name: string,
    email: string,
    role: string
}

interface poc {
    id: number
}

interface vol {
    id: number,
    poc: poc,
    user_id: user_id,
}
// interface vol {
//     id: number
// }

// interface vols {
//     id: number,
//     name: string,
//     startDate: number,
//     endDate: number,
//     vol: vol[]
// }

const CellComponent = (row: CellContext<vol, unknown>) => {
    const router = useRouter()
    const projectedData = row.getValue() as string;
    // const val:slotItem = getValue()
    return <VolunteerDetails volId={Number(projectedData)} />
    // return <Button onClick={() => { router.push(`/volunteers/${projectedData}`) }}>
    //     Details
    // </Button>
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
