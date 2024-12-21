import React from "react";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ReactModel = ({ _id }: { _id: string }) => {
  const router = useRouter();
  const deleteDocument = async () => {
    console.log(process.env.NEXT_PUBLIC_API_END_POINT);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_END_POINT}/api/docs?_id=${_id}`,
        {
          method: "DELETE",
        }
      );
      console.log(res);
      if (res.ok) router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <MdDelete className="cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will permanently delete your document.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteDocument}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ReactModel;
