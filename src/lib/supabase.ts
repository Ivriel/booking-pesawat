import { createClient } from '@supabase/supabase-js'

const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""
const NEXT_PUBLIC_SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? ""

const supabase = createClient(
    NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_KEY
)

export const uploadFile = async (file: File) => {
    try {
        const filename = `${Date.now()}.png`
        const { error } = await supabase
            .storage
            .from('imageupload') // bucket supabase. Bucket nya jangan lupa policies nya setting enabled semua baik storage dan lainnya 
            .upload(`public/airplanes/${filename}`, file, { // dan jangan lupa bucketnya setting ke public
                cacheControl: '3600',
                upsert: false
            })
            if(error) { 
                throw new Error(error.message)
            }
            return filename;
    } catch (error) {
       console.log(error)
       return error
    }
}

export const getUrlFile = (filename:string) => {
    const { data } = supabase
  .storage
  .from('imageupload') // nama bucket supabase
  .getPublicUrl(`public/airplanes/${filename}`)
  
  return data.publicUrl;
}