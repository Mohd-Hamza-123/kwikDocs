'use client'

import React from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

const SearchDocs = () => {

    const { register, handleSubmit } = useForm({
        defaultValues: {
            search: "",
        },
    });


    const onSubmit = (data: { search: string }) => {
        console.log(data.search)
    }
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative w-full md:w-1/2 mx-auto flex gap-2">
            <Input
                {...register("search", {
                    required: true,
                })}
                className="w-full outline-none" />
            <Button variant="default">Search</Button>
        </form>
    )
}

export default SearchDocs