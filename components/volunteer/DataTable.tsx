import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { AddOrgForm } from "@/components/volunteer/AddOrgForm"

export default function DataTable() {
    return (
        <div className="container mx-auto my-6 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start justify-between mb-4">
                <h1 className="text-2xl pb-6 font-bold">Organizations</h1>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-none">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <Input
                            className="pl-10 pr-4 py-2 rounded-md border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary w-full"
                            placeholder="Search organizations..."
                            type="search"
                        />
                    </div>
                    <Dialog>
                        <DialogTrigger>
                            <Button size="sm" variant="outline">
                                <PlusIcon className="h-4 w-4" />
                                <span className="sr-only">Add Organization</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold pb-6">Add Organization</DialogTitle>
                                <DialogDescription>
                                    <AddOrgForm />
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    {/* <Button size="sm" variant="outline">
                        <PlusIcon className="h-4 w-4" />
                        <span className="sr-only">Add Organization</span>
                    </Button> */}
                </div>
            </div>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                <div className="flex items-center gap-2">
                                    <span>Organization</span>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button size="icon" variant="ghost">
                                                <ChevronDownIcon className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="start">
                                            <DropdownMenuItem>A-Z</DropdownMenuItem>
                                            <DropdownMenuItem>Z-A</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex items-center gap-2">
                                    <span>Email</span>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button size="icon" variant="ghost">
                                                <ChevronDownIcon className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="start">
                                            <DropdownMenuItem>A-Z</DropdownMenuItem>
                                            <DropdownMenuItem>Z-A</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex items-center gap-2">
                                    <span>Courses</span>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button size="icon" variant="ghost">
                                                <ChevronDownIcon className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="start">
                                            <DropdownMenuItem>Ascending</DropdownMenuItem>
                                            <DropdownMenuItem>Descending</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </TableHead>
                            <TableHead />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">IIT Palakad</TableCell>
                            <TableCell>mail@iitp.com</TableCell>
                            <TableCell>5</TableCell>
                            <TableCell className="text-right">
                                <Button size="sm" variant="outline">
                                    View
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">NIT Calicut</TableCell>
                            <TableCell>mail@nitc.com</TableCell>
                            <TableCell>8</TableCell>
                            <TableCell className="text-right">
                                <Button size="sm" variant="outline">
                                    View
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">IIM Bangalore</TableCell>
                            <TableCell>mail@iimb.com</TableCell>
                            <TableCell>3</TableCell>
                            <TableCell className="text-right">
                                <Button size="sm" variant="outline">
                                    View
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">NUALS Kochi</TableCell>
                            <TableCell>mail@nualsk.com</TableCell>
                            <TableCell>7</TableCell>
                            <TableCell className="text-right">
                                <Button size="sm" variant="outline">
                                    View
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">IEEE Kerala</TableCell>
                            <TableCell>mailk@ieee.com</TableCell>
                            <TableCell>2</TableCell>
                            <TableCell className="text-right">
                                <Button size="sm" variant="outline">
                                    View
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

function ChevronDownIcon(props: { className: string }) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m6 9 6 6 6-6" />
        </svg>
    )
}


function PlusIcon(props: { className: string }) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    )
}


function SearchIcon(props: { className: string }) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    )
}