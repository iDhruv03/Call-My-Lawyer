import React, { useState, useRef, useEffect } from 'react';
import { getLegalResponse } from './services/legalService';
import './App.css';

interface Message {
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getLegalResponse(input);
      const assistantMessage: Message = {
        type: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        type: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again later.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>MyLawyer AI</h1>
        <p className="subtitle">Your Personal Legal Assistant</p>
      </header>
      
      <main className="chat-container">
        <div className="messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.type === 'user' ? 'user-message' : 'assistant-message'}`}
            >
              <div className="message-content">
                {message.type === 'assistant' ? (
                  <div className="assistant-response">
                    <div className="response-header">
                      <span className="assistant-icon">⚖️</span>
                      <span className="response-title">Legal Analysis</span>
                    </div>
                    <div className="response-body">
                      {message.content.split('\n').map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                    <div className="response-footer">
                      <span className="timestamp">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                      <span className="disclaimer">
                        This is AI-generated advice. Consult a lawyer for specific legal guidance.
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="user-message-content">
                    <p>{message.content}</p>
                    <span className="timestamp">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message assistant-message">
              <div className="message-content">
                <div className="assistant-response">
                  <div className="response-header">
                    <span className="assistant-icon">⚖️</span>
                    <span className="response-title">Analyzing your case...</span>
                  </div>
                  <div className="loading-indicator">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-container">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Describe your legal situation..."
            rows={3}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="send-button"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </main>

      <footer className="app-footer">
        <p>Made with ❤️ by Dhruv</p>
      </footer>
    </div>
  );
}

export default App; 