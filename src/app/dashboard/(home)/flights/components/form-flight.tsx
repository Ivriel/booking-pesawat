"use client"
import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


function FormFlight() {
    return (
        <form action="">
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
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
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
        </form>
    )
}

export default FormFlight