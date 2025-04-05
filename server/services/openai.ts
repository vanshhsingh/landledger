import OpenAI from "openai";

// Check if OpenAI API key is available
const apiKey = process.env.OPENAI_API_KEY;
const openai = apiKey ? new OpenAI({ apiKey }) : null;

// Function to generate a response using OpenAI
export async function generateChatResponse(userMessage: string): Promise<string> {
  // If no API key is available, throw an error
  if (!openai) {
    throw new Error("OpenAI API key not configured");
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: `You are LandLedger Assistant, a helpful AI assistant for a real estate website in India. 
          Your job is to assist users with their real estate inquiries, providing helpful and concise information about properties, 
          services, and investment opportunities. You should be knowledgeable about the real estate market in India, 
          common property types, buying/selling processes, and investment considerations. 
          Always be polite, professional, and helpful. Keep responses concise, ideally 2-3 sentences.
          If asked about specific properties or transactions, suggest contacting the LandLedger team directly at +91 9876543210 or info@landledger.com.`
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    return response.choices[0].message.content || "I'm sorry, I couldn't generate a response. Please try asking something else.";
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate response from OpenAI");
  }
}