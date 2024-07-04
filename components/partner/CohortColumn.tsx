import { ColumnDef } from "@tanstack/react-table"
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

export type cohortColumn = {
    id: string,
    name: string,
}
const router = useRouter()
const pushPage = (id:string) => {
    router.push(`/cohorts/${id}`)
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
        cell: ({ getValue }) => {
            // const router = useRouter()
            const projectedData = getValue() as string;
            // const val:slotItem = getValue()
            return  <Button onClick={()=>{pushPage(projectedData)}}>
                Details
            </Button>
        }

    }

]
