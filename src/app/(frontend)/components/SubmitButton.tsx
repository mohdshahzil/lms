import { Button } from '@/components/ui/button'
import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
const SubmitButton = ({ loading, text }: { loading: boolean; text: string }) => {
  return (
    <Button
      type="submit"
      className="w-full rounded-md bg-white text-black hover:bg-zinc-200"
      disabled={loading}
    >
      {text}{" "}
      <AiOutlineLoading3Quarters className={`animate-spin ${loading ? 'black' : 'hidden'} `} />
    </Button>
  )
}

export default SubmitButton
