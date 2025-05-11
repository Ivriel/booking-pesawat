import React from 'react'
import { Metadata } from 'next'
import FormSignIn from './form'

export const metadata:Metadata = {
    title:"Dashboard | Sign In"
}

function SignInPage() {
  
  return (
   <FormSignIn />
  )
}

export default SignInPage