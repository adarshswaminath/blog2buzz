"use client"
import React, { useState } from 'react'
import { IoSparklesSharp } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function AIContentGeneration({ title, article, url }) {
    const [content, SetContent] = useState()
    const [isSubmit, setSubmit] = useState(false)
    // ** function api call
    async function generateContent() {
        try {
            setSubmit(true)
            const response = await fetch("/api/generatepost/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ article: article })
            })
            const data = await response.json()
            SetContent(data.res)
        } catch (error) {
            SetContent("Something Wrong! Try Again Later")
        } finally {
            setSubmit(false)
        }
    }
    return (
        <div className='w-full'>
            {/* body */}
            <div className='mt-2 p-2 w-full bg-gray/50 shadow-lg h-72 rounded-lg overflow-scroll'>
                {content ? (
                    <section className='text-white'>
                        {content}
                        {url}
                    </section>
                ) : "Generate Your Content...."}
            </div>
            <div className="flex justify-end mt-5">
                <button disabled={isSubmit} onClick={generateContent} className={`btn text-white ${isSubmit ? "bg-[#248AE9] text-white disabled:text-white" : "bg-gradient-to-br from-[#248AE9] to-purple hover:bg-[#248AE9] font-bold"}`}>
                    {isSubmit ? (
                        <>
                            Generating Content
                            < AiOutlineLoading3Quarters className='text-xl animate-spin' />
                        </>
                    ) : (
                        <>
                            Generate
                            < IoSparklesSharp className='text-xl' />
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

export default AIContentGeneration