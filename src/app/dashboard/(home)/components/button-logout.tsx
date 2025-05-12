import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import React from 'react'
import { logout } from '../actions'

function ButtonLogout() {
    return (
        <div className="space-y-2">
            <form action={logout}>
                <Button type='submit' className="w-full justify-start cursor-pointer" variant={"destructive"}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
            </Button>
            </form>
        </div>
    )
}

export default ButtonLogout