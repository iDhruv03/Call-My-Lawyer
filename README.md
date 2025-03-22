# MyLawyer - AI Legal Assistant

MyLawyer is an AI-powered legal assistant that helps users get answers to their questions about Indian law. The application provides a ChatGPT-like interface where users can ask legal questions and receive accurate responses based on Indian legal knowledge.

## Features

- Modern, responsive UI similar to ChatGPT
- Real-time chat interface
- Powered by Google's Gemini AI for accurate legal responses
- Specialized in Indian law and legal procedures
- Clear and easy-to-understand responses
- Includes relevant legal sections and practical guidance
- Easy-to-use interface

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Google Gemini API key (Free)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mylawyer.git
cd mylawyer
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Gemini API key:
```
REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
```

You can get a Gemini API key by:
1. Going to https://makersuite.google.com/app/apikey
2. Creating a Google Cloud account or signing in
3. Creating a new API key (it's free)

## Running the Application

1. Start the development server:
```bash
npm start
```

2. Open your browser and navigate to `http://localhost:3000`

## Building for Production

To create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

## Important Note

This application provides general legal information based on Indian laws and regulations. While the AI assistant strives to provide accurate information, it is not a substitute for professional legal advice. Users are strongly advised to consult with qualified lawyers for specific legal matters.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 