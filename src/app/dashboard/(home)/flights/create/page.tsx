import React from 'react'
import type { Metadata } from 'next'
import FormFlight from '../components/form-flight'

export const metadata:Metadata = {
    title:'Dashboard | Create data flight'
}

function CreateFlightPage() {
    return (
        <div>
            <div className="flex flex-row items-center justify-between">
                <div className="my-5 text-2xl font-bold">Tambah Data Flight</div>
            </div>
            <FormFlight />   
        </div>
    )
}

export default CreateFlightPage