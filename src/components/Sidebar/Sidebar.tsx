'use client'
import {
    Sheet,
    SheetTitle,
    SheetHeader,
    SheetContent,
} from "@/components/ui/sheet"
import React, { useEffect } from "react"
import { Button } from "../ui/button"
import { ThemeToggle } from "@/index"
import SidebarLinks from "./SidebarLinks"
import { useRouter } from "next/navigation"
import { IoMdLogOut } from "react-icons/io"
import { useTypicalContext } from "@/context/Typical-Context"
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks"
import useAuth from "@/hooks/use-auth"

const Sidebar = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const userData = useAppSelector((state) => state.auth.userData)
    const userStatus = useAppSelector((state) => state.auth.userStatus)
    const { isSideBarOpen, setIsSideBarOpen } = useTypicalContext()
    const { logout, createSession } = useAuth()

    const closeSideBar = () => setIsSideBarOpen(false)

    if (!isSideBarOpen) return null

    return (
        <Sheet open={isSideBarOpen} onOpenChange={setIsSideBarOpen}>
            <SheetContent
                side="right"
                className="w-[280px] sm:w-[320px] border-l border-border/60
          bg-gradient-to-b from-background/95 via-background/90 to-background/80
          backdrop-blur-xl
          px-4 py-6
          flex flex-col gap-4">
                <SheetHeader className="flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-3">
                        <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-lg font-semibold">
                            {userData?.username?.[0]?.toUpperCase() || "K"}
                        </div>
                        <div className="flex flex-col items-start">
                            <SheetTitle className="text-sm font-semibold tracking-tight">
                                Kwikdocs
                            </SheetTitle>
                            <span className="text-xs text-muted-foreground">
                                Your coding space
                            </span>
                        </div>
                    </div>


                </SheetHeader>

                {/* NAV */}
                <nav className="mt-2 flex-1 overflow-y-auto pr-1">
                    <div className="p-2">
                        <SidebarLinks closeSideBar={closeSideBar} />
                    </div>
                </nav>


                <div className="ml-auto">
                    <ThemeToggle closeSideBar={closeSideBar} />
                </div>

                {/* USER FOOTER */}
                {userStatus && (
                    <div className="mt-2 border-t border-border/50 pt-4 flex items-center justify-between gap-3">
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={logout}
                            className="gap-2 rounded-full px-3 transition-all duration-200 hover:scale-[1.02]">
                            <IoMdLogOut className="text-base" />
                            <span className="hidden sm:inline">Logout</span>
                        </Button>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}

export default Sidebar
