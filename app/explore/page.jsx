"use client"

import { useEffect, useState } from "react"
import Card from "../Components/Card"
import Tags from "../Home/Tags"
import Loading from "../Components/Loading"
import { PlaceholdersAndVanishInput } from "../Components/ui/vanish-input"
import { useRouter } from "next/navigation"
function page() {
    const [response, setResponse] = useState()
    const [userTag,setUserTag] = useState()
    const router = useRouter()
    useEffect(() => {
        fetch("/api/fetchposts")
            .then((res) => res.json())
            .then((data) => setResponse(data.data))
            .catch((err) => new Error("Some thing failed"))
            window.scrollTo(0,0)
    }, [])
    const placeholders = [
        "Discover insights on AWS, Linux, Golang, Ruby, and hacking.",
        "Enter your hashtag to explore trending topics.",
        "Find curated content on your favorite topics from across the web.",
        "Explore resources on Python, JavaScript, Bash, and Linux."
    ];
    
    
    const handleChange = (e) => {
        setUserTag(e.target.value)
    }
    const onSubmit = (e) => {
        e.preventDefault()
        router.push(`/tags/${userTag}`)
    }
    return (
        <div className="p-3 min-h-screen">
            <div className="flex flex-col items-center">
                <h2 className="p-3 text-xl font-bold text-white">Explore All blogs!</h2>
                <PlaceholdersAndVanishInput
                    placeholders={placeholders}
                    onChange={handleChange}
                    onSubmit={onSubmit}
                />
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