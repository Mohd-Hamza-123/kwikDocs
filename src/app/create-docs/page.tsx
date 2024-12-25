"use client";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { GoXCircleFill } from "react-icons/go";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/hooks/hooks";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BookMarkInterface, docsInterface } from "@/models/docs.model";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Prism, RTE } from "../../index";
import { ComboboxDemo } from "@/components/ComboboxDemo";
import createDoc from "@/lib/API/docsAPI/createDoc";
import updateDoc from "@/lib/API/docsAPI/updateDoc";
import {
  overlayLoadingIsFalseReducer,
  overlayLoadingIsTrueReducer
} from "@/lib/store/features/overlayLoaderSlice";
import { setDoc } from "@/lib/store/features/docsSlice";

export interface I_Docs {
  title: string;
  description: string;
  techType: string;
  tags?: string[];
  bookmark?: BookMarkInterface[];
}

export interface I_FormInputs {
  title: string;
  tags: string[];
  techType: string;
  description: string;
  bookmark?: BookMarkInterface[];
}

const CreatePage = ({ post }: any) => {

  const router = useRouter();
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient();
  const tagRef = useRef<HTMLInputElement | null>(null)
  const [tags, setTags] = useState<string[]>(post?.tags || []);
  const [bookMark, setBookMark] = useState<BookMarkInterface[]>(post?.bookmark || []);
  console.log(bookMark);

  const {
    watch,
    control,
    setValue,
    register,
    getValues,
    handleSubmit,
  } =
    useForm<I_FormInputs>({
      defaultValues: {
        title: post?.title || "",
        description: post?.description || "",
        techType: String(post?.techType) || undefined,
        tags: post?.tags || undefined,
      },
    });


  const createDocumentQuery = useMutation({
    mutationFn: (doc: I_Docs) => createDoc(doc),
    onMutate: (variables) => {
      dispatch(overlayLoadingIsTrueReducer({ loadingMsg: "Documentent is uploading" }))
    },
    onError: (error: any, variables, context) => {
      toast({
        variant: "destructive",
        title: error?.message || "Document not uploaded"
      })
    },
    onSuccess: (data, variables, context) => {
     
      dispatch(setDoc({ document: data }))
      router.push(`/read-doc/${data?.techType}`);

    },
    onSettled: (data, error, variables, context) => {
      dispatch(overlayLoadingIsFalseReducer())
    },
  })

  const updateDocumentQuery = useMutation({
    mutationFn: (data: I_FormInputs) => updateDoc(data, post?._id),
    onMutate: (variables) => {
      dispatch(overlayLoadingIsTrueReducer({ loadingMsg: "Documentent is updating" }))
    },
    onError: (error, variables, context) => {
      toast({
        variant: "destructive",
        title: error?.message || "Document not updated"
      })
    },
    onSuccess: async (data, variables, context) => {

     
      dispatch(setDoc({ document: data }));
      await queryClient.setQueryData(['docs', data?.techType], (oldData: any) => {

        const newData = {
          ...oldData,
          pages: oldData?.pages?.map((page: any) => {
            return {
              ...page,
              payload: page?.payload?.map((doc: any) => {
                // Modify the payload if needed
                if (doc?._id === data?._id) {
                  // Update the document with new data
                  return {
                    ...doc,
                    ...data,
                  };
                }
                return doc;
              }),
            };
          }),
        };
        return newData
      })
      router.push(`/read-doc/${data?.techType}`);
    },
    onSettled: (data, error, variables, context) => {
      dispatch(overlayLoadingIsFalseReducer())
    },
  })



  const submit: SubmitHandler<I_FormInputs> = async (data) => {

    setBookMark((prevBookmark: any) => {
      const arr = prevBookmark.filter((bookmark: any) =>
        data.description.includes(bookmark.bookmarkID)
      );
      data.bookmark = arr
      return arr;
    });

    data.tags = tags

    if (!data?.title || !data?.techType) return;

    if (post) {
      updateDocumentQuery.mutate(data)
    } else {
      createDocumentQuery.mutate(data)
    }
  };

  const getBookMark = ({ bookmarkID, bookmarkName }: any) => {
    setBookMark((prev) => [...prev, { bookmarkID, bookmarkName }]);
  };

  const addTags = () => {
    if (!tagRef.current) return
    const value = tagRef.current?.value
    if (!value) return
    if (tags.includes(value)) {
      toast({
        variant: "destructive",
        title: 'Same tag not allowed'
      })
      return
    }
    setTags((prev) => [value.toLowerCase(), ...prev]);

    tagRef.current.value = ''
  }

  return (
    <>

      <main className="">
        <form className="w-full flex p-5 gap-2" onSubmit={handleSubmit(submit)}>
          <section className="w-[77%]">
            <div>
              <label htmlFor="Title" className="text-md block mt-3">
                Title
              </label>
              <Textarea
                id="Title"
                className="w-[100%] h-[100px]
              "
                {...register("title", { required: true })}
              />
            </div>
            <div className="mt-3">
              <RTE
                setBookMark={setBookMark}
                bookMark={bookMark}
                control={control}
                name="description"
                defaultValue={getValues("description")}
                getBookMark={getBookMark}
              />
            </div>
            <Prism />
          </section>
          <section className="w-[23%]">

            <div className="mt-9">
              <Controller
                name="techType"
                control={control}
                render={({ field }) => <ComboboxDemo {...field} />}
              />
            </div>
            <div className="mt-3">
              <div className="flex gap-1">
                <Input ref={tagRef} />
                <Button
                  variant={'outline'}
                  onClick={addTags}
                >Add</Button>
              </div>
              <ul className="flex gap-2 flex-start mt-2">
                {tags.map((tag: string, index: number) => {
                  return <li
                    key={tag}
                    className="border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground px-1 flex gap-1 items-center"
                  >
                    <span>{tag}</span>
                    <GoXCircleFill
                      onClick={() => {
                        setTags((prev) => prev.filter((prevTag) => prevTag !== tag))
                      }}
                      className="cursor-pointer" />
                  </li>
                })
                }
              </ul>
            </div>

            <Button className="w-full mt-4">Upload </Button>
          </section>
        </form>
      </main>
    </>
  );
};

export default CreatePage;
