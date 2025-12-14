import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function PlaygroundLanguages() {
  return (
    <Select>
      <SelectTrigger className="w-[200px] outline-none">
        <SelectValue placeholder="Select By Tech Stack" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel>Select By Tech Stack</SelectLabel> */}
          <SelectItem value="none">All</SelectItem>
          <SelectItem value="html,css">HTML,CSS</SelectItem>
          <SelectItem value="html,css,javascript">HTML,CSS,JavaScript</SelectItem>
          <SelectItem value="python">Python</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}