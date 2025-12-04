import { ScrollArea } from "./ui/scroll-area";
import * as React from "react"
import { Separator } from "./ui/separator";
import { PropertiesResponse } from "@/types";

interface Props{
    data: PropertiesResponse
}

export default function ScrollAreaSearchBar({data}: Props) {
    return (
        <ScrollArea className="h-72 w-48 rounded-md border">
            <div className="p-4">
                <h4 className="mb-4 text-sm leading-none font-medium">Tags</h4>
                {data.results.map((tag) => (
                    <React.Fragment key={tag.address.city}>
                        <div className="text-sm">{tag.address.city}</div>
                        <Separator className="my-2" />
                    </React.Fragment>
                ))}
            </div>
        </ScrollArea>
    )
}