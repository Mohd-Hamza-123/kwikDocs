"use client";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTechnology } from "@/lib/API/techAPI/createTech";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { getAllTechnology } from "@/lib/API/techAPI/getAllTech";
import { overlayLoadingIsFalseReducer, overlayLoadingIsTrueReducer } from "@/lib/store/features/overlayLoaderSlice";
import { technologyEnums } from "@/constant";
import { useRouter } from "next/navigation";

const CreateTech = () => {
    const router = useRouter()
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();

    const userData = useAppSelector((state) => state.auth.userData)
    // REACT-HOOK-FORM

    const { register, handleSubmit, setValue, reset } = useForm();

    const {
        data: technology = [],
        error: technologyError,
        isPending: technologyPending,
        isSuccess: technologySuccess,
        isFetching: technologyFetching,
        refetch
    } = useQuery({
        queryKey: ['technologies'],
        queryFn: getAllTechnology,
        staleTime: Infinity,
    });
    // console.log(technology)
    const createCategoryMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            return createTechnology(formData)
        },
        onMutate: () => {
            dispatch(overlayLoadingIsTrueReducer({
                loadingMsg: "Wait Please !"
            }))
        },
        onSuccess: (response) => {

            router.push('/')
            // const newCategory = response?.payload;
            // queryClient.setQueryData(['technology'], (prev: any) => {
            //   return prev ? [newCategory, ...prev] : [newCategory]
            // })

            // toast({
            //     variant: "success",
            //     title: response?.message,
            // });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: error?.message,
            });
        },
        onSettled: () => {
            dispatch(overlayLoadingIsFalseReducer());
            reset()
        }
    })

    const updateCategoryMutation = useMutation({
        mutationFn: async (payload: Object) => {
            // return updateTechnology(payload)
        },
        onMutate: () => {
            refetch();

        },
        onSuccess: (response) => {
            // queryClient.invalidateQueries({ queryKey: ['technology'] })


            // toast({
            //     variant: "success",
            //     title: response?.message,
            // });
        },
        onError: (error) => {

            toast({
                variant: "destructive",
                title: error.message,
            });
        }
    })
    const deleteCategoryMutation = useMutation({
        mutationFn: async (id: string) => {
            // return deleteTechnology(id)
        },
        onMutate: () => {

        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['technology'] })
            refetch()

            // toast({
            //     variant: "success",
            //     title: response?.message,
            //     description: formatCurrentDate(),
            // });
        },
        onError: (error) => {

            toast({
                variant: "destructive",
                title: error.message,
            });
        }
    })

    // USE STATE
    const [isTechUpdate, setIsTechUpdate] = useState(false);
    const [imageURL, setImageURL] = useState("");

    // use refs
    const inputRef = useRef<HTMLLabelElement | null>(null);
    const image_Delete_ID = useRef("")
    const categoryID = useRef("");

    const submit = async (data: any) => {

        const formData = new FormData();
        if (data.image) {
            formData.append("image", data.image);
            formData.append('userId', userData?._id!);
            formData.append('folder', 'documentarium/tech');
        }
        if (data.name) {
            formData.append("name", data.name)
        }
        if (data.techType) {
            formData.append("techType", data.techType)
        }
        if (data.description) {
            formData.append("description", data.description)
        }
        if (data.deleteImage) {
            formData.append('removeImageId', data?.deleteImage.current)
        }

        if (isTechUpdate) {
            updateCategoryMutation.mutate(formData)
        } else {
            createCategoryMutation.mutate(formData)
        }

        setImageURL("");
        setValue("name", "");
        setValue("image", "");
        setValue("deleteImage", "");
        setIsTechUpdate(false);
        categoryID.current = "";
        image_Delete_ID.current = ""
    }


    const handleDeleteCategory = async (ID: string, categoryName: string) => {
        const flag = prompt(`Are you sure you want to delete the '${categoryName}' category? Please note that all products related to this category will also be deleted. Type 'YES' to confirm this action.`)
        if (flag !== "YES") {
            // toast({
            //     variant: "success",
            //     title: "Product not deleted"
            // })
            return
        }
        // deleteCategoryMutation.mutate({
        //     categoryID: ID,
        //     userID: userData?._id,
        //     token: userData?.token,
        // })

        setImageURL("");
        setValue("name", "");
        setValue("image", "");
        image_Delete_ID.current = ""
        setValue("deleteImage", "");
        setIsTechUpdate(false);
    };

    function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return;
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        setValue("image", file);
        setImageURL(url);
        e.target.value = "";
    }

    return <>
        <form className="my-10 mx-10" onSubmit={handleSubmit(submit)}>
            <div className="flex flex-col gap-2 mb-2">
                <div>
                    <Label
                        ref={inputRef}
                        htmlFor="technology"
                        className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
                    >
                        Technology
                    </Label>

                    <Input
                        id="technology"
                        {...register("name", {
                            required: true,
                        })}
                        className="w-full"
                        placeholder="Create Technology"
                    />
                </div>

                <div>
                    <Label
                        htmlFor="description"
                        className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
                    >
                        Description
                    </Label>
                    <Textarea
                        id="description"
                        {...register("description", {
                            required: true,
                        })}
                        className="w-full h-[80px]"
                        placeholder="description"

                    >
                    </Textarea>

                </div>

                <div>
                    <Label
                        htmlFor="description"
                        className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
                    >
                        Tech Type
                    </Label>
                    <select
                        className="w-full rounded-sm"
                        {...register("techType", {
                            required: true
                        })}
                    >
                        <option hidden={true} value="">Select Technology Type</option>
                        {technologyEnums?.map((tech, index) => (
                            <option key={tech + index} value={tech}>{tech}</option>
                        ))}

                    </select>
                </div>

                <div>
                    <section className="flex flex-col gap-2">
                        <h3>Image</h3>
                        <div>
                            {!imageURL && (
                                <div>
                                    <Input
                                        onChange={handleImage}
                                        type="file"
                                        className="w-full"
                                        accept="image/*"
                                    />
                                </div>
                            )}
                        </div>
                        {imageURL && (
                            <div className="flex flex-col items-center w-full">
                                <Image
                                    width={300}
                                    height={300}
                                    className="h-auto w-[40%] rounded-lg"
                                    src={imageURL}
                                    alt="image description"
                                />
                                <span
                                    onClick={() => {
                                        setImageURL("");
                                        if (isTechUpdate)
                                            setValue("deleteImage", image_Delete_ID);
                                        setValue("image", "");
                                    }}
                                    className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400"
                                >
                                    remove Image
                                </span>
                            </div>
                        )}
                    </section>
                </div>
            </div>

            <Button type="submit">{isTechUpdate ? "Update" : "Create"}</Button>

            {isTechUpdate && (
                <Button
                    onClick={() => {

                        setImageURL("");
                        setValue("name", "");
                        setValue("image", "");
                        image_Delete_ID.current = ""
                        setValue("deleteImage", "");
                        setIsTechUpdate(false);
                        categoryID.current = "";
                    }}
                    className="ml-2"
                >
                    Cancel
                </Button>
            )}
        </form>

        {technology?.map((techObj: any) => {
            return <div key={techObj?.techType} className="relative overflow-x-auto h-auto mx-10 my-8">
                <table className="w-full h-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <caption className="text-lg capitalize">{techObj?.techType}</caption>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Sr.No
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Technology
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Edit
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {techObj?.technologies?.map((tech: any, index: number) => (
                            <tr
                                key={tech?._id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                                <td
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4">{tech?.name}</td>
                                <td className="px-6 py-4">
                                    <svg
                                        onClick={() => {


                                            if (inputRef.current) {
                                                inputRef.current.scrollIntoView({ behavior: "smooth" });
                                                inputRef.current.focus({ preventScroll: true });
                                            }
                                            setIsTechUpdate(true);
                                            // setGender(category?.gender);
                                            setValue("name", tech?.name);
                                            categoryID.current = tech?._id;
                                            setImageURL(tech?.image?.secure_url || "");
                                            image_Delete_ID.current = tech?.image?.public_id
                                        }}
                                        className="cursor-pointer"
                                        width="25px"
                                        height="25px"
                                        viewBox="0 0 24.00 24.00"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        stroke="#000000"
                                        strokeWidth="0.192"
                                        transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"
                                    >
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                        <g
                                            id="SVGRepo_tracerCarrier"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        ></g>
                                        <g id="SVGRepo_iconCarrier">
                                            {" "}
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M8.56078 20.2501L20.5608 8.25011L15.7501 3.43945L3.75012 15.4395V20.2501H8.56078ZM15.7501 5.56077L18.4395 8.25011L16.5001 10.1895L13.8108 7.50013L15.7501 5.56077ZM12.7501 8.56079L15.4395 11.2501L7.93946 18.7501H5.25012L5.25012 16.0608L12.7501 8.56079Z"
                                                fill="#080341"
                                            ></path>
                                        </g>
                                    </svg>
                                </td>
                                <td className="px-6 py-4">
                                    <svg
                                        onClick={() => {
                                            handleDeleteCategory(tech?._id, tech?.name)
                                        }}
                                        width="25px"
                                        height="25px"
                                        viewBox="0 0 1024 1024"
                                        className="icon"
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="#000000"
                                        stroke="#000000"
                                    >
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                        <g
                                            id="SVGRepo_tracerCarrier"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        ></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path
                                                d="M667.8 362.1H304V830c0 28.2 23 51 51.3 51h312.4c28.4 0 51.4-22.8 51.4-51V362.2h-51.3z"
                                                fill="#CCCCCC"
                                            ></path>
                                            <path
                                                d="M750.3 295.2c0-8.9-7.6-16.1-17-16.1H289.9c-9.4 0-17 7.2-17 16.1v50.9c0 8.9 7.6 16.1 17 16.1h443.4c9.4 0 17-7.2 17-16.1v-50.9z"
                                                fill="#CCCCCC"
                                            ></path>
                                            <path
                                                d="M733.3 258.3H626.6V196c0-11.5-9.3-20.8-20.8-20.8H419.1c-11.5 0-20.8 9.3-20.8 20.8v62.3H289.9c-20.8 0-37.7 16.5-37.7 36.8V346c0 18.1 13.5 33.1 31.1 36.2V830c0 39.6 32.3 71.8 72.1 71.8h312.4c39.8 0 72.1-32.2 72.1-71.8V382.2c17.7-3.1 31.1-18.1 31.1-36.2v-50.9c0.1-20.2-16.9-36.8-37.7-36.8z m-293.5-41.5h145.3v41.5H439.8v-41.5z m-146.2 83.1H729.5v41.5H293.6v-41.5z m404.8 530.2c0 16.7-13.7 30.3-30.6 30.3H355.4c-16.9 0-30.6-13.6-30.6-30.3V382.9h373.6v447.2z"
                                                fill="#211F1E"
                                            ></path>
                                            <path
                                                d="M511.6 798.9c11.5 0 20.8-9.3 20.8-20.8V466.8c0-11.5-9.3-20.8-20.8-20.8s-20.8 9.3-20.8 20.8v311.4c0 11.4 9.3 20.7 20.8 20.7zM407.8 798.9c11.5 0 20.8-9.3 20.8-20.8V466.8c0-11.5-9.3-20.8-20.8-20.8s-20.8 9.3-20.8 20.8v311.4c0.1 11.4 9.4 20.7 20.8 20.7zM615.4 799.6c11.5 0 20.8-9.3 20.8-20.8V467.4c0-11.5-9.3-20.8-20.8-20.8s-20.8 9.3-20.8 20.8v311.4c0 11.5 9.3 20.8 20.8 20.8z"
                                                fill="#211F1E"
                                            ></path>
                                        </g>
                                    </svg>
                                </td>
                            </tr>
                        ))}
                    </tbody >

                </table >
            </div >
        })}
    </>

};

export default CreateTech


