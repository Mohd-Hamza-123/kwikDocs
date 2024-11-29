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
import { frameworksToLearn, languagesToLearn } from "./Content/LanguagesContent";




const languages = languagesToLearn.map((languages) => {
  return {
    value: languages.title
  }
})
const frameworks = frameworksToLearn.map((framework) => {
  return {
    value: framework.title
  }
})

const techonology = [...languages, ...frameworks]

export function ComboboxDemo({
  value,
  onChange,
}: {
  value: any;
  onChange: any;
}) {
  // console.log(value);
  const [open, setOpen] = React.useState(false);

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
            ? techonology.find((tech) => tech.value === value)?.value
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
                {techonology.map((tech) => (
                  <CommandItem
                    key={tech.value}
                    value={tech.value}
                    onSelect={(currentValue) => {
                      onChange((value = currentValue));
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4 ",
                        value === tech.value ? "opacity-100" : "opacity-0 "
                      )}
                    />
                    {tech.value}
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
