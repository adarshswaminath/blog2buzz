import { NextResponse } from "next/server";
import { GenerateAi } from "../utils/GenerateAi";

// ! route for genrating posts
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