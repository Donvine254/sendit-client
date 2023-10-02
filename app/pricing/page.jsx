'use client'
import React from 'react'
import { useAppContext } from '@/context/context'
// import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

import Image from 'next/image'
// import { Button } from '@/components'
// const {getUser}=getKindeServerSession()
// const user=getUser()
// console.log(user)
export default function Page() {
  const context =useAppContext()
  console.log(context)
  return (
    <div className='m-2 mx-4'>
     <div className="card w-96 bg-base-200 shadow-xl mt-4">
  <figure className="px-10 pt-10">
    <Image src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="Shoes" className="rounded-xl h-fit w-fit" height={1000} width={667}  />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div className="card-actions">
      {/* <Button/> */}
    </div>
  </div>
</div>
    </div>
  )
}
