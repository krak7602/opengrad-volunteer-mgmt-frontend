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


// export type slotItem = {
//     id: number,
//     hourStart: string,
//     minStart: string,
//     hourEnd: string,
//     minEnd: string,
//     activity: string,
//     details: string,
// }

// export type logDay = {
//     date?: Date,
//     slots?: slotItem[],
// }

export type partnerColumn = {
    id: string,
    name: string,
}

    interface poc {
        id: number,
        user_id: user_id,
    }

    interface user_id {
        id: number,
        name: string,
        email: string,
        role: string
    }

export const columns: ColumnDef<poc>[] = [
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
        accessorKey: "user_id.id",
        header: "Details",
        meta: {
            align: 'right'
        },
        cell: ({ getValue }) => {
            const router = useRouter()
            const pushPage = (id: string) => {
                router.push(`/partners/${id}`)
            }
            const projectedData = getValue() as string;
            // const val:slotItem = getValue()
            return <Button onClick={() => { pushPage(projectedData) }}>
                Details
            </Button>
        }

    }

]
