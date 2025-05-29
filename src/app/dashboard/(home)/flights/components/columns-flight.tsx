"use client"
import { Airplane, Flight, FlightSeat } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";

export type FlightColumn = Flight & {
    plane:Airplane,
    seats:FlightSeat[]
}

export const columns: ColumnDef<FlightColumn>[] = [
    {
        accessorKey:'planeID',
        header:'Pesawat',
        cell:({row})=> {
            const flight = row.original
            return 'Pesawat'
        }
    },
      {
        accessorKey:'departureCity',
        header:'Rute',
        cell:({row})=> {
            const flight = row.original
            return 'Rute'
        }
    },
      {
        accessorKey:'price',
        header:'Price',
        cell:({row})=> {
            const flight = row.original
            return 'Price'
        }
    },
    {
        id: 'actions',
        header:'Actions',
        cell: ({ row }) => {
            const flight = row.original

            return (
                <div className="inline-flex gap-5 items-center">
                    <Button variant='secondary' size='sm' asChild >
                        <Link href={`/dashboard/flights/edit/${flight.id}`} >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                        </Link>
                    </Button>
                    {/* <DeleteAirplane id={plane.id}/> */}
                </div>
            )
        }
    }
]