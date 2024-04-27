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
      <div className="flex items-center justify-between p-3 px-12">
        <h2 className='text-center lg:text-4xl text-3xl font-bold text-white mb-4'><span className='text-gray'>#</span>Your Bucket List</h2>

        <form action="/auth/signout" method='POST'>
          <button className='px-12 py-2 bg-background rounded-xl text-white font-bold hover:bg-gradient-to-br hover:from-purple hover:to-white'>Sign Out</button>
        </form>
      </div>
      <div className='flex flex-wrap gap-2 justify-center items-center mt-6'>
        {posts.map((data, index) => (
          <BackgroundGradient key={index} className="rounded-[22px] min-h-96 max-w-sm p-4 sm:p-10 bg-background">
            <Image
              src={data.imageUrl}
              alt="jordans"
              height="400"
              width="400"
              className="object-contain"
            />
            <p className="text-base sm:text-xl text-white mt-4 mb-2 ">
              {data.title}
            </p>

            <p className="text-sm text-white">
              {data.article.slice(0, 200)}...
            </p>
            <div className="flex items-center justify-between mt-3">
              <a href={`https://dev.to/${data.article_url}`} target="_blank" rel="noopener noreferrer">
                <button className="px-6 py-2 text-base rounded-full bg-black text-white">
                  <span>Read full Article</span>
                </button>
              </a>
              {/* button to delete */}
              <button>Delete</button>
            </div>
          </BackgroundGradient>
        ))}
      </div>

    </main>
  );
}
