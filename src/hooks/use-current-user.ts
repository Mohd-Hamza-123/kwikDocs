"use client"
import { api, routes } from "@/lib/api/common"
import { useQuery } from "@tanstack/react-query"

const useCurrentUser = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: () => api.get({ url: routes.me }),
        staleTime: 1000 * 60 * 30
    })
}

export default useCurrentUser