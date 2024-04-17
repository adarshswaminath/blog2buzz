"use client"

import Lottie from 'lottie-react'
import React from 'react'
import Animation from "@/public/AnimationData.json"

function Loading() {
  return (
    <div className='min-h-screen flex flex-col items-center'>
      <Lottie animationData={Animation} className='h-[30rem]'></Lottie>
      <h3 className='text-[#248AE9] text-2xl font-bold'>Web Scraping Started! Please wait..</h3>
    </div>
  )
}

export default Loading