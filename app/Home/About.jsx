import React from 'react'
import Vortex from '../Components/ui/vortex'
import { FaGithub } from 'react-icons/fa6'


export default function About() {
    return (
        <div className="w-full lg:w-[calc(100%-4rem)] mx-auto rounded-xl overflow-hidden">
            <Vortex
                backgroundColor="#e90df3"
                className="flex items-center flex-col justify-center  px-2 md:px-10 py-4 w-full h-full bg-transparent rounded-xl"
            >
                <h2 className="text-white text-xl  font-bold text-center">
                    About the Project!
                </h2>
                <p className="text-white text-lg font-medium mt-6 text-justify">
                For developers, students, security specialists, and anyone in the tech industry, staying updated with current market technology is crucial. However, finding the time to explore blogs and learn about emerging technologies can be challenging. Blog2Buzz provides the ideal solution for those facing this issue. Utilizing web scraping, it offers access to the latest dev.to blogs and harnesses AI assistance to summarize content or craft engaging Twitter posts and Medium articles. Just like learning, sharing knowledge is equally vital. By creating Twitter posts or Medium articles, you effectively disseminate knowledge to others. Blog2Buzz not only saves time but also facilitates knowledge sharing seamlessly.
                </p>
                <div className="flex justify-center mt-8">
                    <a href="https://github.com/adarshswaminath/blog2buzz" target="_blank">
                        <button className="btn bg-white text-black hover:text-white px-12 rounded-full">View Project In <FaGithub className="text-xl" /></button>
                    </a>
                </div>

            </Vortex>
        </div>

    )
}
