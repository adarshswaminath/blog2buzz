import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai"
import { Scraper } from "./utils/Scraper";


export const GET = async (req, res) => {
    try {
        const results = await Scraper("https://dev.to/t/testing")
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
        // ? access the gemini
        const genAI = new GoogleGenerativeAI(process.env.NEXT_GEMINI_KEY)
        // ? for text only so use gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" })
        const prompt = `I saw a wonder resource in dev.to  i would like to share with other  can can you create a content for twitter post to share ${textContent} the link is ${url}`
        const result = await model.generateContent(prompt)
        const response = await result.response;
        const text = response.text()

        return NextResponse.json({ res: text });
    } catch (error) {
        return NextResponse.json({ res: error.message });

    }
};
