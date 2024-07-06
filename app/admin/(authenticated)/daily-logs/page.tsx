"use client"
import { SessionProvider } from "next-auth/react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import FeedbackForm from "@/components/admin/FeedbackForm"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSession } from 'next-auth/react'
import { useFetch } from "@/lib/useFetch"
import { useListState } from "@mantine/hooks"
import { useEffect, useState } from "react"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

export default function Page({
    params,
    searchParams,
}: {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    interface poc_user_id {
        id: number,
        name: string,
        email: string,
        role: string
    }

    interface poc {
        id: number,
        user_id: poc_user_id,
    }

    interface user_id {
        id: number,
        name: string,
        email: string,
        role: string
    }

    interface poc_user {
        id: number
    }

    interface vol {
        id: number,
        poc: poc_user,
        user_id: user_id,
    }

    const session = useSession();
    const [volData, setVolData] = useListState<vol>()
    const [selectedPartner, setSelectedPartner] = useState<poc>()
    const [selectedVolunteer, setSelectedVolunteer] = useState<vol>()
    const [psOpen, setPSOpen] = useState(false)
    const [vsOpen, setVSOpen] = useState(false)
    const partnersData = useFetch<poc[]>(
        `http://localhost:5001/user/get/poc`, {
        headers: {
            authorization: `bearer ${session.data?.user.auth_token}`
        }
    }
    );



    useEffect(() => {
        if (selectedPartner) {
            // // setResponseCount(data?.length);
            // console.log(data)
            const volunteersData = useFetch<vol[]>(
                `http://localhost:5001/user/volbyPoc/${selectedPartner.id}`, {
                headers: {
                    authorization: `bearer ${session.data?.user.auth_token}`
                }
            }
            );
            if (volunteersData.data) {
                setVolData.setState(volunteersData.data)
            }
        }
    }, [selectedPartner]);

    return (
        <div className="container mx-auto my-6 px-2 lg:px-8">
            <Popover open={psOpen} onOpenChange={setPSOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        // aria-expanded={open}
                        aria-expanded={psOpen}
                        className="lg:w-fit w-full font-light py-3 rounded-lg px-3  mb-2 flex justify-center items-center mr-2">
                        {/* <PlusIcon className="h-4 w-4" /> */}
                        <div className="hidden md:block mx-2">
                            Select Partner
                        </div>
                    </Button>
                    {/* <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-[200px] justify-between mb-2"s
                                >
                                    Add Recipient...
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button> */}
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Add Recipient" />
                        <CommandList>
                            <CommandEmpty>No recipient found.</CommandEmpty>
                            <CommandGroup>
                                {partnersData.data?.map((pt) => (
                                    <CommandItem
                                        key={pt.id}
                                        value={pt.user_id.name}
                                        onSelect={(currentValue) => {
                                            // AddCohort(currentValue)
                                            setSelectedPartner(pt)
                                            // setValue(currentValue === value ? "" : currentValue)
                                            setPSOpen(false)
                                        }}
                                    >
                                        {/* <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            value === cohort.name ? "opacity-100" : "opacity-0"
                                                        )}
                                                    /> */}
                                        {selectedPartner?.user_id.name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <Popover open={vsOpen} onOpenChange={setVSOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        // aria-expanded={open}
                        aria-expanded={vsOpen}
                        className="lg:w-fit w-full font-light py-3 rounded-lg px-3  mb-2 flex justify-center items-center mr-2">
                        {/* <PlusIcon className="h-4 w-4" /> */}
                        <div className="hidden md:block mx-2">
                            Select Volunteer
                        </div>
                    </Button>
                    {/* <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-[200px] justify-between mb-2"s
                                >
                                    Add Recipient...
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button> */}
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Add Recipient" />
                        <CommandList>
                            <CommandEmpty>No recipient found.</CommandEmpty>
                            <CommandGroup>
                                {volData.map((vl) => (
                                    <CommandItem
                                        key={vl.id}
                                        value={vl.user_id.name}
                                        onSelect={(currentValue) => {
                                            // AddCohort(currentValue)
                                            setSelectedVolunteer(vl)
                                            // setValue(currentValue === value ? "" : currentValue)
                                            setPSOpen(false)
                                        }}
                                    >
                                        {/* <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            value === cohort.name ? "opacity-100" : "opacity-0"
                                                        )}
                                                    /> */}
                                        {selectedVolunteer?.user_id.name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}
