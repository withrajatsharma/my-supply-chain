'use client';

import { Button } from '@/components/ui/button'
import React from 'react'
import { useRouter } from 'next/navigation'

const page = () => {

  const {push} = useRouter();

  return (
    <div className=' flex justify-center gap-5   pt-20 w-full h-screen'>

      <Button 
        onClick={()=>{push('/signup')}}
      variant={'secondary'} className='bg-slate-200 hover:bg-slate-100' >Sign Up</Button>
      <Button
        onClick={()=>{push('/login')}}
      >Login</Button>

    </div>
  )
}

export default page