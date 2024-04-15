import puppeteer from "puppeteer";

// * function for webscrapping
export const Scraper = async (url) => {
    try {
        // todo do the webscraping
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(url);

        const results = await page.evaluate(() => {
            //* scrap the required fields from the dev.to
            const elements = document.querySelectorAll(".crayons-story__indention .crayons-story__title a");
            const data = Array.from(elements).map(element => ({
                id: element.getAttribute("id"),
                textContent: element.textContent.trim(),
                href: element.getAttribute('href'),
                image: element.getAttribute("data-preload-image"),
            }));
            return data;
        });
        // ! must close the browser
        await browser.close();
        return results
    } catch (error) {
        return null
    }
}