import { toast } from "./use-toast"
import { useAppDispatch } from "@/lib/hooks/hooks";
import { login, logout as sliceLogout } from "@/lib/store/features/authSlice";

function useAuth() {

    const dispatch = useAppDispatch()

    const logout = async () => {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
            })
            const data = await response.json()
            dispatch(sliceLogout())
            toast({
                title: "Logged out successfully",
                variant: "default",
            })
        } catch (error) {
            console.error(error)
            toast({
                title: "Logout failed",
                variant: "destructive",
            })
        }
    }

    const createSession = async () => {
        try {
            const response = await fetch('/api/auth/session', {
                method: 'POST',
            })
            const data = await response.json()
            // console.log(data)
            if (!data.success) {
                toast({
                    title: "Login failed",
                    variant: "destructive",
                })
                return
            }
            dispatch(login({ userData: data.data }))
        } catch (error) {
            console.log(error)
            toast({
                title: "Login failed",
                variant: "destructive",
            })
        }
    }
    return { logout, createSession }
}

export default useAuth