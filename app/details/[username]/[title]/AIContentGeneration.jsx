"use client"
import React, { useState } from 'react'
import { IoSparklesSharp } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

function AIContentGeneration({ title, article, url }) {
    const [content, SetContent] = useState()
    const [isSubmit, setSubmit] = useState(false)
    const [userSelect, setUserSelect] = useState(1)
    // ** function api call
    async function generateContent() {
        try {
            setSubmit(true)
            const response = await fetch("/api/generatepost/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title:title,article: article, userSelect: userSelect })
            })
            const data = await response.json()
            SetContent(data.res)
        } catch (error) {
            SetContent("Something Wrong! Try Again Later")
        } finally {
            setSubmit(false)
        }
    }
    // ? user option for what type of content they want
    const userOption = ["Summerise Content", "Create a Tweet", "Create a Medium Write Up"]
    return (
        <div className='w-full'>
            <h3 className="text-3xl lg:text-4xl text-white font-bold">AI-Driven Content Transformation Suite</h3>
            {/* body */}
            {/* buttons */}
            <div className="flex justify-between mt-5">
                {/* //* options */}
                <div className="flex items-center space-x-4">
                    {userOption.map((value, index) => (
                        <button key={index} onClick={() => setUserSelect(index + 1)} className={`bg-gray rounded-full text-white w-8 h-8 hover:w-56 overflow-hidden duration-500 ease-in-out group flex items-center justify-center text-sm font-bold ${userSelect === index + 1 ? "bg-gradient-to-tr from-purple to-blue" : "bg-gray"}`}>
                            <span className='group-hover:opacity-0 opacity-100 transition-opacity ease-in-out'>{index + 1}</span>
                            <span className='group-hover:block hidden'>{value}</span>
                        </button>
                    ))}
                </div>
                <button disabled={isSubmit} onClick={generateContent} className={`btn text-white ${isSubmit ? "bg-blue text-white disabled:text-white" : "bg-gradient-to-br from-blue to-purple hover:bg-blue font-bold"}`}>
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
            {/* //*section to display the content */}
            <div className='mt-2 p-4 w-full bg-gray/50 shadow-lg h-auto rounded-lg overflow-scroll text-white font-mono tracking-wide'>
                {content ? (
                    <ReactMarkdown remarkPlugins={[gfm]} className='text-wrap '>
                            {content}
                    </ReactMarkdown>
                ) : "Generate Your Content...."}
            </div>

        </div>
    )
}

export default AIContentGeneration