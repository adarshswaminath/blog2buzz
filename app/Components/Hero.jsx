import React from 'react'

function Hero() {
  return (
    <main className='min-h-screen flex flex-col items-center justify-center'>
        <h3 className='text-3xl lg:text-5xl text-center max-w-2xl'>Discover, Share, Engage: Blog2Tweet Makes it Effortless!</h3>
        <p className='text-center mt-3 font-normal text-gray-500 max-w-xl'>The ultimate tool for seamlessly transforming trending blog posts into captivating tweets.</p>
        <div className="hover:-translate-y-3 transform transition ease-in-out duration-300">
        <button className='mt-4 px-12 py-2 bg-white rounded-lg text-black font-bold border border-white hover:bg-transparent hover:text-white transition ease-in-out duration-200'>Get Started</button>
        </div>
    </main>
  )
}

export default Hero