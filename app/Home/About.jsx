import React from 'react'
import Vortex from '../Components/ui/vortex'
import { FaGithub } from 'react-icons/fa6'


export default function About() {
    return (
        <div className="w-[calc(100%-4rem)] mx-auto rounded-xl overflow-hidden">
            <Vortex
                backgroundColor="#e90df3"
                className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full bg-transparent"
            >
                <h2 className="text-white text-xl  font-bold text-center">
                    About the Project!
                </h2>
                <p className="text-white text-lg font-medium mt-6 text-justify">
                    If you're a developer, student, security specialist, or anyone involved in the tech industry, staying updated with current market technology is crucial. However, it can be a challenging task. Even though there are free platforms like Medium, dev.to, and DailyDev available, many of us struggle to find the time to explore blogs and learn more about emerging technologies. Some of us might even admit to being a bit lazy when it comes to this. For those facing this issue, Blog2Buzz offers the perfect solution. Here, you can access the latest blogs from dev.to. With the assistance of AI (Google Gemini), you can summarize content or create Twitter posts and Medium write-ups. Just like learning, sharing knowledge is equally important. By creating Twitter posts or Medium articles, you're effectively disseminating knowledge to others. This platform not only helps you save time but also facilitates knowledge sharing.
                </p>
                <a href="" className='mt-5'>
                    <button className="btn bg-white text-black hover:text-white px-12 rounded-full">View Project In <FaGithub className="text-xl" /></button>

                </a>

            </Vortex>
        </div>

    )
}



{/* <section>

<h1
    className="mt-2 bg-gradient-to-br from-[#cbd5e1] to-[#64748b] py-4 bg-clip-text text-center text-3xl lg:text-4xl font-medium tracking-tight text-transparent"
>
    About Project!
</h1>
<p
    className='text-white font-medium text-lg'
>
    If you're a developer, student, security specialist, or anyone involved in the tech industry, staying updated with current market technology is crucial. However, it can be a challenging task. Even though there are free platforms like Medium, dev.to, and DailyDev available, many of us struggle to find the time to explore blogs and learn more about emerging technologies. Some of us might even admit to being a bit lazy when it comes to this. For those facing this issue, Blog2Buzz offers the perfect solution. Here, you can access the latest blogs from dev.to. With the assistance of AI (Google Gemini), you can summarize content or create Twitter posts and Medium write-ups. Just like learning, sharing knowledge is equally important. By creating Twitter posts or Medium articles, you're effectively disseminating knowledge to others. This platform not only helps you save time but also facilitates knowledge sharing.
</p>
</section> */}