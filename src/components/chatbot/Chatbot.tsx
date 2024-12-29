import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import "./chatbot.css";

// Type definitions
interface Message {
  text: string;
  sender: "user" | "bot";
}

interface ChatbotEntry {
  question: string;
  answer: string;
}

// Async function to load the JSON data
const loadJSON = async (): Promise<ChatbotEntry[] | null> => {
  try {
    const response = await fetch("./response.json");
    const data: ChatbotEntry[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading JSON file:", error);
    return null;
  }
};

// Function to find the best response from the JSON data
const findResponse = (data: ChatbotEntry[], userMessage: string): string => {
  const messageLower = userMessage.toLowerCase();
  let bestMatch = { score: 0, answer: "Sorry, please contact us for more details." };

  for (const entry of data) {
    const questionLower = entry.question.toLowerCase();
    const words = questionLower.split(" ");
    let score = 0;

    words.forEach((word) => {
      if (messageLower.includes(word)) {
        score++;
      }
    });

    if (score > bestMatch.score) {
      bestMatch = { score, answer: entry.answer };
    }
  }

  return bestMatch.answer;
};

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  const handleSend = async () => {
    if (input.trim()) {
      const newMessages: Message[] = [...messages, { text: input, sender: "user" }];
      setMessages(newMessages);
      setInput("");

      // Simulate a "thinking" response
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Thinking...", sender: "bot" }
      ]);

      // Get the response from the JSON file
      const jsonData = await loadJSON();
      const botResponse = jsonData ? findResponse(jsonData, input) : "Error: Unable to fetch data.";

      // Update the chat with the bot's response
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1), 
        { text: botResponse, sender: "bot" }
      ]);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="minimized-chatbot">
      {isOpen ? (
        <div className="chatbot-container">
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="chatbot-input"
          />
          <button onClick={handleSend} className="send-button">Send</button>
          <button onClick={() => setIsOpen(false)} className="close-button">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      ) : (
        <div className="minimized-button" onClick={() => setIsOpen(true)}>
          <i className="fa-regular fa-message"></i>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
