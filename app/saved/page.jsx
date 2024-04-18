"use client"
import React, { useEffect, useState } from 'react';
import Loading from '../Components/Loading';

export default function Page() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call to fetch data from local storage
    setTimeout(() => {
      // Retrieve data from local storage and parse it into an array of objects
      const data = JSON.parse(localStorage.getItem('posts')) || [];
      setPosts(data);
      setIsLoading(false);
    }, 1000); // Simulate loading time
  }, []);

  return (
    <main className="min-h-screen">
      <h2 className='text-center lg:text-4xl text-3xl font-bold text-white'><span className='text-gray'>#</span>Your Bucket List</h2>
      {isLoading ? (
        <Loading/>
      ) : (
        <>
          {posts.length > 0 ? (
            <ul>
              {posts.map((post, index) => (
                <li key={index}>{post.title}</li>
              ))}
            </ul>
          ) : (
            <p className="text-white">No data</p>
          )}
        </>
      )}
    </main>
  );
}
