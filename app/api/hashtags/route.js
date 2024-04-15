import { NextResponse } from "next/server"
import { Scraper } from "../utils/Scraper"

export const POST = async(req) => {
    try {
        const {hashtag} = await req.json()
        console.log(hashtag)
        const results = await Scraper(`https://dev.to/t/${hashtag}`)
        return NextResponse.json({res:results})
    } catch (error) {
        return NextResponse.json({res:error.message})
    }
}