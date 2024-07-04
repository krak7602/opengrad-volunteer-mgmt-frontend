"use client"
import { useSession } from "next-auth/react"
import { SessionProvider } from "next-auth/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { useState } from "react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"

export default function Page({
    params,
    searchParams,
}: {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const [togglePartner, setTogglePartner] = useState(true)
    const [toggleCohort, setToggleCohort] = useState(false)
    const [open, setOpen] = useState(false)
    const toggleClick = (option: string) => {
        if (option === 'cohort') {
            setToggleCohort(!toggleCohort);
            setTogglePartner(false);
            // setRecipientCohorts.setState([])
            // setRecipientCohortCount(0)
            // setRecipientPartners.setState([])
            // setRecipientPartnerCount(0)
        } else if (option === 'partner') {
            setToggleCohort(false);
            setTogglePartner(!togglePartner);
            // setRecipientCohorts.setState([])
            // setRecipientCohortCount(0)
            // setRecipientPartners.setState([])
            // setRecipientPartnerCount(0)
        }
    }
    const cohortList = [
        {
            id: 112,
            name: "JEE Advanced 2020",
        },
        {
            id: 113,
            name: "NEET 2024",
        },
        {
            id: 114,
            name: "GMAT 2023",
        },
    ]
    return (
        <div className="container mx-auto my-6 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start justify-between mb-2">
                <h1 className="text-2xl pb-6 font-bold">Inbox</h1>
            </div>
            {/* <Tabs defaultValue="new" className="w-full">
                <TabsList>
                    <TabsTrigger value="new">New</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                <TabsContent value="new">
                    <div className="flex flex-col items-center justify-center h-[80vh] gap-6">
                        <EmptyInboxIcon className="w-16 h-16 text-gray-400" />
                        <div className=" px-8 text-center text-neutral-600">You do not have any new updates in your inbox.</div>
                    </div>
                </TabsContent>
                <TabsContent value="history">Change your history here.</TabsContent>
            </Tabs> */}
            <form className="flex flex-col gap-2">
                <ToggleGroup type="single" defaultValue='partner' className=" ml-1 gap-0 mb-2 rounded bg-slate-200">
                    {/* <ToggleGroupItem className=" px-2 font-light rounded-l-sm rounded-r-none data-[state=on]:bg-primary data-[state=on]:text-white" onClick={() => toggleClick("partners")} value="partners"> */}
                    <ToggleGroupItem className=" w-full px-2 font-light rounded-l-sm rounded-r-none data-[state=on]:bg-primary data-[state=on]:text-white" onClick={() => toggleClick("partner")} value="partner">
                        <div className=' text-xs'>Partners</div>
                    </ToggleGroupItem>
                    {/* <div className=' font-extralight text-gray-600 text-2xl'>/</div> */}
                    {/* <ToggleGroupItem className=" px-2  font-light rounded-l-none rounded-r-sm data-[state=on]:bg-primary data-[state=on]:text-white" onClick={() => toggleClick("cohorts")} value="cohorts"> */}
                    <ToggleGroupItem className=" w-full px-2  font-light rounded-l-none rounded-r-sm data-[state=on]:bg-primary data-[state=on]:text-white" onClick={() => toggleClick("cohort")} value="cohort">
                        <div className=' text-xs'>Cohorts</div>
                    </ToggleGroupItem>
                </ToggleGroup>
                {toggleCohort && <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="lg:w-fit w-full font-light py-3 rounded-lg px-3  mb-2 flex justify-center items-center mr-2">
                            {/* <PlusIcon className="h-4 w-4" /> */}
                            <div className="mx-2">
                                Select Cohort
                            </div>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                            <CommandInput placeholder="Select cohort" />
                            <CommandList>
                                <CommandEmpty>No recipient found.</CommandEmpty>
                                <CommandGroup>
                                    {cohortList.map((cohort) => (
                                        <CommandItem
                                            key={cohort.id}
                                            value={cohort.name}
                                            onSelect={(currentValue) => {
                                                // AddCohort(currentValue)
                                                // setValue(currentValue === value ? "" : currentValue)
                                                setOpen(false)
                                            }}
                                        >
                                            {cohort.name}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
                }

            </form>
        </div>

    )
}

const EmptyInboxIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
    </svg>
);


