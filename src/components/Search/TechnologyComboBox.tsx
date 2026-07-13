"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

const technologies = [
    { value: "all", label: "All Technologies" },
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "react", label: "React" },
    { value: "nextjs", label: "Next.js" },
    { value: "nodejs", label: "Node.js" },
    { value: "express", label: "Express" },
    { value: "mongodb", label: "MongoDB" },
    { value: "redis", label: "Redis" },
    { value: "git", label: "Git" },
];

type Props = {
    value: string;
    onChange: (value: string) => void;
};

export default function TechnologyCombobox({
    value,
    onChange,
}: Props) {
    const [open, setOpen] = React.useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[220px] justify-between"
                >
                    {technologies.find((tech) => tech.value === value)?.label ??
                        "Select Technology"}

                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[220px] p-0">
                <Command>
                    <CommandInput placeholder="Search technology..." />

                    <CommandEmpty>No technology found.</CommandEmpty>

                    <CommandGroup className="max-h-72 overflow-y-auto">
                        {technologies.map((tech) => (
                            <CommandItem
                                key={tech.value}
                                value={tech.label}
                                onSelect={() => {
                                    onChange(tech.value);
                                    setOpen(false);
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === tech.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                    )}
                                />

                                {tech.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}