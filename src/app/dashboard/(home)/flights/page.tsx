import React from 'react'
import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { DataTable } from '@/components/ui/data-table'
import {columns} from "./components/columns-flight"
import { getFlights } from './lib/data'

export const metadata: Metadata = {
    title: 'Dashboard | Flights'
}

async function FlightPage() {
    const data = await getFlights()
    return (
        <>
            <div className="flex flex-row items-center justify-between">
                <div className="my-5 text-2xl font-bold">Flights</div>
                <Button asChild>
                    <Link href={'/dashboard/flights/create'}>
                        <Plus className='mr-2 h-4 w-4' />
                        Tambah Data
                    </Link>
                </Button>
            </div>
            <DataTable columns={columns} data={data} />
        </>

    )
}

export default FlightPage