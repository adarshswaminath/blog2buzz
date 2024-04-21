"use client"
import React, { useEffect, useState } from 'react';
import { FaRegBookmark } from "react-icons/fa";
import { IoMdBookmark } from "react-icons/io";

function SaveThePost({ dataToSave }) {
    const [isSaved, setIsSaved] = useState(false);

    const savePost = () => {
        setIsSaved(true);
        
        let posts = JSON.parse(localStorage.getItem("posts")) || [];
        posts.unshift(dataToSave);
        localStorage.setItem("posts", JSON.stringify(posts));

        setTimeout(() => {
            setIsSaved(false);
        }, 2000); // Change the timeout duration if needed
    }

    return (
        <button onClick={savePost} className="btn border-none bg-transparent">
            <span className='flex items-center gap-x-2 text-base'>
                {isSaved ? (
                    <IoMdBookmark className='text-2xl text-purple animate-pulse'/> 
                ) : (
                    <FaRegBookmark/> 
                )}
                {isSaved ? "Saved" : "Save"}
            </span>
        </button>
    );
}

export default SaveThePost;
