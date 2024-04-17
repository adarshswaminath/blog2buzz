import React from 'react'
import Image from 'next/image'
export default function DetailedView({ response,article_url }) {
  const { imageUrl, title, article } = response
  return (
    <div>
      <Image src={imageUrl} alt='Image Not found'
        height={900}
        width={900} className='h-80 w-full rounded-lg object-cover' />
      <div>
    
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className='max-w-3xl text-justify'>{article.slice(0, 512)}.....</p>

      
      <a href={`https://dev.to/${article_url}`} target='_blank'>
       <button className='btn text-white bg-gradient-to-br from-[#248AE9] to-purple hover:bg-purple font-bold'>Read Full Article</button>
      </a>
      </div>
    </div>
  )
}
