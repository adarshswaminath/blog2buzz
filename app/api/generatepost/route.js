import { NextResponse } from "next/server";
import { GenerateAi } from "../utils/GenerateAi";

// ! route for genrating posts
export const POST = async (req, res) => {
    try {
        const {article} = await req.json()
        // ? create content using Ai
        const text = await GenerateAi(article)
        return NextResponse.json({ res: text });
    } catch (error) {
        return NextResponse.json({ res: error.message });

    }
};