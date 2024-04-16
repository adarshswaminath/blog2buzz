"use client"
import React from 'react'

function page({params: {hashtag}}) {
  return (
    <div className='min-h-screen'>page {hashtag}</div>
  )
}

export default page