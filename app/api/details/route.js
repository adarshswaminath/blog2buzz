import { NextResponse } from "next/server";
import axios from "axios";
import cheerio from "cheerio";

// ! route used to get details of the user selected blog
export async function POST(req) {
    try {
        const reqBody = await req.json();
        const url = `https://dev.to/${reqBody.url}`; // Direct URL for the dev.to

        // Fetch HTML content of the page
        const response = await axios.get(url);
        const html = response.data;

        // Load HTML content into Cheerio
        const $ = cheerio.load(html);

        //* Extract the image URL
        const imageUrl = $('.crayons-article__cover__image').attr('src') || null;

        //* Extract the h1 value inside the div with the class name .crayons-article__header__meta
        const title = $('.crayons-article__header__meta h1').text().trim() || null;

        //* Extract all data inside p tags within div with id "article-body"
        let article = '';
        $('#article-body p').each((index, element) => {
            article += $(element).text().trim() + '\n';
        });

        //? Construct and return the object
        const result = { success: "Success", data: { imageUrl, title, article } };
        return NextResponse.json(result);
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ error: error.message });
    }
}
