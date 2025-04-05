# LandLedger - Real Estate Platform

A comprehensive React-based real estate platform designed to simplify property discovery, management, and advisory services for the Indian market.

## Key Features

- **Interactive Property Listings**: Browse through a wide range of properties with detailed information
- **Advanced Search Functionality**: Filter properties based on location, type, price range, and more
- **User-friendly Inquiry Management**: Easily send inquiries about properties of interest
- **AI-powered Chatbot**: Get instant answers to your real estate questions with our intelligent assistant
- **Responsive Design**: Enjoy a seamless experience across desktop, tablet, and mobile devices
- **Dark Mode Support**: Choose between light and dark themes based on your preference

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Express.js, Node.js
- **State Management**: React Query
- **AI Integration**: OpenAI API
- **Styling**: Tailwind CSS with customizable themes

## Getting Started

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```

### Running Locally

```
npm run dev
```

This will start both the frontend and backend servers concurrently.

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
OPENAI_API_KEY=your_openai_api_key (optional for enhanced chatbot functionality)
```

## Project Structure

- `/client`: Frontend React application
  - `/src/components`: Reusable UI components
  - `/src/pages`: Page components
  - `/src/hooks`: Custom React hooks
  - `/src/lib`: Utility functions and configurations
- `/server`: Backend Express application
  - `/services`: Service modules (OpenAI, etc.)
  - `/storage.ts`: Data storage implementation
  - `/routes.ts`: API route definitions
- `/shared`: Shared types and schemas

## Deployment

This project is configured for easy deployment on Replit.

## License

MIT