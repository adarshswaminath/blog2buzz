import React from 'react'
import Image from 'next/image'
import AIContentGeneration from './AIContentGeneration'
export default function DetailedView({ response, article_url }) {
  const { imageUrl, title, article } = response
  return (
    <div>
      {imageUrl && <Image src={imageUrl} alt='Image Not found'
        height={900}
        width={900} className='h-80 w-full rounded-lg object-cover' />}
      {/* content of the page */}
      <div className="grid lg:flex  w-full  justify-between gap-x-4">
        {/* Blog content */}
        <div className="mt-12 w-full lg:w-2/5">
          <h2 className="text-2xl font-bold max-w-2xl">{title}</h2>
          <p className='max-w-2xl text-justify mt-4'>{article.slice(0, 512)}.....</p>
          <div className="mt-4 flex justify-end">
            <a href={`https://dev.to/${article_url}`} target='_blank'>
              <button className='btn text-white bg-gradient-to-br from-[#248AE9] to-purple hover:bg-purple font-bold'>Read Full Article</button>
            </a>
          </div>
        </div>
         {/* Ai Content */}
         <div className="mt-12 flex w-full lg:w-3/5">
          <AIContentGeneration title={title} article={article} url={`https://dev.to/${article_url}`} />
        </div>
      </div>
    </div>
  )
}
