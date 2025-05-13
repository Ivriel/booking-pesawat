"use client"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import React from 'react'


function FormAirplane() {
  return (
    <form action="" className='w-[40%] space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='code'>
            Kode Pesawat
          </Label>
          <Input placeholder='Kode Pesawat...' name='code' id='code' required/>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='code'>
            Nama Pesawat
          </Label>
          <Input placeholder='Nama Pesawat...' name='name' id='name' required/>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='code'>
            Upload Foto
          </Label>
          <Input type='file' placeholder='Upload Foto...' name='image' id='image' className='cursor-pointer' required/>
        </div>
        <Button className='w-full cursor-pointer'>Submit</Button>
    </form>
  )
}

export default FormAirplane