// ! route for fetching all posts
import { NextResponse } from "next/server";
import { Scraper } from "../utils/Scraper";


export const GET = async (req, res) => {
    try {
        const results = await Scraper("https://dev.to/")
        return NextResponse.json({ data: results });
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ error: error.message });
    }
};


