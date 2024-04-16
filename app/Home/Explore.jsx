"use client"

import { useEffect, useState } from "react"
import Card from "../Components/Card"
import Link from "next/link"

function Explore() {
    const [response, setResponse] = useState()
    useEffect(() => {
        fetch("/api/fetchposts")
            .then((res) => res.json())
            .then((data) => setResponse(data.data))
            .catch((err) => new Error("Some thing failed"))
    }, [])
    return (
        <div className="p-4">
            <div className="flex flex-col items-start">
                <h2 className="p-3 text-xl font-bold text-white">Explore blogs!</h2>
                <div className="flex items-center flex-wrap justify-center gap-x-6">
                    {response ? (
                        <>
                            {response.slice(0, 4).map((data, index) => (
                                <Card key={index} {...data} />
                            ))}
                        </>
                    ) : (
                        "Loading...."
                    )}
                </div>
            </div>
            <div className="mt-6 flex items-center justify-center">
                <Link href="/">
                    <button className="px-12 py-2 rounded-full bg-white hover:text-white text-black hover:bg-purple transition ease-in-out duration-300 font-bold">View More</button>
                </Link>
            </div>

        </div>
    )
}

export default Explore