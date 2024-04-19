"use client"

import React, { useState } from 'react'
import { FaRegBookmark } from "react-icons/fa";
import { IoMdBookmark } from "react-icons/io";
function SaveThePost(response) {
    const [isSaved,setIsSaved] = useState(false)
    
    
    const savePost = () => {
        setIsSaved(true)
        // ? create a copy
        const post = response.response
        localStorage.setItem("posts",JSON.stringify(post))
        setTimeout(() => {
            setIsSaved(false)
        },900)
    }
  return (
    <button onClick={savePost} className="btn border-none bg-transparent">
        {isSaved ? (
            <span className='flex items-center gap-x-2 text-base'> <IoMdBookmark className='text-2xl text-purple animate-bounce'/> Saved</span>

        ) : (
            <span className='flex items-center gap-x-2 text-base'>
                <FaRegBookmark/> Save
            </span>
        )}
    </button>
  )
}

export default SaveThePost