import { NextResponse } from "next/server";
import { GenerateAi } from "../utils/GenerateAi";

// ! route for genrating posts
export const POST = async (req, res) => {
    try {
        const {title,article,userSelect} = await req.json()
        // ? create content using Ai
        const text = await GenerateAi(title,article,userSelect)
        return NextResponse.json({ res: text });
    } catch (error) {
        return NextResponse.json({ res: error.message });

    }
};