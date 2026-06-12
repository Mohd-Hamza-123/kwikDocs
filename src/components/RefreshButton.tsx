"use client";

import { revalidateTechStack } from "@/app/actions/revalidateTechStack";
import { useRouter } from "next/navigation";

export default function RefreshButton() {
  const router = useRouter();

  const handleRefresh = async () => {
    await revalidateTechStack();
    router.refresh();
  };

  return <button onClick={handleRefresh}>Refresh Data</button>;
}