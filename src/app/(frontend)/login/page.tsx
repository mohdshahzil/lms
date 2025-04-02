// 'use client' // Ensure this runs on the client side

// import React, { useEffect } from 'react'
// import { SignInButton, SignUpButton, SignedIn, SignedOut, useAuth } from '@clerk/nextjs'
// import { useRouter } from 'next/navigation'

// const Login = () => {
//   const { isSignedIn } = useAuth() // Get authentication status
//   const router = useRouter()

//   useEffect(() => {
//     if (isSignedIn) {
//       router.push('/dashboard') // Redirect to dashboard when signed in
//     }
//   }, [isSignedIn, router])

//   return (
//     <div>
//       <SignedOut>
//         <SignInButton />
//         <SignUpButton />
//       </SignedOut>
//     </div>
//   )
// }

// export default Login

'use client'

import { useEffect } from 'react'
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton, useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { login } from './actions/login' // Import server action

export default function Login() {
  const { isSignedIn } = useAuth()
  const router = useRouter()

  // useEffect(() => {
  //   const authenticateUser = async () => {
  //     if (isSignedIn) {
  //       const response = await login()

  //       if (response.success) {
  //         router.push('/dashboard') // Redirect on success
  //       } else {
  //         console.error(response.error || 'Unknown error occurred')
  //       }
  //     }
  //   }

  //   authenticateUser()
  // }, [isSignedIn, router])

  useEffect(() => {
    async function authenticateUser() {
      if (isSignedIn) {
        const response = await login()

        if (response.success) {
          router.push('/dashboard') // Redirect on success
        } else {
          console.error(response.error || 'Unknown error occurred') // Handle cases where error is undefined
        }
      }
    }

    authenticateUser()
  }, [isSignedIn, router])

  return (
    <div>
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  )
}
