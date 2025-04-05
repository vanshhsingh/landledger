import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTimes, faComment, faSpinner } from '@fortawesome/free-solid-svg-icons';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    text: 'Hello! I\'m the LandLedger assistant. How can I help you with your real estate needs today?',
    sender: 'bot',
    timestamp: new Date()
  }
];

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    try {
      // Get bot response based on user message
      const botResponse = await getBotResponse(newMessage);
      
      // Add bot response with a small delay to simulate thinking
      setTimeout(() => {
        const botMessage: Message = {
          text: botResponse,
          sender: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      console.error("Error getting bot response:", error);
      
      // Send error message
      setTimeout(() => {
        const errorMessage: Message = {
          text: "I'm sorry, I couldn't process your request. Please try again later.",
          sender: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, errorMessage]);
        setIsTyping(false);
      }, 1000);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat toggle button */}
      <button 
        onClick={toggleChat}
        className="w-14 h-14 rounded-full bg-primary hover:bg-blue-700 text-white flex items-center justify-center shadow-lg transition-all duration-200 focus:outline-none"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <FontAwesomeIcon icon={isOpen ? faTimes : faComment} className="text-xl" />
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden flex flex-col border border-gray-200 dark:border-gray-700">
          {/* Chat header */}
          <div className="bg-primary dark:bg-blue-800 text-white p-4 flex items-center justify-between">
            <h3 className="font-medium">LandLedger Assistant</h3>
            <button 
              onClick={toggleChat}
              className="text-white hover:text-gray-200"
              aria-label="Close chat"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          
          {/* Chat messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
              >
                <div 
                  className={`inline-block p-3 rounded-lg max-w-[80%] ${
                    message.sender === 'user' 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
                  }`}
                >
                  {message.text}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="mb-4 text-left">
                <div className="inline-block p-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
                  <FontAwesomeIcon icon={faSpinner} spin /> Typing...
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat input */}
          <form onSubmit={handleSendMessage} className="p-2 border-t border-gray-200 dark:border-gray-700 flex">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-blue-700 text-white p-2 rounded-r-md"
              disabled={!newMessage.trim()}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

// Function to generate bot responses based on user input
async function getBotResponse(userMessage: string): Promise<string> {
  try {
    // First try to use the server endpoint
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    });

    // If the server responds successfully, use that response
    if (response.ok) {
      const data = await response.json();
      return data.response;
    }
    
    // If server fails, fall back to client-side responses
    console.warn('Falling back to client-side bot responses');
    return getClientSideBotResponse(userMessage);
  } catch (error) {
    // Network or other error, fall back to client-side responses
    console.error('Error with chat API, using fallback:', error);
    return getClientSideBotResponse(userMessage);
  }
}

// Fallback client-side responses if the server is unavailable
function getClientSideBotResponse(userMessage: string): string {
  // Simple rule-based responses
  const normalizedMessage = userMessage.toLowerCase().trim();
  
  // Property related queries
  if (normalizedMessage.includes('property') || normalizedMessage.includes('properties') || normalizedMessage.includes('home') || normalizedMessage.includes('house')) {
    if (normalizedMessage.includes('buy') || normalizedMessage.includes('purchase')) {
      return "I can help you with purchasing a property! Our expert team at LandLedger can guide you through the entire buying process. Would you like to browse our available properties or speak with a buying agent?";
    }
    
    if (normalizedMessage.includes('sell')) {
      return "Looking to sell your property? Our team at LandLedger can help you get the best value. We offer free property valuation and marketing services. Would you like to schedule a consultation with one of our selling agents?";
    }
    
    if (normalizedMessage.includes('rent') || normalizedMessage.includes('lease')) {
      return "We have many properties available for rent. You can view all our rental listings on the Properties page and filter by your preferred location and budget. Would you like me to guide you to our rental section?";
    }
    
    if (normalizedMessage.includes('price') || normalizedMessage.includes('cost') || normalizedMessage.includes('expensive')) {
      return "Property prices vary based on location, size, and amenities. We have properties ranging from affordable apartments to luxury villas. You can use our search filters to find properties within your budget. What price range are you looking for?";
    }
    
    return "We have a wide range of properties available. You can browse them on our Properties page or let me know more specifically what type of property you're looking for?";
  }
  
  // Investment related queries
  if (normalizedMessage.includes('invest') || normalizedMessage.includes('investment') || normalizedMessage.includes('return')) {
    return "Real estate investment is a great way to grow your wealth. Our Investment Advisory service provides expert guidance on market trends, property valuation, and investment strategies. Would you like to learn more about our investment services?";
  }
  
  // Services related queries
  if (normalizedMessage.includes('service') || normalizedMessage.includes('help')) {
    return "LandLedger offers a range of services including Property Management, Investment Advisory, and Buying & Selling assistance. You can learn more about each service on our Services page. Which service are you interested in?";
  }
  
  // Location related queries
  if (normalizedMessage.includes('location') || normalizedMessage.includes('area') || normalizedMessage.includes('where')) {
    return "We have properties across major cities and growing neighborhoods in India. You can filter properties by location on our Properties page. Is there a specific area you're interested in?";
  }
  
  // Contact related queries
  if (normalizedMessage.includes('contact') || normalizedMessage.includes('call') || normalizedMessage.includes('email') || normalizedMessage.includes('reach')) {
    return "You can reach our team through the Contact page on our website. Alternatively, you can call us at +91 9876543210 or email at info@landledger.com. Would you like me to direct you to our contact page?";
  }
  
  // Greetings
  if (normalizedMessage.includes('hi') || normalizedMessage.includes('hello') || normalizedMessage.includes('hey')) {
    return "Hello! How can I assist you with your real estate needs today?";
  }
  
  // Thanks
  if (normalizedMessage.includes('thank') || normalizedMessage.includes('thanks')) {
    return "You're welcome! Is there anything else I can help you with?";
  }
  
  // Default response for unrecognized queries
  return "I'd be happy to help with that. For more specific information, you might want to contact our team directly through the Contact page or call us at +91 9876543210. Is there something specific about real estate I can try to assist you with?";
}

export default ChatBot;