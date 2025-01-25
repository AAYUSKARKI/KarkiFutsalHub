import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, AlertTriangle, X, MessageCircle } from "lucide-react";
import axios from "axios";

interface Message {
  id: string;
  text: string;
  status: "sending" | "sent" | "error";
  isAI: boolean;
}

const ChatUI = ({ onClose }: { onClose: () => void }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: 50 },
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      status: "sending",
      isAI: false,
    };

    const tempAiMessage: Message = {
      id: `temp-${Date.now()}`,
      text: "",
      status: "sending",
      isAI: true,
    };

    setMessages(prev => [...prev, userMessage, tempAiMessage]);
    setIsLoading(true);
    setInput("");

    try {
      const response = await axios.post("https://karkifutsalhub.onrender.com/api/chat", { 
        message: input 
      });

      setMessages(prev =>
        prev.map(msg =>
          msg.id === tempAiMessage.id
            ? { ...msg, text: response.data.reply, status: "sent" }
            : msg
        )
      );
    } catch (error) {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === tempAiMessage.id
            ? {
                ...msg,
                text: "Failed to get response. Please try again.",
                status: "error",
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-20 right-8 w-96 bg-white rounded-xl shadow-2xl flex flex-col border border-gray-200">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="font-semibold">Futsal Assistant</h3>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="flex-1 h-96 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map(message => (
            <motion.div
              key={message.id}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={messageVariants}
              transition={{ duration: 0.3 }}
              className={`flex ${message.isAI ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-xs p-3 rounded-2xl ${
                  message.isAI 
                    ? "bg-gray-100"
                    : "bg-blue-600 text-white"
                } ${
                  message.status === "error" ? "bg-red-100 text-red-800" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  {message.status === "sending" && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  )}
                  {message.status === "error" && (
                    <AlertTriangle className="h-4 w-4" />
                  )}
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <div className="sticky bottom-0 bg-white border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === "Enter" && sendMessage()}
            placeholder="Ask about court availability..."
            className="flex-1 p-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={isLoading}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={sendMessage}
            disabled={isLoading}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default function ChatAssistant() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <button
        className="fixed bottom-8 right-8 bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-110"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <ChatUI onClose={() => setIsChatOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}