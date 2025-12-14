import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogTitle,
    DialogFooter,
    DialogHeader,
    DialogContent,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function ChooseTech() {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        aria-label="Create new project"
                    >
                        <span className="text-lg font-semibold">+</span>
                        <span>Create Project</span>
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Choose language</DialogTitle>
                        <DialogDescription>
                            Select the language / stack you want to use for this project.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <RadioGroup
                            name="language"
                            defaultValue="html-css-js"
                            className="space-y-3"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="html-css" id="html-css" />
                                <Label htmlFor="html-css">HTML + CSS</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="html-css-js" id="html-css-js" />
                                <Label htmlFor="html-css-js">HTML + CSS + JS</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="markdown" id="markdown" />
                                <Label htmlFor="markdown">Markdown</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="python" id="python" />
                                <Label htmlFor="python">Python</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit">Create</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
