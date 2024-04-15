const { GoogleGenerativeAI } = require("@google/generative-ai");

export const GenerateAi = async(textContent,url) => {
      // ? access the gemini
      const genAI = new GoogleGenerativeAI(process.env.NEXT_GEMINI_KEY)
      // ? for text only so use gemini-pro model
      const model = genAI.getGenerativeModel({ model: "gemini-pro" })
      const prompt = `I saw a wonder resource in dev.to  i would like to share with other  can can you create a content for twitter post to share ${textContent} the link is ${url}`
      const result = await model.generateContent(prompt)
      const response = await result.response;
      const text = response.text()
      return text

}