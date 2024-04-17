"use client"

import { useEffect, useState } from "react"
import Card from "../Components/Card"
import Tags from "../Home/Tags"
import Loading from "../Components/Loading"

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
                <div className="flex items-center justify-center flex-wrap gap-x-3">
                    {response ? (
                        <>
                            {response.map((data, index) => (
                                <Card key={index} {...data} />
                            ))}
                        </>
                    ) : (
                        <Loading/>
                    )}
                </div>
            </div>
            <Tags/>

        </div>
    )
}

export default page