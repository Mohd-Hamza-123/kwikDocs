"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { getAllTechnology } from "@/lib/API/techAPI/getAllTech";


export function ComboboxDemo({
  value,
  onChange,
}: {
  value: any;
  onChange: any;
}) {

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([])

  const {
    data: technology = [],
    error: technologyError,
    isPending: technologyPending,
    isSuccess: technologySuccess,
    isFetching: technologyFetching,
    refetch
  } = useQuery({
    queryKey: ['technologies'],
    queryFn: getAllTechnology,
    staleTime: Infinity,
  });

  React.useEffect(() => {
    if (technology?.length === 0) return
    const technologies = technology?.flatMap((tech: any) => {
      return tech.technologies
    });
    setOptions(technologies)
  }, [technology]);
  

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[100%] justify-between"
        >
          {value
            ? options.find((tech: any) => tech?._id === value)?.name
            : "Select Category"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[285px] p-0 ">
        <Command>
          <CommandInput placeholder="select technology" />
          <CommandEmpty>No Category found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
                {options.map((tech: any) => (
                  <CommandItem
                    key={tech?._id}
                    value={tech?.name}
                    onSelect={(currentValue) => {

                      onChange((value = tech?._id));
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4 ",
                        value === tech?.name ? "opacity-100" : "opacity-0 "
                      )}
                    />
                    {tech?.name}
                  </CommandItem>
                ))}
              </ScrollArea>
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
