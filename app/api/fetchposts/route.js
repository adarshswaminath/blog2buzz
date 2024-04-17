// ! route for fecthing blogs

import { NextResponse } from "next/server";
import { Scraper } from "../utils/Scraper";
import fs from "fs/promises";

//* Function to check if data needs to be scraped again
const shouldScrapeData = async () => {
    try {
        const data = await fs.readFile("scrapedData.json", "utf-8");
        const parsedData = JSON.parse(data);
        const lastScrapedTime = parsedData.lastScrapedTime;
        const currentTime = Date.now();
        //? Check if last scraped time is older than 24 hours
        return currentTime - lastScrapedTime > 24 * 60 * 60 * 1000;
    } catch (error) {
        //? If file doesn't exist or error reading file, return true to scrape data
        return true;
    }
};

//! Function to scrape data and update the file
const scrapeAndUpdateData = async () => {
    const results = await Scraper("https://dev.to/");
    const currentTime = Date.now();
    const newData = { data: results, lastScrapedTime: currentTime };
    await fs.writeFile("./scrapedData.json", JSON.stringify(newData));
    return newData;
};

export const GET = async (req, res) => {
    try {
        //? Check if data needs to be scraped again
        const needsScraping = await shouldScrapeData();
        let data;
        if (needsScraping) {
            //? If data needs scraping, scrape and update
            console.log("Data Will Scrap")
            data = await scrapeAndUpdateData();
        } else {
            //? If data is recent, read from the file
            console.log("Data Dont Need to scrap")
            const fileData = await fs.readFile("scrapedData.json", "utf-8");
            data = JSON.parse(fileData);
        }
        return NextResponse.json(data);
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ error: error.message });
    }
};
