"use client"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { useFormStatus } from "react-dom"
import { deleteAirplane } from "../lib/actions"


interface DeleteAirplaneProps {
    id:string
}

function SubmitButton() {
    const {pending} = useFormStatus()
    return (
        <Button size="sm" disabled={pending} type="submit" variant="destructive" className="cursor-pointer">
            <Trash className="mr-2 h-4 w-4"/>
            Hapus
        </Button>
    )
}

function DeleteAirplane({id}:DeleteAirplaneProps) {
  const deleteAirplaneWithId = deleteAirplane.bind(null,id)
  return (
    <form action={deleteAirplaneWithId}>
        <SubmitButton />
    </form>
  )
}

export default DeleteAirplane