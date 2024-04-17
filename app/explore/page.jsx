"use client"

import { useEffect, useState } from "react"
import Card from "../Components/Card"

function page() {
    const [response, setResponse] = useState()
    useEffect(() => {
        fetch("/api/fetchposts")
            .then((res) => res.json())
            .then((data) => setResponse(data.data))
            .catch((err) => new Error("Some thing failed"))
            window.scrollTo(0,0)
    }, [])
    return (
        <div className="p-3 min-h-screen">
            <div className="flex flex-col items-center">
                <h2 className="p-3 text-xl font-bold text-white">Explore All blogs!</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3">
                    {response ? (
                        <>
                            {response.map((data, index) => (
                                <Card key={index} {...data} />
                            ))}
                        </>
                    ) : (
                        "Loading...."
                    )}
                </div>
            </div>

        </div>
    )
}

export default page