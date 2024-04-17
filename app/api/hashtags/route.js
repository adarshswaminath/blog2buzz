// ! route for fetching hashtags and  hashtag based blogs
import { NextResponse } from "next/server"
import { Scraper } from "../utils/Scraper"




// ? get posts search using hashtags
export const POST = async (req) => {
    try {
        const { hashtag } = await req.json()
        const results = await Scraper(`https://dev.to/t/${hashtag}`)
        return NextResponse.json({ res: results })
    } catch (error) {
        return NextResponse.json({ res: error.message })
    }
}