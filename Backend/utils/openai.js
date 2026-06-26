import "dotenv/config";
import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
});

const getOpenAIAPIResponse = async (message, fileUrl = null) => {
    try { 
     const completion = await client.chat.completions.create({
    model: "google/gemini-2.5-flash",

    max_tokens: 1000,

    messages: [
        {
            role: "user",
            content: fileUrl
                ? [
                    {
                        type: "text",
                        text: message
                    },
                    {
                        type: "image_url",
                        image_url: {
                            url: fileUrl
                        }
                    }
                ]
                : message
        }
    ],

    timeout: 60000
});   

        return completion.choices[0].message.content;

    } catch (error) {
        console.log("OpenRouter Error:", error.message);
        return "AI is busy right now, try again.";
    }
}; 

export const generateTitle = async (message) => {
    try {
        const completion = await client.chat.completions.create({
            model: "google/gemini-2.5-flash",
            max_tokens: 20,

            messages: [
                {
                    role: "user",
                    content: `
Generate a very short chat title.

Rules:
- Maximum 4 words
- No quotes
- No punctuation
- Return only title

Message:
${message}
`
                }
            ]
        });

        return completion.choices[0].message.content.trim();

    } catch (err) {
        console.log(err);
        return "New Chat";
    }
};

export default getOpenAIAPIResponse;