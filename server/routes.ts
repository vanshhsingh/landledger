import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema } from "@shared/schema";
import { z } from "zod";
import { generateChatResponse } from "./services/openai";

// Chat message schema
const chatMessageSchema = z.object({
  message: z.string().min(1, "Message is required"),
});

// Function to generate rule-based responses
function getRuleBasedResponse(message: string): string {
  const normalizedMessage = message.toLowerCase().trim();
  
  // Property related queries
  if (normalizedMessage.includes('property') || normalizedMessage.includes('properties') || normalizedMessage.includes('home') || normalizedMessage.includes('house')) {
    if (normalizedMessage.includes('buy') || normalizedMessage.includes('purchase')) {
      return "I can help you with purchasing a property! Our expert team at LandLedger can guide you through the entire buying process. Would you like to browse our available properties or speak with a buying agent?";
    } else if (normalizedMessage.includes('sell')) {
      return "Looking to sell your property? Our team at LandLedger can help you get the best value. We offer free property valuation and marketing services. Would you like to schedule a consultation with one of our selling agents?";
    } else if (normalizedMessage.includes('rent') || normalizedMessage.includes('lease')) {
      return "We have many properties available for rent. You can view all our rental listings on the Properties page and filter by your preferred location and budget. Would you like me to guide you to our rental section?";
    } else if (normalizedMessage.includes('price') || normalizedMessage.includes('cost') || normalizedMessage.includes('expensive')) {
      return "Property prices vary based on location, size, and amenities. We have properties ranging from affordable apartments to luxury villas. You can use our search filters to find properties within your budget. What price range are you looking for?";
    } else {
      return "We have a wide range of properties available. You can browse them on our Properties page or let me know more specifically what type of property you're looking for?";
    }
  } else if (normalizedMessage.includes('invest') || normalizedMessage.includes('investment') || normalizedMessage.includes('return')) {
    return "Real estate investment is a great way to grow your wealth. Our Investment Advisory service provides expert guidance on market trends, property valuation, and investment strategies. Would you like to learn more about our investment services?";
  } else if (normalizedMessage.includes('service') || normalizedMessage.includes('help')) {
    return "LandLedger offers a range of services including Property Management, Investment Advisory, and Buying & Selling assistance. You can learn more about each service on our Services page. Which service are you interested in?";
  } else if (normalizedMessage.includes('location') || normalizedMessage.includes('area') || normalizedMessage.includes('where')) {
    return "We have properties across major cities and growing neighborhoods across India. You can filter properties by location on our Properties page. Is there a specific area you're interested in?";
  } else if (normalizedMessage.includes('contact') || normalizedMessage.includes('call') || normalizedMessage.includes('email') || normalizedMessage.includes('reach')) {
    return "You can reach our team through the Contact page on our website. Alternatively, you can call us at +91 9876543210 or email at info@landledger.com. Would you like me to direct you to our contact page?";
  } else if (normalizedMessage.includes('hi') || normalizedMessage.includes('hello') || normalizedMessage.includes('hey')) {
    return "Hello! How can I assist you with your real estate needs today?";
  } else if (normalizedMessage.includes('thank') || normalizedMessage.includes('thanks')) {
    return "You're welcome! Is there anything else I can help you with?";
  } else {
    return "I'd be happy to help with that. For more specific information, you might want to contact our team directly through the Contact page or call us at +91 9876543210. Is there something specific about real estate I can try to assist you with?";
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // GET all properties
  app.get("/api/properties", async (req, res) => {
    try {
      // Parse query parameters for filtering
      const location = req.query.location as string;
      const propertyType = req.query.propertyType as string;
      const priceRange = req.query.priceRange as string;
      const bedrooms = req.query.bedrooms as string;

      const properties = await storage.getProperties(
        location,
        propertyType,
        priceRange,
        bedrooms
      );

      res.json(properties);
    } catch (error) {
      console.error("Error fetching properties:", error);
      res.status(500).json({ message: "Failed to fetch properties" });
    }
  });

  // GET featured properties
  app.get("/api/properties/featured", async (req, res) => {
    try {
      const featuredProperties = await storage.getFeaturedProperties();
      res.json(featuredProperties);
    } catch (error) {
      console.error("Error fetching featured properties:", error);
      res.status(500).json({ message: "Failed to fetch featured properties" });
    }
  });

  // GET property by ID
  app.get("/api/properties/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid property ID" });
      }

      const property = await storage.getPropertyById(id);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }

      res.json(property);
    } catch (error) {
      console.error("Error fetching property:", error);
      res.status(500).json({ message: "Failed to fetch property" });
    }
  });

  // POST contact inquiry
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertInquirySchema.parse({
        ...req.body,
        createdAt: new Date().toISOString(),
      });

      const inquiry = await storage.createInquiry(validatedData);
      res.status(201).json(inquiry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating inquiry:", error);
      res.status(500).json({ message: "Failed to submit inquiry" });
    }
  });

  // POST property inquiry (specific property)
  app.post("/api/properties/:id/inquire", async (req, res) => {
    try {
      const propertyId = parseInt(req.params.id);
      if (isNaN(propertyId)) {
        return res.status(400).json({ message: "Invalid property ID" });
      }

      const property = await storage.getPropertyById(propertyId);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }

      const validatedData = insertInquirySchema.parse({
        ...req.body,
        propertyId,
        createdAt: new Date().toISOString(),
      });

      const inquiry = await storage.createInquiry(validatedData);
      res.status(201).json(inquiry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating property inquiry:", error);
      res.status(500).json({ message: "Failed to submit inquiry" });
    }
  });

  // POST chatbot message with OpenAI integration
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = chatMessageSchema.parse(req.body);
      let response = "";
      
      // Try to use OpenAI if API key is available
      if (process.env.OPENAI_API_KEY) {
        try {
          // Use OpenAI for a more intelligent response
          response = await generateChatResponse(message);
          console.log("Using OpenAI response");
        } catch (openaiError) {
          console.error("OpenAI error, falling back to rule-based responses:", openaiError);
          // Fall back to rule-based responses if OpenAI fails
          response = getRuleBasedResponse(message);
        }
      } else {
        // Use rule-based responses if no OpenAI API key
        console.log("No OpenAI API key, using rule-based responses");
        response = getRuleBasedResponse(message);
      }
      
      res.json({ response });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid message", errors: error.errors });
      }
      console.error("Error processing chat message:", error);
      res.status(500).json({ message: "Failed to process message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
