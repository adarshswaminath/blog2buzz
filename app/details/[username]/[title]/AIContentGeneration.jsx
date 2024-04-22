"use client"
import React, { useState } from 'react'
import { IoSparklesSharp } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdContentCopy } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import { LiaCheckDoubleSolid } from "react-icons/lia";
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

function AIContentGeneration({ title, article, url }) {
    const [content, SetContent] = useState()
    const [isSubmit, setSubmit] = useState(false)
    const [userSelect, setUserSelect] = useState(1)
    const [isCopied, setIsCopied] = useState(false)
    // ** function to Copy the Content
    const copyToClipBoard = () => {
        navigator.clipboard.writeText(content)
            .then(() => {
                setIsCopied(true)
                setTimeout(() => {
                    setIsCopied(false)
                }, 1500)
            })
    }
    // ** function api call
    async function generateContent() {
        try {
            setSubmit(true)
            const response = await fetch("/api/generatepost/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title: title, article: article, userSelect: userSelect })
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
                <div>
                    <label className='text-sm text-white'>Choose Content Type</label>
                    <div className="flex items-center space-x-4">
                        {userOption.map((value, index) => (
                            <button key={index} onClick={() => setUserSelect(index + 1)} className={`bg-gray rounded-full text-white w-8 h-8 hover:w-56 overflow-hidden duration-500 ease-in-out group flex items-center justify-center text-sm font-bold ${userSelect === index + 1 ? "bg-gradient-to-tr from-purple to-blue" : "bg-gray"}`}>
                                <span className='group-hover:opacity-0 opacity-100 transition-opacity ease-in-out'>{index + 1}</span>
                                <span className='group-hover:block hidden'>{value}</span>
                            </button>
                        ))}
                    </div>
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
                {/* //! display copy function only there is content in there */}
                <div className="flex justify-end mb-2">
                    {content && <button onClick={copyToClipBoard}>
                        {isCopied ? (
                            <p className='flex items-center gap-2'><LiaCheckDoubleSolid /> <span className='text-sm'>copied</span></p>
                        ) : <MdContentCopy />}
                    </button>}
                </div>
                {content ? (
                     // ?if user click to generate content display please wait message else show the content
                    <ReactMarkdown remarkPlugins={[gfm]} className='text-wrap '>
                       {isSubmit ?  "Content Generating Please Wait ......" : content }
                    </ReactMarkdown>
                ) : "Generate Your Content...."}
            </div>

            {/* //*if user selected twitter and content generated user can directly share the post in twitter  */}
            {(userSelect === 2 && content) ? (
                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=Check out this post: ${encodeURIComponent(content)}`} target='_blank' className="flex justify-start">
                   <button className="btn mt-2">
                   Tweet Full Post <FaXTwitter className='text-xl'/>
                   </button>
                </a>
            ) : null }

        </div>
    )
}

export default AIContentGeneration