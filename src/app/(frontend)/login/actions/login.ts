// 'use server'

// import { getPayload } from 'payload'
// import config from '@payload-config'
// import { cookies } from 'next/headers'
// import { auth, currentUser } from '@clerk/nextjs/server'

// export interface LoginResponse {
//   success: boolean
//   error?: string
// }

// export async function login(): Promise<LoginResponse> {
//   const payload = await getPayload({ config })
//   const authData = await auth()

//   if (!authData?.userId) {
//     return { success: false, error: 'User not authenticated' }
//   }

//   try {
//     // Get the current user from Clerk
//     const user = await currentUser()

//     if (!user || !user.emailAddresses?.[0]?.emailAddress) {
//       return { success: false, error: 'Email not found in Clerk' }
//     }

//     const clerkId = user.id // Clerk's unique user ID
//     const email = user.emailAddresses[0].emailAddress

//     // Check if user exists in PayloadCMS
//     const existingUser = await payload.find({
//       collection: 'customers',
//       where: { clerkId: { equals: clerkId } },
//     })

//     if (!existingUser.docs.length) {
//       // If user does not exist, create them in PayloadCMS
//       await payload.create({
//         collection: 'customers',
//         data: {
//           clerkId,
//           email,
//         },
//       })
//     }

//     // Set Clerk session token as a cookie for secure auth
//     const cookieStore = await cookies()
//     await cookieStore.set('clerk-session', authData.sessionId, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       path: '/',
//     })

//     return { success: true }
//   } catch (error) {
//     console.error('Login Error', error)
//     return { success: false, error: 'An error occurred' }
//   }
// }

'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { cookies } from 'next/headers'
import { auth, currentUser } from '@clerk/nextjs/server'

interface LoginResponse {
  success: boolean
  error?: string
}

export async function login(): Promise<LoginResponse> {
  try {
    const payload = await getPayload({ config })
    const { userId } = await auth() // Get the Clerk user ID

    if (!userId) {
      return { success: false, error: 'User not authenticated' }
    }

    const user = await currentUser() // Get full user data from Clerk

    if (!user) {
      return { success: false, error: 'Failed to fetch Clerk user data' }
    }

    // Extract email properly
    const email = user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress

    if (!email) {
      console.error('Email not found for user:', user)
      return { success: false, error: 'Email is required' }
    }

    // Check if user already exists in PayloadCMS
    const existingUser = await payload.find({
      collection: 'customers',
      where: { clerkId: { equals: userId } },
    })

    if (!existingUser.docs.length) {
      // If user doesn't exist, create it in PayloadCMS
      await payload.create({
        collection: 'customers',
        data: { clerkId: userId, email },
      })
    }

    // Set authentication token in cookies
    const cookieStore = await cookies()
    await cookieStore.set('clerk-token', userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    })

    return { success: true }
  } catch (error) {
    console.error('Login Error:', error)
    return { success: false, error: 'An error occurred during login' }
  }
}
