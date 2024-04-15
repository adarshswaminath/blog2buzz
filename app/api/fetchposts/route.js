import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai"
import { Scraper } from "../utils/Scraper";
import { GenerateAi } from "../utils/GenerateAi";


export const GET = async (req, res) => {
    try {
        const results = await Scraper("https://dev.to/")
        return NextResponse.json({ data: results });
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ error: error.message });
    }
};

export const POST = async (req, res) => {
    try {
        const {textContent,href} = await req.json()
        const url = `https://dev.to${href}`
        // ? create content using Ai
        const text = await GenerateAi(textContent,url)
        return NextResponse.json({ res: text });
    } catch (error) {
        return NextResponse.json({ res: error.message });

    }
};
