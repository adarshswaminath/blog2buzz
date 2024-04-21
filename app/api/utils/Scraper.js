import axios from "axios";
import cheerio from "cheerio";

// * function for webscraping
export const Scraper = async (url) => {
    try {
        // Fetch HTML content of the page
        const response = await axios.get(url);
        const html = response.data;

        // Load HTML content into Cheerio
        const $ = cheerio.load(html);

        const results = $(".crayons-story__indention .crayons-story__title a").map((index, element) => {
            return {
                id: $(element).attr("id"),
                textContent: $(element).text().trim(),
                href: $(element).attr("href"),
                image: $(element).attr("data-preload-image"),
            };
        }).get();

        return results;
    } catch (error) {
        return null;
    }
};
