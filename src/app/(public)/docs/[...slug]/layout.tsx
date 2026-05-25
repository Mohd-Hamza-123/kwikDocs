'use client'

import React, { useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { api, expressRoutes } from "@/lib/api/common";
import { useParams, useRouter } from "next/navigation";
import { FilteredPostList, LoadingPage } from "@/index";
import { useResponsiveContext } from "@/context/CSS-Context";

const layout = ({ children }: { children: React.ReactNode }) => {

    const dispatch = useAppDispatch()
    const firstDoc = useAppSelector((state) => state.dataSlice.defaultDoc)
    
    const router = useRouter();
    const params = useParams();
    const slug = params.slug as string[]
    const tech = slug[0]

    const { isDocIndexOpen } = useResponsiveContext();

    const { data, isPending, isError, error } = useQuery({
        queryKey: ['documents', tech],
        queryFn: () => api.get({ url: expressRoutes.getDocs, route: { tech: String(tech) } }),
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    })

    const documents = data?.data || []

    useEffect(() => {
        if (!firstDoc) {
            dispatch(setDefaultSlug({ defaultDoc: data?.firstDoc || null }))
        }
    }, [data])

    if (isPending) return <LoadingPage />
    if (isError) return <Error error={error} reset={() => router.refresh()} />

    return (
        <div className="flex flex-col-reverse lg:flex-row relative h-[91dvh] overflow-x-hidden w-full justify-between">
            <div className="w-full flex flex-col lg:flex-row">
                <section className={`w-full lg:w-[27%] overflow-y-scroll bg-slate-50 dark:bg-bgDark z-20 sticky top-0 ${isDocIndexOpen ? "block" : "hidden"} lg:block`}>
                    <FilteredPostList nodes={documents} />
                </section>
                {children}
            </div>
        </div>
    )
}

export default layout


import { AlertTriangle, RefreshCcw } from "lucide-react";
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hooks';
import { Button } from "@/components/ui/button";
import { useSelector } from 'react-redux';
import { setDefaultSlug } from '@/lib/store/features/dataSlice';

type ErrorProps = {
    error: any;
    reset: () => void;
};

function Error({ error, reset }: ErrorProps) {
    return (

        <section className="w-[95%] md:w-1/2 mx-auto flex flex-col items-center justify-center h-[80dvh]">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <AlertTriangle className="size-6" />
            </div>

            <h1 className="text-2xl font-semibold tracking-tight">
                Something went wrong
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
                We couldn&apos;t load this page. Please try again.
            </p>

            {error?.message && (
                <p className="mt-4 rounded-lg border bg-muted px-3 py-2 text-left text-sm text-muted-foreground">
                    {error.message}
                </p>
            )}

            <Button onClick={reset} className="mt-6 w-full">
                <RefreshCcw className="mr-2 size-4" />
                Try again
            </Button>
        </section>

    );
}