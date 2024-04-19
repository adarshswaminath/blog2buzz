"use client"

import React, { useEffect, useState } from 'react'
import { FaRegBookmark } from "react-icons/fa";
import { IoMdBookmark } from "react-icons/io";
function SaveThePost({dataToSave}) {
    const [isSaved,setIsSaved] = useState(false)
    
    const savePost = () => {
        setIsSaved(true);
        
        //? Retrieve existing posts array from local storage or initialize it if not exists
        let posts = JSON.parse(localStorage.getItem("posts")) || [];
        //? Add the new post to the beginning of the array (LIFO order)
        posts.unshift(dataToSave);
        //? Save the updated array back to the local storage
        localStorage.setItem("posts", JSON.stringify(posts));
        setTimeout(() => {
            setIsSaved(false);
        }, 900);
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