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
import { StudentDetails } from "@/components/partner/StudentDetails"

export type student = {
    id: number,
    name: string,
    email: string,
    phone: string,
    volId: number,
    cohortId: number
}


const CellComponent = (row: CellContext<student, unknown>) => {
    const router = useRouter()
    const projectedData = row.getValue() as string;
    // const val:slotItem = getValue()
    // return <Button onClick={() => { router.push(`/students/${projectedData}`) }}>
    //     Details
    // </Button>
    return <StudentDetails studId={projectedData} />
    // return <div>{projectedData}</div>
}


export const columns: ColumnDef<student>[] = [
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
