"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/hooks/hooks";
import { Textarea } from "@/components/ui/textarea";
import { appendDocs } from "@/lib/features/docsSlice";
import { useForm, Controller } from "react-hook-form";
import { ComboboxDemo } from "@/components/ComboboxDemo";
import { RTE, ImageUpload, Prism } from "../../index";
import { useMutation } from "@tanstack/react-query";
import { createDoc, updateDoc } from "@/lib/API/createDoc";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { GoXCircleFill } from "react-icons/go";

export interface I_Docs {
  title: string;
  description: string;
  image?: string;
  category: string;
  tags?: string[];
  bookmark?: BookMarkInterface[];
}

interface BookMarkInterface {
  bookmarkID: string;
  bookmarkName: string;
}

const CreatePage = ({ post }: any) => {
  const router = useRouter();
  const tagRef = useRef<HTMLInputElement | null>(null)
  const [tags, setTags] = useState<string[]>(post?.tags || []);

  const { handleSubmit, register, control, watch, setValue, getValues } =
    useForm<I_Docs>({
      defaultValues: {
        title: post?.title || "",
        description: post?.description || "",
        category: post?.category || null,
        tags: post?.tags || undefined,
      },
    });

  const [bookMark, setBookMark] = useState<BookMarkInterface[]>(
    post ? post?.bookmark : []
  );

  const createDocumentQuery = useMutation({
    mutationFn: (doc: I_Docs) => createDoc(doc),
    onMutate: (variables) => {

    },
    onError: (error, variables, context) => {

    },
    onSuccess: (data, variables, context) => {
      console.log(data);
      router.push(`/read-doc/${data?._id}`);
    },
    onSettled: (data, error, variables, context) => {

    },
  })

  const updateDocumentQuery = useMutation({
    // mutationFn: (doc: any, id: any) => updateDoc(doc, id),
    onMutate: (variables) => {

    },
    onError: (error, variables, context) => {

    },
    onSuccess: (data, variables, context) => {

    },
    onSettled: (data, error, variables, context) => {

    },
  })

  const submit = async (data: any) => {
    setBookMark((prevBookmark: any) => {
      const arr = prevBookmark.filter((bookmark: any) =>
        data.description.includes(bookmark.bookmarkID)
      );
      data.bookmark = arr
      return arr;
    });

    data.tags = tags
    // console.log(data);
    // return;
    if (!data.title || !data.category) return;

    if (post) {
      updateDocumentQuery.mutate(data, post?._id)
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
            <div>
              <Controller
                name="image"
                control={control}
                render={({ field }: any) => <ImageUpload {...field} />}
              />
            </div>

            <div className="mt-3">
              <Controller
                name="category"
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
