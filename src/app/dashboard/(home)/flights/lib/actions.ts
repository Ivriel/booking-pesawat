"use server"

import { ActionResult } from "@/app/dashboard/(auth)/signin/form/actions";
import { redirect } from "next/navigation";

export async function saveFlight(
    prevState:unknown,
    formData:FormData
):Promise<ActionResult> {
    console.log(formData.get('planeId'));
    redirect('/dashboard/flights/create')
}