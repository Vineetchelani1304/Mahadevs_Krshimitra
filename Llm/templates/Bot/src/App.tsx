import { useState } from "react";

interface Message {
  text: string;
  sender: "user" | "bot";
}

const API_URL = "http://127.0.0.1:5000/ask"; // Flask backend

const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");

  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    // Add user message to chat
    const newMessages = [...messages, { text: userInput, sender: "user" }];
    setMessages(newMessages);
    setUserInput("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userInput }),
      });

      const data = await response.json();
      setMessages([...newMessages, { text: data.response, sender: "bot" }]);
    } catch (error) {
      setMessages([...newMessages, { text: "Error: Could not reach the server", sender: "bot" }]);
    }
  };

  return (
    <div className="chat-container">
      <h2>AI Chatbot</h2>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === "user" ? "user-msg" : "bot-msg"}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default App;
