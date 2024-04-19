"use client"

import { useEffect, useState } from "react"
import Card from "../Components/Card"
import Link from "next/link"
import HoverBorderGradient from "../Components/ui/hover-border-gradient"
import Loading from "../Components/Loading"

function Explore() {
    const [response, setResponse] = useState()
    useEffect(() => {
        fetch("/api/fetchposts")
            .then((res) => res.json())
            .then((data) => setResponse(data.data))
            .catch((err) => new Error("Some thing failed"))
    }, [])
    return (
        <div className="p-3" id="explore">
            <div className="flex flex-col items-center">
                <h2 className="p-3 text-xl font-bold text-white">Explore blogs!</h2>
                <div className="flex gap-x-6 justify-center items-center flex-wrap">
                    {response ? (
                        <>
                            {response.slice(0,6).map((data, index) => (
                                <Card key={index} {...data} />
                            ))}
                        </>
                    ) : (
                       <Loading/>
                    )}
                </div>
            </div>
            <div className="mt-12 flex items-center justify-center">
                <Link href="/explore">
                    {/* <button className="px-12 py-2 rounded-full bg-white hover:text-white text-black hover:bg-purple transition ease-in-out duration-300 font-bold">View More</button> */}
                    <HoverBorderGradient>
                        View More
                    </HoverBorderGradient>
                </Link>
            </div>

        </div>
    )
}

export default Explore