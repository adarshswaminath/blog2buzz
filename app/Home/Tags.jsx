"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function Tags() {
    const [tags,setTags] = useState()
    useEffect(() => {
        fetch("/api/hashtags")
        .then((res) => res.json())
        .then((data) => setTags(data.res))
        .catch((err) => console.log(err.message))
    },[])
  
  return (
    <div className='mt-12'>
        <h2 className="text-xl text-white text-center">Tags</h2>
        <div className="grid grid-cols-10 gap-3">
        {tags ? (
          tags.map((data,index) => (
            <Link 
              className='btn rounded-full hover:bg-purple hover:text-white' 
              key={index} 
              href={`/tags/${data.text.slice(1)}`}>{data.text}</Link>
          ))
        ) : "Loading...."}
        </div>
    </div>
  )
}

export default Tags