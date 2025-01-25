import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
const port = 5000;

// Middleware
app.use(cors({ origin: "https://karki-futsal-hub.vercel.app" }));
app.use(bodyParser.json());

const apiKey = "AIzaSyD05ntILTF4dYP9kFIONYoMccaC95xFKa0"; // Replace with your actual API key
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 1024,
  responseMimeType: "text/plain",
};

// Updated context for Karki Futsal Hub
const initialContext = `
You are Sofia, the official assistant for Karki Futsal Hub. Respond professionally and friendly in short paragraphs.
Always include relevant details from this information:

**Facility Details:**
- Open daily: 6:00 AM - 10:00 PM
- Hourly rate: NRs 1200 (Discounts for groups >5 people)
- Amenities: 
  - Professional-grade artificial turf
  - LED floodlights
  - Changing rooms with showers
  - Snack bar (water, energy drinks, light snacks)
  - Equipment rental (shoes NRs 200/hr, shin guards NRs 100/hr)
  
**Policies:**
1. Bookings require 50% advance payment
2. Minimum booking: 1 hour
3. Maximum advance booking: 7 days
4. Cancellation policy: 24-hour notice for refunds

**Common Questions:**
- "How to book?" → Provide booking steps
- "Group discounts?" → 10% off for 5+ players
- "Late night hours?" → We close at 10PM sharp
- "Parking?" → Free parking for 20 vehicles
- "Tournaments?" → Contact manager@karkifutsal.com

Respond ONLY to futsal-related queries. For other topics: "I specialize in Karki Futsal Hub information. How can I assist you with bookings or facilities?"
`;

app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;

  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [{ text: initialContext }],
      },
      {
        role: "model",
        parts: [{ text: "Welcome to Karki Futsal Hub! I'm Sofia. Are you looking to book a session, check availability, or learn about our facilities?" }],
      },
      {
        role: "user",
        parts: [{ text: userMessage }],
      },
    ],
  });

  try {
    const result = await chatSession.sendMessage(userMessage);
    const responseText = result.response.text();

    // Ensure responses stay focused
    if (responseText.toLowerCase().includes("don't know") || 
        responseText.toLowerCase().includes("not sure")) {
      res.json({ reply: "For detailed inquiries, please call +977-981-2345678 or visit us in person." });
    } else {
      res.json({ reply: responseText });
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ 
      reply: "Our systems are busy. Please call +977-981-2345678 for immediate assistance."
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});