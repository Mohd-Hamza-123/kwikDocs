"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { LoadingPage } from "@/index";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
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

  const div = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [showChatIcon, setShowChatIcon] = useState(false);

  const {
    data: technology = [],
    isError,
    error: technologyError,
    isPending: technologyPending,
    isSuccess: technologySuccess,
  } = useQuery({
    queryKey: ["technologies"],
    queryFn: getAllTechnology,
    staleTime: Infinity,
  });

  const handleLearn = (tech: any) => {
    const name = tech?.name?.toLowerCase();
    router.push(`/docs/${name}`);
  };

  useEffect(() => {
    handleScroll();
    div.current?.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowChatIcon(true);
    } else {
      setShowChatIcon(false);
    }
  };

  if (technologyPending) return <LoadingPage />;

  if (technologySuccess)
    return (
      <div ref={div} className="dark:bg-bgDark bg-gray-100 flex flex-col gap-5">
        {/* {!showChatIcon && (
          <Button
            variant="outline"
            className="rounded-full w-[50px] h-[50px] fixed bottom-5 right-6 transition-transform hover:scale-110"
          >
            <svgIcons.message className="dark:fill-white" />
          </Button>
        )} */}
        {technology?.map((techObj: any) => {
          return (
            <section key={techObj?.techType}
              className="flex flex-col gap-5">
                
              <h1 className="text-2xl lg:text-2xl text-center capitalize font-cursive">
                {techObj?.techType}
              </h1>

              {techObj?.technologies?.map((tech: any, index: number) => (
                <div
                  key={tech?._id + index}
                  className={`dark:bg-gradient-to-br dark:from-[#1e1e1e] dark:via-[#121212] dark:to-[#2c2c2c] bg-gradient-to-br from-gray-100 via-white to-gray-200 shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-xl w-[94%] lg:w-[70%] mx-auto flex flex-col md:flex-row ${index % 2 == 0 ? 'md:flex-row-reverse' : ''} items-center`}>

                  <div className="lg:w-[35%] w-full p-3 h-full flex items-center">
                    <Image
                      className="object-cover w-full rounded-sm"
                      src={tech?.image?.secure_url}
                      alt={`${tech?.name} Image`}
                      quality={100}
                      priority={true}
                      width={100}
                      height={100}
                    />
                  </div>

                  <div className="p-5 w-full lg:w-[65%]">
                    <h2 className="mb-2 text-xl lg:text-2xl font-semibold text-center">
                      {tech?.name}
                    </h2>
                    <p className="mb-4 text-base text-gray-500 text-justify">
                      {tech?.description}
                    </p>
                    <Button
                      className="w-full px-4 py-2 text-lg font-medium text-white bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 rounded-lg shadow-md hover:shadow-lg hover:from-pink-600 hover:via-red-500 hover:to-orange-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300"
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
      <h1 className="text-center capitalize font-bold dark:bg-bgDark bg-gray-100">
        No Documents Found. Please Check Your Internet Connection
      </h1>
    );
};

export default Technologies;
