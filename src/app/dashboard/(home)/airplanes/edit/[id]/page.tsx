import React from 'react'
import FormAirplane from '../../components/form-airplane'
import { getAirplaneById } from '../../lib/actions'

type Params = {//membuat props
id:string
}

interface EditAirplanePageProps {
    params:Params
}

async function EditAirplanePage({params}:EditAirplanePageProps) {
    const data = await getAirplaneById(params.id)
    return (
        <div>
            <div className="flex flex-row items-center justify-between">
                <div className="my-5 text-2xl font-bold">Edit Data Airplane</div>
            </div>
            <FormAirplane type='EDIT' defaultValues={data}/>
        </div>

    )
}

export default EditAirplanePage