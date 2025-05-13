"use server"
import type { ActionResult } from "@/app/dashboard/(auth)/signin/form/actions";
import { airplaneFormSchema } from "./validation";
import { redirect } from "next/navigation";
import { deleteFile, uploadFile } from "@/lib/supabase";
import prisma from "../../../../../../lib/prisma";
import { revalidatePath } from "next/cache";
import { error } from "console";

export async function getAirplaneById(id: string) {
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


export async function saveAirplane(prevState: any, formData: FormData): Promise<ActionResult> {
    const values = airplaneFormSchema.safeParse({
        name: formData.get("name"),
        image: formData.get("image"),
        code: formData.get("code")
    })
    if (!values.success) {
        const errorDesc = values.error.issues.map(issue => issue.message)
        return {
            errorTitle: 'Error Validation',
            errorDesc
        }
    }

    const uploadedFile = await uploadFile(values.data.image)
    console.log(uploadedFile)
    if (uploadedFile instanceof Error) {
        return {
            errorTitle: 'Failed to upload file',
            errorDesc: ['Terjadi masalah saat upload. Coba lagi']
        }
    }
    try {
        const data = await prisma.airplane.create({
            data: {
                name: values.data.name,
                code: values.data.code,
                image: uploadedFile as string
            }
        })
    } catch (error) {
        console.log(error)
        return {
            errorTitle: 'Failed to insert data',
            errorDesc: ['Terjadi masalah saat upload, silahkan coba lagi']
        }
    }
    revalidatePath('/dashboard/airplanes') // agar kembali get data dari database
    redirect('/dashboard/airplanes')
}

export async function updateAirplane(
    prevState: string,
    id: string,
    formData: FormData
): Promise<ActionResult> {
    const image = formData.get("image") as File
    let airplaneFormSchemaUpdate;
    if (image.size === 0) {
        airplaneFormSchemaUpdate = airplaneFormSchema.omit({ image: true })
    } else {
        airplaneFormSchemaUpdate = airplaneFormSchema
    }

    const values = airplaneFormSchema.safeParse({
        name: formData.get("name"),
        image: formData.get("image"),
        code: formData.get("code")
    })
    if (!values.success) {
        const errorDesc = values.error.issues.map(issue => issue.message)
        return {
            errorTitle: 'Error Validation',
            errorDesc
        }
    }

    let filename:unknown;

    if (image.size > 0) {
        const uploadedFile = await uploadFile(image)
        if (uploadedFile instanceof Error) {
            return {
                errorTitle: 'Failed to upload file',
                errorDesc: ['Terjadi masalah saat upload. Coba lagi']
            }
        }
        filename = uploadedFile as string
    } else {
        const airplane= await prisma.airplane.findFirst({
            where: {
                id
            },
            select: {
                image:true
            }
        })
        filename = airplane?.image
    }
    try {
        await prisma.airplane.update({
            where: {
                id
            },
            data: {
                name:values.data.name,
                code:values.data.code,
                image:filename as string
            }
        })
    } catch (error) {
        return {
            errorTitle:"Failed to update data",
            errorDesc:["Terjadi masalah pada koneksi. silahkan coba lagi"]
        }
    }
    revalidatePath('/dashboard/airplanes') // agar kembali get data dari database
    redirect('/dashboard/airplanes')
}

export async function deleteAirplane(id:string):Promise<ActionResult | undefined> {
    const data = await prisma.airplane.findFirst({
        where: {
            id
        }
    })
    if(!data) {
        return {
            errorTitle:'Data not found',
            errorDesc:[]
        }
    }
    const deletedFile= await deleteFile(data?.image)
    if(deletedFile instanceof Error) {
        return {
            errorTitle:'Failed to delete file',
            errorDesc:['Terjadi masalah saat menghapus. Silahkan coba lagi']
        }
    }

    try {
        await prisma.airplane.delete({
            where:{
                id
            }
        })
    } catch (error) {
        console.log(error)
        return {
            errorTitle:'Gagal menghapus data',
            errorDesc:['Gagal saat menghapus data, coba lagi']
        }
    }
    revalidatePath("/dashboard/airplanes")
}