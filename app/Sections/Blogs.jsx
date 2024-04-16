"use client";
import React, { useEffect, useState } from 'react';
import Card from '../Components/Card';

function Blogs() {
    const [loading, setLoading] = useState(true); // Set loading state to true initially
    const [response, setResponse] = useState([]); // Set initial response state to an empty array

    useEffect(() => {
        setLoading(true); // Set loading state to true before fetching data
        fetch("/api/fetchposts")
            .then((res) => res.json())
            .then((data) => {
                setResponse(data.data);
                setLoading(false); // Set loading state to false after fetching data
            })
            .catch((err) => {
                console.error("Error fetching data:", err); // Log error message
                setLoading(false); // Set loading state to false in case of error
            });
    }, []);

    console.log(response)
    
    return (
        <div>
            <h2 className='heading'>Fresh from the Web</h2>
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 justify-items-center p-3">
                {loading ? "Loading..." : (
                    response.map((data, index) => (
                        <Card key={index} {...data} /> // Pass data as props to Card component
                    ))
                )}
            </div>
        </div>
    );
}

export default Blogs;
