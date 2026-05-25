import conf from "@/conf/conf"

type RouteParams = Record<string, string | number>
type QueryParams = Record<string, string | number | boolean>

type apiRequestOptions = {
    url: string,
    data?: unknown,
    query?: QueryParams,
    route?: RouteParams
}

async function responseHandler(response: Response) {
    try {
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data?.message || "something went wrong")
        }
        return data
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Internal Server Error"
        // console.log(message)
        throw new Error(message)
    }
}


function queryParameterHandler(url: string, query?: QueryParams,) {

    if (!query || Object.entries(query).length === 0) {
        return url
    }

    const searchParams = new URLSearchParams();
    Object.entries(query).map(([key, value]) => {

        searchParams.append(key, String(value))
    })

    // console.log(`${url}?${searchParams.toString()}`)
    return `${url}?${searchParams.toString()}`
}

function routeParameterHandler(url: string, routeParams?: RouteParams) {
    // console.log(routeParams)

    if (!routeParams || Object.entries(routeParams).length === 0) {
        return url
    }

    let finalUrl = url;
    // console.log(Object.entries(routeParams))
    Object.entries(routeParams).forEach(([key, value]) => {
        finalUrl = finalUrl.replace(key, String(value))
    })

    return finalUrl
}

export const routes = {
    login: "/api/auth/login",
    register: "/api/auth/signup",
    verifyEmail: "/api/auth/verify-email",
    forgotPassword: "/api/auth/forgot-password",
    resetPassword: "/api/auth/reset-password",
    me: "/api/auth/me"
}

const baseUrl = process.env.NODE_ENV === "production" ? conf.EXPRESS_BASE_URL : "http://localhost:8000"

export const expressRoutes = {
    getDocs: `${baseUrl}/api/docs/tech`,
    getSingleDoc: `${baseUrl}/api/docs/slug`
}

export const api = {

    post: async ({ data, url, query, route }: apiRequestOptions) => {
        try {
            const routeUrl = routeParameterHandler(url, route)
            const finalUrl = queryParameterHandler(routeUrl, query)
            // console.log(finalUrl)
            // console.log(data)
            const response = await fetch(finalUrl, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(data)
            });
            const responseData = await responseHandler(response)
            return responseData
        } catch (error) {
            const message = error instanceof Error ? error.message : "Internal Server Error"
            console.log(message)
            throw new Error(message)
        }
    },
    get: async ({ query, url, route }: apiRequestOptions) => {
        try {


            const routeUrl = routeParameterHandler(url, route)
            const finalUrl = queryParameterHandler(routeUrl, query)
            // console.log(finalUrl)
            const response = await fetch(finalUrl)
            return await responseHandler(response)

        } catch (error) {
            const message = error instanceof Error ? error.message : "Internal Server Error"
            console.error(message)
            throw new Error(message)
        }
    }
}