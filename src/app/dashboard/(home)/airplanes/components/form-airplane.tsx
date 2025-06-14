"use client"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import type { ActionResult } from '@/app/dashboard/(auth)/signin/form/actions'
import { useFormState} from 'react-dom'
import { saveAirplane, updateAirplane } from '../lib/actions'
import type { Airplane } from '@prisma/client'
import SubmitButtonForm from '../../components/submit-form-button'

interface FormAirplaneProps{
  type?:"ADD" | "EDIT"
  defaultValues?:Airplane | null // akan dapat data atau tidak (null)
}

const initialFormState: ActionResult = {
    errorTitle: null,
    errorDesc: []
}


function FormAirplane({type,defaultValues}:FormAirplaneProps) {
  const updateAirplaneWithId =  (_state:ActionResult,formData:FormData)=> updateAirplane(null,defaultValues?.id!!,formData)
  const [state, formAction] = useFormState(type==="ADD" ?saveAirplane:updateAirplaneWithId, initialFormState)
  return (
    <form action={formAction} className='w-[40%] space-y-4'>
       {state.errorTitle !== null && (
                    <div className='my-7 bg-red-500  p-4 rounded-lg text-white'>
                        <div className='font-bold mb-4'>{state.errorTitle}</div>
                        <ul className='list-disc list-inside'>
                            {state.errorDesc?.map((value, index) => (
                                <li key={index+value}>{value}</li>
                            ))}
                        </ul>
                    </div>
                )}
        <div className='space-y-2'>
          <Label htmlFor='code'>
            Kode Pesawat
          </Label>
          <Input placeholder='Kode Pesawat...' name='code' id='code' defaultValue={defaultValues?.code} required/>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='code'>
            Nama Pesawat
          </Label>
          <Input placeholder='Nama Pesawat...' name='name' id='name' defaultValue={defaultValues?.name} required/>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='code'>
            Upload Foto
          </Label>
          <Input type='file' placeholder='Upload Foto...' name='image' id='image' className='cursor-pointer'/>
        </div>
        <SubmitButtonForm/>
    </form>
  )
}

export default FormAirplane