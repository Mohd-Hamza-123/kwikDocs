"use client";
import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { LoadingPage } from "@/index";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "@/lib/hooks/hooks";
import { setDoc } from "@/lib/store/features/docsSlice";
import { getAllTechnology } from "@/lib/API/techAPI/getAllTech";

export interface I_Image {
  public_id: string;
  secure_url: string;
}
export interface I_Language {
  _id: string;
  name: string;
  image: I_Image;
  techType: string;
  description: string;
}

const Technologies = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    data: technology = [],
    isError,
    error: technologyError,
    isPending: technologyPending,
    isSuccess: technologySuccess,
    isFetching: technologyFetching,
    refetch,
  } = useQuery({
    queryKey: ["technologies"],
    queryFn: getAllTechnology,
    staleTime: Infinity,
  });

  const handleLearn = (tech : any) => {
    console.log(tech)
    const name = tech?.name?.toLowerCase()
    console.log(name)
    router.push(`/docs/${name}`);
    // router.push(`/read-doc/${tech?._id}`)
    // dispatch(setDoc({ document: null }));
  };

  if (technologyPending) return <LoadingPage />;

  if (technologySuccess)
    return (
      <div className="dark:bg-bgDark bg-gray-100">
        {technology?.map((techObj: any) => {
        
          return (
            <section key={techObj?.techType}>
              <h1 className="text-2xl lg:text-3xl text-center capitalize font-cursive">
                {techObj?.techType}
              </h1>
              {techObj?.technologies?.map((tech: any, index: number) => (
                <div
                  key={tech?._id + index}
                  className={`dark:bg-containerDark rounded-lg bg-white shadow-md my-6 dark:text-white p-5 w-[94%] lg:w-[70%] mx-auto flex flex-col lg:flex-row ${
                    (index + 1) % 2 === 0 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className="lg:w-[40%] w-full flex justify-center items-center">
                    <Image
                      className={`rounded-md object-contain h-full w-full object-center`}
                      src={tech?.image?.secure_url}
                      alt={`${tech?.name} Image`}
                      height={200}
                      width={200}
                      quality={100}
                      priority={true}
                    />
                  </div>
                  <div className="flex justify-around flex-col lg:w-[60%] w-full p-3">
                    <h2 className="mb-2 text-2xl lg:text-3xl font-medium leading-tight text-center">
                      {tech?.name}
                    </h2>
                    <p className="mb-4 text-base text-gray-500 text-justify">
                      {tech?.description}
                    </p>
                    <Button
                      variant={"outline"}
                      onClick={() => handleLearn(tech)}
                    >
                      Learn {tech?.name}
                    </Button>
                  </div>
                </div>
              ))}
            </section>
          );
        })}
      </div>
    );

  if (isError)
    return (
      <h1 className="text-center capitalize font-bold mt-3">
        No Documents Found . Please Check Your Internet Connection
      </h1>
    );
};

export default Technologies;
