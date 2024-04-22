#  Blog2Buzz: Stay Ahead of the Tech Curve

**Blog2Buzz** is a cutting-edge web application designed to empower developers, students, security specialists, and anyone in the tech industry to stay informed about the latest market trends and technologies. It seamlessly integrates web scraping and AI assistance to deliver an exceptional experience for:

* ** Accessing** the hottest blogs from dev.to
* ** Summarizing** content with the power of AI (powered by Gemini)
* ** Sharing** insights on social media (also assisted by Gemini)

Built with a focus on efficiency and a sleek user interface, Blog2Buzz leverages a powerful tech stack:

## ️ Technologies Under the Hood

* **Next.js** : A robust framework for building server-rendered applications, ensuring a seamless user experience.
* **Tailwind CSS** : A utility-first CSS framework that streamlines UI development, allowing for rapid prototyping and customization.
* **Axios** : A promise-based HTTP client for making efficient network requests and retrieving data.
* **Cheerio** : A lightweight and flexible library that empowers web scraping, enabling Blog2Buzz to access valuable content from dev.to.
* **Gemini** : Cutting-edge AI assistance for summarizing content and generating social media posts, saving you time and effort.
* **Aceternity** : A collection of modern UI components that contribute to Blog2Buzz's sleek and polished user interface.
* **Vercel** : A cloud platform that streamlines deployment, making Blog2Buzz readily available to the tech community.

Stay tuned for further updates on Blog2Buzz as it empowers you to navigate the ever-evolving tech landscape!

##   Running Blog2Buzz Locally

Excited to try out Blog2Buzz? Here's how to get it up and running on your local machine:

1. **Prerequisites:** Ensure you have Node.js and npm (or yarn) installed on your system. You can verify this by running `node -v` and `npm -v` (or `yarn -v`) in your terminal. If not installed, download them from the official Node.js website (https://nodejs.org/en).
2. **Clone the Repository:** Use Git to clone the Blog2Buzz source code repository from your preferred version control platform (e.g., GitHub).

    ```bash 
        https://github.com/adarshswaminath/blog2buzz
    ```

3. **Install Dependencies:** Navigate to the cloned repository directory in your terminal and run `npm install`  to install all the required dependencies listed in the `package.json` file.

    ```bash 
    npm install
    ```

4. **Configure Environment Variables:**

   Blog2Buzz utilizes environment variables to store sensitive information like API keys. To configure these, follow these steps:

     - Rename the `.env.local.example` file in your project's root directory to `.env.local` (**important: this file is not tracked by Git version control to avoid exposing sensitive keys**).
     - Add the following environment variables to the `.env.local` file, replacing the placeholders with your actual keys:

       ```
       NEXT_GEMINI_KEY=your_gemini_api_key
       NEXT_PUBLIC_POSTHOG_KEY=your_posthog_api_key
       NEXT_PUBLIC_POSTHOG_HOST=[https://app.posthog.com](https://app.posthog.com) (or your Posthog deployment URL)
       ```

       - `NEXT_GEMINI_KEY`: Your Gemini API key for AI functionality.
       - `NEXT_PUBLIC_POSTHOG_KEY`: Your Posthog API key for analytics integration (if applicable).
       - `NEXT_PUBLIC_POSTHOG_HOST`: The Posthog deployment URL (if applicable)
5. **Start the Development Server:** Run `npm run dev`  to launch the development server. This will typically start the application on `http://localhost:3000` (the exact port might vary). You can then access Blog2Buzz in your web browser.
    ```bash
    npm run dev
    ```



By following these steps, you should be able to run Blog2Buzz locally and explore its features!



**Like what you see?**  ⭐ Star the project on GitHub to show your support and stay updated on future developments!
