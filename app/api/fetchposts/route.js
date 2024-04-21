// ! route for fecthing blogs
import { NextResponse } from "next/server";
import { Scraper } from "../utils/Scraper";


export const GET = async (req, res) => {
    try {
        // * Scrap all latest blogs from dev.to
       const results = await Scraper("https://dev.to/")
       // * return the response
       return NextResponse.json({data: results})
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ error: error.message });
    }
};
