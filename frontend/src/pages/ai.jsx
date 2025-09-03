import axios from "axios";
import { useState } from "react";
import { AiAPI } from "../api";

export default function GeminiAIComponent() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handlePromptSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      // const res = await axios.post(
      //   "http://localhost:5000/api/gemini/generate-text",
        // {
        //   prompt: `You are an AI that only talks about InfoBeans Technology and InfoBeans Foundation. 
        //   You must cover the following topics:
        //   - Services of InfoBeans Technology and its AI initiatives
        //   - Social work and CSR of InfoBeans Foundation
        //   - Details about ITEP (Information Technology Excellence Programme)
        //   - Environmental and community initiatives
        //   Answer the user’s question strictly within the context of these topics.

        //   User question: ${input}`,
        // }
      // );

      const res = await AiAPI.ask(  {
          prompt: `You are an AI that only talks about InfoBeans Technology and InfoBeans Foundation. 
          You must cover the following topics:
          - Services of InfoBeans Technology and its AI initiatives
          - Social work and CSR of InfoBeans Foundation
          - Details about ITEP (Information Technology Excellence Programme)
          - Environmental and community initiatives
          Answer the user’s question strictly within the context of these topics.

          User question: ${input}`,
        })

      // Add Gemini reply
      setMessages([...newMessages, { role: "ai", text: res.reply }]);
    } catch (err) {
      console.error("Frontend request error:", err);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-red-700 w-48 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-600 font-bold"
        >
          ASK ME ABOUT INFOBEANS
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[460px] h-[500px] bg-white border rounded-xl shadow-xl flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center bg-red-700 text-white px-3 py-2 rounded-t-xl">
            <span className="font-semibold">
              InfoBeans Foundation - Help Desk
            </span>
            <button onClick={() => setIsOpen(false)} className="text-sm">
              ✖
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg max-w-[70%] ${
                  msg.role === "user"
                    ? "bg-blue-100 self-end ml-auto"
                    : "bg-gray-100 self-start mr-auto"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Box */}
          <form onSubmit={handlePromptSubmit} className="flex border-t">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 text-sm outline-none"
            />
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 text-sm hover:bg-red-700"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
