import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export const GET = async (req, res) => {
    try {
        const website_url = "https://dev.to/";
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(website_url);

        const results = await page.evaluate(() => {
            const elements = document.querySelectorAll(".crayons-story__indention .crayons-story__title a");
            
            const data = Array.from(elements).map(element => ({
                id: element.getAttribute("id"),
                textContent: element.textContent.trim(),
                href: element.getAttribute('href'),
                image: element.getAttribute("data-preload-image"),
            }));
            return data;
        });

        console.log(results);

        await browser.close();

        return NextResponse.json({ data: results });
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ error: error.message });
    }
};

export const POST = async (req, res) => {
    const { id } = await req.json();
    return NextResponse.json({ res: "POST Request" });
};
