"use client";

import React, { useEffect, useState } from 'react';
import Loading from '../Components/Loading';
import Image from 'next/image';
import { BackgroundGradient } from '../Components/ui/background-gradient';

export default function Page() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("posts")) || [];
    console.log(data)
    setPosts(data);
  }, []);

console.log(posts)
  return (
    <main className="min-h-screen">
      <h2 className='text-center lg:text-4xl text-3xl font-bold text-white mb-4'><span className='text-gray'>#</span>Your Bucket List</h2>
     
        <div className='flex flex-wrap gap-2 justify-center items-center mt-6'>
          {posts.map((data, index) => (
            <BackgroundGradient key={index} className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-background">
            <Image
              src={data.imageUrl}
              alt="jordans"
              height="400"
              width="400"
              className="object-contain"
            />
            <p className="text-base sm:text-xl text-white mt-4 mb-2 ">
              Air Jordan 4 Retro Reimagined
            </p>
     
            <p className="text-sm text-white">
              {data.article.slice(0,900)}...
            </p>
            <a href={`https://dev.to/${data.article_url}`} target="_blank" rel="noopener noreferrer">
            <button className="px-6 py-2 text-base rounded-full bg-black text-white">
              <span>Read full Article</span>
            </button>
            </a>
          </BackgroundGradient>
          ))}
        </div>
  
    </main>
  );
}
