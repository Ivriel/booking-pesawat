"use server"

import type { ActionResult } from "@/app/dashboard/(auth)/signin/form/actions";
import { airplaneFormSchema } from "./validation";
import { redirect } from "next/navigation";
import { uploadFile } from "@/lib/supabase";
import prisma from "../../../../../../lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAirplaneById(id:string) {
    try {
        const data = await prisma.airplane.findFirst({// get data dari database 
            where: {
                id
            }
        })
        return data 
    } catch (error) {
        console.log(error)
        return null
    }
}


export async function saveAirplane(prevState:any,formData:FormData):Promise<ActionResult>{
    const values = airplaneFormSchema.safeParse({
        name:formData.get("name"),
        image:formData.get("image"),
        code:formData.get("code")
    })
    if(!values.success) {
        const errorDesc = values.error.issues.map(issue=> issue.message)
        return {
            errorTitle:'Error Validation',
            errorDesc
        }
    }

    const uploadedFile = await uploadFile(values.data.image)
    console.log(uploadedFile)
    if(uploadedFile instanceof Error) {
        return {
            errorTitle:'Failed to upload file',
            errorDesc:['Terjadi masalah saat upload. Coba lagi']
        }
    }
    try {
        const data = await prisma.airplane.create({
            data: {
                name:values.data.name,
                code:values.data.code,
                image:uploadedFile as string
            }
        })
    } catch (error) {
        console.log(error)
        return {
            errorTitle:'Failed to insert data',
            errorDesc:['Terjadi masalah saat upload, silahkan coba lagi']
        }
    }
    revalidatePath('/dashboard/airplanes') // agar kembali get data dari database
    redirect('/dashboard/airplanes')
}