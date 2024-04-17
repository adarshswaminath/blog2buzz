"use client"
import React, { useEffect, useState } from 'react'
import Card from '@/app/Components/Card'
import Tags from '@/app/Home/Tags'

function page({ params: { hashtag } }) {
  const [posts, setPosts] = useState()
  // function to mkae the api call
  async function apiCall() {
    const respone = await fetch("/api/hashtags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hashtag: hashtag })
    })
    if (!respone.ok) {
      console.log("failed")
    }
    const data = await respone.json()
    setPosts(data.res)
  }
  useEffect(() => {
    window.scrollTo(0, 0)
    // make the api call
    apiCall()
  }, [])
  return (
    <div className='min-h-screen'>
      <h2 className='text-center text-3xl text-white font-bold capitalize'>Result For <span className="text-gray">#{hashtag}</span></h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3">
        {posts ? (
          <>
            {posts.map((data, index) => (
              <Card key={index} {...data} />
            ))}
          </>
        ) : (
          "Loading...."
        )}
      </div>
      <Tags/>
    </div>
  )
}

export default page