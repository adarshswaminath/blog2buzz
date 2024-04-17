// ! route for fetching hashtags and  hashtag based blogs
import { NextResponse } from "next/server"
import { Scraper } from "../utils/Scraper"
import puppeteer from "puppeteer"



// ? get hashtags
export const GET = async () => {
    try {
        //? code to fetch all hashtags
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto('https://dev.to');
        //? Extracting data from div elements with class "sidebar-nav-element"
        const data = await page.evaluate(() => {
            const elements = document.querySelectorAll('.sidebar-nav-element');
            const dataArray = [];
            elements.forEach(element => {
                const link = element.querySelector('a').getAttribute('href');
                const text = element.querySelector('a').textContent.trim();
                dataArray.push({ link, text });
            });
            return dataArray;
        });


        return NextResponse.json({ res: data })
    } catch (error) {
        return NextResponse.json({ res: error.message })
    }
}

// ? get posts search using hashtags
export const POST = async (req) => {
    try {
        const { hashtag } = await req.json()
        console.log(`https://dev.to/t/${hashtag}`)
        const results = await Scraper(`https://dev.to/t/${hashtag}`)
        return NextResponse.json({ res: results })
    } catch (error) {
        return NextResponse.json({ res: error.message })
    }
}