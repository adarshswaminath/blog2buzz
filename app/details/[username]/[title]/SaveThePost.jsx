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
        setIsSaved(false)
    }
  return (
    <button onClick={savePost} className="btn border-none bg-transparent">
        {isSaved ? (
            <div className='flex items-center gap-x-2 text-base'> <IoMdBookmark className='text-2xl text-purple animate-bounce'/> Saved</div>

        ) : (
            <div className='flex items-center gap-x-2 text-base'>
                <FaRegBookmark/> Save
            </div>
        )}
    </button>
  )
}

export default SaveThePost