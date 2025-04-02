'use client' // Ensure this runs on the client side

import React, { useEffect } from 'react'
import { SignInButton, SignUpButton, SignedIn, SignedOut, useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

const Login = () => {
  const { isSignedIn } = useAuth() // Get authentication status
  const router = useRouter()

  useEffect(() => {
    if (isSignedIn) {
      router.push('/dashboard') // Redirect to dashboard when signed in
    }
  }, [isSignedIn, router])

  return (
    <div>
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
    </div>
  )
}

export default Login
