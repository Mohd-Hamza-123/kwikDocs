// app/actions/revalidateTechStack.ts
"use server";

import { revalidatePath } from "next/cache";

export async function revalidateTechStack() {
  revalidatePath("/tech-stack");
}