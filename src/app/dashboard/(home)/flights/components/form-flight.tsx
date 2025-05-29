"use client"
import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import SubmitButtonForm from '../../components/submit-form-button'
import { Airplane } from '@prisma/client'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { saveFlight } from '../lib/actions'
import { useFormState } from 'react-dom'
import { ActionResult } from '@/app/dashboard/(auth)/signin/form/actions'

interface FormFlightProps {
    airplanes:Airplane[]
}

const initialFormState:ActionResult = {
    errorTitle:null,
    errorDesc:[]
}

function FormFlight({airplanes}:FormFlightProps) {
    const [state,formAction] = useFormState(saveFlight,initialFormState)
    return (
        <form action={formAction} className='space-y-6'>
            <div className="grid grid-cols-2 gap-4">
                <div className='space-y-2'>
                    <Label htmlFor='code'>
                        Pilih pesawat
                    </Label>
                    <Select name='planeId'>
                        <SelectTrigger id='planeId' className='w-full'>
                            <SelectValue placeholder="Pilih pesawat" />
                        </SelectTrigger>
                        <SelectContent>
                           {airplanes.map((value)=> (
                            <SelectItem key={value.id} value={value.id}>{value.name}</SelectItem>
                           ))}
                        </SelectContent>
                    </Select>

                </div>
                <div className='space-y-2'>
                    <Label htmlFor='price'>
                        Harga tiket
                    </Label>
                    <Input type='number' placeholder='Harga tiket...' name='price' id='price' min={0} required />
                    <span className='text-xs text-red-600'>
                        Harga untuk kelas business bertambah Rp 500.000 & kelas first bertambah Rp 750.000
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
            <div className='space-y-2'>
                    <Label htmlFor='departureCity'>
                        Kota Keberangkatan
                    </Label>
                    <Input placeholder='Kota Keberangkatan...' name='departureCity' id='departureCity' required />
                </div>
            <div className='space-y-2'>
                    <Label htmlFor='departureDate'>
                       Tanggal Keberangkatan
                    </Label>
                    <Input type='datetime-local' className='block' placeholder='Tanggal Keberangkatan...' name='departureDate' id='departureDate' required />
            </div>
            <div className='space-y-2'>
                    <Label htmlFor='departureCityCode'>
                        Kode Kota
                    </Label>
                    <Input placeholder='Kode kota...' name='departureCityCode' id='departureCityCode' required />
            </div>
         </div>
         <div className="grid grid-cols-3 gap-4">
            <div className='space-y-2'>
                    <Label htmlFor='destinationCity'>
                        Kota Tujuan
                    </Label>
                    <Input placeholder='Kota Tujuan...' name='destinationCity' id='destinationCity' required />
                </div>
            <div className='space-y-2'>
                    <Label htmlFor='arrivalDate'>
                       Tanggal Tiba
                    </Label>
                    <Input type='datetime-local' className='block' placeholder='Tanggal Tiba...' name='arrivalDate' id='arrivalDate' required />
            </div>
            <div className='space-y-2'>
                    <Label htmlFor='destinationCityCode'>
                        Kode Kota 
                    </Label>
                    <Input placeholder='Kode kota...' name='destinationCityCode' id='destinationCityCode' required />
            </div>
         </div>
         <SubmitButtonForm />
        </form>
    )
}

export default FormFlight