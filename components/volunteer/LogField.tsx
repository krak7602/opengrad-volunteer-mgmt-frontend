import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface slotItem {
    id: number,
    hour: string,
    min: string,
    activity: string,
    details: string,
}

export default function LogField({ slot, handleSlotFieldChange, index }: { slot: slotItem, handleSlotFieldChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, index: number, field: string) => void, index: number }) {
    return (
        <div>
            <div className="flex items-end gap-2">
                <div className="grid gap-1 text-center">
                    <Label htmlFor="hours" className="text-xs">
                        Hours
                    </Label>
                    <Input
                        className="w-[48px] text-center font-mono text-base tabular-nums caret-transparent focus:bg-accent focus:text-accent-foreground [&::-webkit-inner-spin-button]:appearance-none"
                        value={slot.hour}
                        onChange={(e) => { handleSlotFieldChange(e, index, "hour") }}
                        type="text"
                    />
                </div>

                <div className="grid gap-1 text-center">
                    <Label htmlFor="hours" className="text-xs">
                        Hours
                    </Label>
                    <Input
                        className="w-[48px] text-center font-mono text-base tabular-nums caret-transparent focus:bg-accent focus:text-accent-foreground [&::-webkit-inner-spin-button]:appearance-none"
                        value={slot.min}
                        onChange={(e) => { handleSlotFieldChange(e, index, "min") }}
                        type="text"
                    />
                </div>
            </div>
            <div className="col-span-2 py-3">
                <Label htmlFor="activity">Activity</Label>
                <Textarea className="min-h-[100px] min-w-max" onChange={(e) => { handleSlotFieldChange(e, index, "activity") }} placeholder="Describe your activity" />
            </div>
        </div>
    );
}
