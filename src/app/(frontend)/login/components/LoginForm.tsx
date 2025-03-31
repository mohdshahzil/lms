'use client'

import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FormEvent, useState } from 'react'
import SubmitButton from '../../components/SubmitButton'
import { login, LoginResponse } from '../actions/login'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsPending(true)
    setError(null)
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const result: LoginResponse = await login({ email, password })

    setIsPending(false)
    if (result.success) {
      router.push('/dashboard')
    } else {
      setError(result.error || 'An error ocurred')
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <Card className="w-full max-w-md bg-black text-white border-none shadow-none">
        <CardContent className="p-6">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                className="rounded-md bg-zinc-900 text-white border-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                className="rounded-md bg-zinc-900 text-white border-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <SubmitButton loading={isPending} text="Login"></SubmitButton>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
