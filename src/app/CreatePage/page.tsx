"use client";
import Prism from "@/components/Prism";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/hooks/hooks";
import { Textarea } from "@/components/ui/textarea";
import { appendDocs } from "@/lib/features/docsSlice";
import { useForm, Controller } from "react-hook-form";
import { ComboboxDemo } from "@/components/ComboboxDemo";
import { RTE, MultiSelect, ImageUpload } from "../../index";

interface FormValues {
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string;
  bookmark: BookMarkInterface[];
}

interface BookMarkInterface {
  bookmarkID: string;
  bookmarkName: string;
}

const CreatePage = ({ post }: any) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  // const docs = useAppSelector((state) => state.docsSlice.docsData);
  const { handleSubmit, register, control, watch, setValue, getValues } =
    useForm<FormValues>({
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
  console.log(bookMark);
  const submit = async (data: any) => {
    setBookMark((prevBookmark: any) => {
      const arr = prevBookmark.filter((bookmark: any) =>
        data.description.includes(bookmark.bookmarkID)
      );
      data.bookmark = arr
      return arr;
    });
    console.log(data);
    // return;
    if (!data.title || !data.category) return;

    if (post) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_END_POINT}api/docs/${post?._id}`,
          {
            method: "PUT",
            cache: "no-store",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        console.log(res);
        if (!res.ok) {
          throw new Error("Updation faild");
        } else {
          router.push("/");
        }
      } catch (error) {
        console.log("Error in upadtion");
      }
    } else {
      try {
        // console.log("data fetching");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_END_POINT}/api/docs`, {
          cache: "no-cache",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        console.log("Response status:", res.status);

        if (res.ok) {
          dispatch(appendDocs({ docsData: data }));
          router.push("/");
        } else {
          console.log("NOt created");
          router.push("/");
        }
      } catch (error) {
        console.error("Error creating docs:", error);
        router.push("/");
      }
    }
  };

  const getBookMark = ({ bookmarkID, bookmarkName }: any) => {
    setBookMark((prev) => [...prev, { bookmarkID, bookmarkName }]);
  };

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
              <Controller
                name="tags"
                control={control}
                render={({ field }) => <MultiSelect {...field} />}
              />
            </div>

            <Button className="w-full mt-4">Upload </Button>
          </section>
        </form>
      </main>
    </>
  );
};

export default CreatePage;
