"use client"

import Loading from '@/app/Components/Loading'
import React, { useEffect, useState } from 'react'
import DetailedView from './DetailedView'

export default function page({params}) {
  const [response,setResponse] = useState()
    // ? url contains username and the tile of the blog so created two dynamic routes
    const fullUrl = `${params.username}/${params.title}`
  // ** function to perform api call
  async function makeTheApiCall(){
    const response = await fetch("/api/details",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: fullUrl })
    })
    if(!response.ok){
      throw new Error("API CALL FAILED")
    }
    const data = await response.json()
    setResponse(data.data)
  }
  useEffect(() => {
    window.scrollTo(0,0)
    makeTheApiCall()
  },[])
console.log(response)
  return (
    <div className='min-h-screen p-4'>
      {response ? (
        // * body of the page after api response got it
        <DetailedView response={response} article_url={fullUrl}/>
      ) : (
        <Loading/>
      )}
    </div>
  )
}
