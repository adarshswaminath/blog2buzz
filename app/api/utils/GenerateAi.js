const { GoogleGenerativeAI } = require("@google/generative-ai");

/*
//* userSelect have three options
//* Summerize content,Create tweet,create a medium writeup
*/
export const GenerateAi = async(title,article,userSelect) => {
      const generatePrompt = () => {
            switch (userSelect) {
                  case 1:
                        return ` Using the content provided in the ${article} and title of the content is ${title}, analyze and summarize it in simple, easy-to-understand English. Focus on extracting key points from the dynamic article and presenting them concisely.`
                  case 2:
                        return `${title} ${article} Analyze the content summarize it in simple content and gernerate a twitter post content which suitable for Twitter (max 250 characters). Ensure the tweet captures the essence of the article's key insights and entices users to click through and read more`
                  case 3:
                        return `${title} ${article} Analyze the provided content and generate a Medium article based on the topic. Craft a well-written piece that delves into the subject matter, offers insights, and provides value to the reader. Ensure the article is structured effectively with an engaging introduction, informative body paragraphs, and a compelling conclusion. Tailor the tone and style to suit the Medium platform's audience and guidelines`
                  default:
                        return `${title} ${article} Analyze the provided content from a dev.to article and craft a concise and engaging tweet (250 characters max) for Twitter.`
            }
      }
      // ? access the gemini
      const genAI = new GoogleGenerativeAI(process.env.NEXT_GEMINI_KEY)
      // ? for text only so use gemini-pro model
      const model = genAI.getGenerativeModel({ model: "gemini-pro" })
      //? based on userSelect creat the propmt prompt for 
      const prompt = generatePrompt()
      const result = await model.generateContent(prompt)
      const response = await result.response;
      const text = response.text()
      return text

}