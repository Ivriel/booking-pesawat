import React from 'react'
import type { Metadata } from 'next'
import FormFlight from '../components/form-flight'
import { getAirplanes } from '../../airplanes/lib/data'

export const metadata:Metadata = {
    title:'Dashboard | Create data flight'
}

async function CreateFlightPage() {
    const airplanes = await getAirplanes()

    return (
        <div>
            <div className="flex flex-row items-center justify-between">
                <div className="my-5 text-2xl font-bold">Tambah Data Flight</div>
            </div>
            <FormFlight airplanes={airplanes}/>   
        </div>
    )
}

export default CreateFlightPage