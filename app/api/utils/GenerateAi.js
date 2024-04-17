const { GoogleGenerativeAI } = require("@google/generative-ai");

export const GenerateAi = async(article) => {
      // ? access the gemini
      const genAI = new GoogleGenerativeAI(process.env.NEXT_GEMINI_KEY)
      // ? for text only so use gemini-pro model
      const model = genAI.getGenerativeModel({ model: "gemini-pro" })
      // prompt for creating twitter posts
      const prompt = `${article} Analyze the provided content from a dev.to article and craft a concise and engaging tweet (250 characters max) for Twitter.`
      const result = await model.generateContent(prompt)
      const response = await result.response;
      const text = response.text()
      return text

}