import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

// ! route used to get details of the user selected blog
export async function POST(req) {
    try {
        const reqBody = await req.json()
        const url = `https://dev.to/${reqBody.url}`; // Direct URL for the dev.to
        // Do the webscraping
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(url);

        //* Extract the image URL
        const imageUrl = await page.evaluate(() => {
            const imageElement = document.querySelector('.crayons-article__cover__image');
            return imageElement ? imageElement.src : null;
        });

        //* Extract the h1 value inside the div with the class name .crayons-article__header__meta
        const title = await page.evaluate(() => {
            const headerElement = document.querySelector('.crayons-article__header__meta h1');
            return headerElement ? headerElement.textContent.trim() : null;
        });

        //* Extract all data inside p tags within div with id "article-body"
        const article = await page.evaluate(() => {
            const paragraphElements = document.querySelectorAll('#article-body p');
            const content = [];
            paragraphElements.forEach(element => {
                content.push(element.textContent.trim());
            });
            return content.join('\n');
        });

        await browser.close();
        //? Construct and return the object
        const result = { success: "Success", data: { imageUrl, title, article } };
        return NextResponse.json(result);
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ error: error.message });
    }
}
