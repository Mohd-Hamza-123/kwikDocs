"use client"

import { svgIcons } from ".."
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "../ui/textarea"

export default function CodeSaveDialog({ saveProject }: {
    saveProject: (title: string, description: string) => void
}) {

    const [open, setOpen] = useState<boolean>(false)

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const title = (formData.get("title") as string) || ""
        const description = (formData.get("description") as string) || ""
        saveProject(title.trim(), description.trim())
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    onClick={() => setOpen(true)}
                    variant='secondary'
                    className="px-4 py-2 font-semibold text-white rounded-lg shadow-lg md:h-10">
                    <svgIcons.save className="w-4 h-4 md:w-6 md:h-6" />
                </Button>
            </DialogTrigger>

            <DialogContent className="w-[95dvw] backdrop-blur-sm border border-slate-700 rounded-xl p-3">
                <form onSubmit={submit}>
                    <DialogHeader>
                        <DialogTitle className="text-lg font-semibold">Save Project</DialogTitle>
                        <DialogDescription className="text-sm text-slate-400">
                            Give your project a name and an optional description.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-6 mt-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name-1" className="text-sm">Project Name</Label>
                            <Input
                                id="name-1"
                                name="title"
                                placeholder="e.g. My Awesome App"
                                className="h-10 rounded-md px-3"
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="desc-1" className="text-sm">Description (optional)</Label>
                            <Textarea
                                id="desc-1"
                                name="description"
                                placeholder="Short description (what does this project do?)"
                                className="min-h-[120px] resize-none rounded-md p-3 text-sm"
                            />
                        </div>
                    </div>

                    <DialogFooter className="mt-6">
                        <div className="w-full flex justify-end items-center space-x-3">
                            <DialogClose asChild>
                                <Button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    variant="outline"
                                    className="px-4 py-2 h-9"
                                >
                                    Cancel
                                </Button>
                            </DialogClose>

                            <Button type="submit" className="px-4 py-2 h-9 min-w-[96px]">
                                Create
                            </Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
