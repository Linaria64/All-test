import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, X, Send, ExternalLink, Minimize } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import ChatBotConfig, { ApiConfig } from "./ChatBotConfig";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const defaultConfig: ApiConfig = {
  endpoint: "http://localhost:11434/api/generate",
  model: "gemma3:1b",
  temperature: 0.7
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Bonjour ! Je suis votre assistant IA, basé sur le modèle Gemma 3 1B.\n\nJe suis prêt à vous aider. Comment puis-je vous être utile aujourd'hui ?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiConfig, setApiConfig] = useState<ApiConfig>(defaultConfig);
  const [connectionStatus, setConnectionStatus] = useState<"unknown" | "connected" | "error">("unknown");
  const [debugInfo, setDebugInfo] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Test connection on mount and when apiConfig changes
  useEffect(() => {
    const testConnection = async () => {
      try {
        setConnectionStatus("unknown");
        console.log("Testing connection to Ollama API...");
        
        // Test Ollama connection
        const response = await fetch(apiConfig.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: apiConfig.model,
            prompt: "test",
            stream: false
          })
        });
        
        if (response.ok) {
          console.log("Ollama API connection successful");
          setConnectionStatus("connected");
          setDebugInfo(null);
        } else {
          const errorText = await response.text();
          console.error(`Ollama API connection failed: ${response.status} ${response.statusText}`, errorText);
          setConnectionStatus("error");
          setDebugInfo(`Erreur: ${response.status} ${response.statusText} - ${errorText}`);
        }
      } catch (error) {
        console.error("API connection error:", error);
        setConnectionStatus("error");
        setDebugInfo(`Erreur de connexion: ${error instanceof Error ? error.message : String(error)}`);
      }
    };
    
    testConnection();
  }, [apiConfig]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setDebugInfo(null);
    
    try {
      const response = await sendToOllama(input, apiConfig);
      
      // Add assistant response
      const assistantMessage: Message = {
        role: "assistant",
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message to Ollama:", error);
      
      // Add error message
      const errorMessage: Message = {
        role: "assistant",
        content: "Désolé, je n'ai pas pu traiter votre demande. Veuillez vérifier qu'Ollama est en cours d'exécution.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setDebugInfo(`Erreur: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to send message to Ollama
  const sendToOllama = async (prompt: string, config: ApiConfig): Promise<string> => {
    const response = await fetch(config.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: config.model,
        prompt: formatPromptForOllama(messages, prompt),
        stream: false,
        temperature: config.temperature || 0.7
      })
    });
    
    if (!response.ok) {
      throw new Error(`Erreur de l'API Ollama: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.response;
  };

  // Format messages for Ollama
  const formatPromptForOllama = (messageHistory: Message[], newPrompt: string): string => {
    let formattedPrompt = messageHistory
      .map(msg => `${msg.role === "user" ? "Human" : "Assistant"}: ${msg.content}`)
      .join("\n\n");
    
    formattedPrompt += `\n\nHuman: ${newPrompt}\n\nAssistant:`;
    return formattedPrompt;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleConfigSave = (newConfig: ApiConfig) => {
    setApiConfig(newConfig);
    setDebugInfo(null);
    // Ajouter un message système sur le changement de modèle
    setMessages(prev => [
      ...prev,
      {
        role: "assistant",
        content: `Configuration mise à jour. Utilisation du modèle "${newConfig.model}" via Ollama.`,
        timestamp: new Date()
      }
    ]);
  };

  return (
    <>
      {/* Chat button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-[#1a2b4b] via-[#30175f] to-[#1a2b4b] shadow-lg text-white hover:scale-105 transition-all duration-300 flex items-center justify-center"
          aria-label="Open chat"
        >
          <MessageSquare size={24} />
          <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
            connectionStatus === "connected" ? "bg-green-500" : 
            connectionStatus === "error" ? "bg-red-500" : "bg-yellow-500"
          }`}></div>
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 ease-in-out ${
            isMinimized 
              ? 'bottom-6 right-6 w-72 h-14' 
              : 'bottom-6 right-6 w-80 sm:w-96 h-[500px] max-h-[calc(100vh-6rem)]'
          }`}
        >
          {/* Chat container with glass effect */}
          <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#1a2b4b]/30 via-[#30175f]/20 to-[#1a2b4b]/30 blur-md opacity-60"></div>
          <div 
            ref={chatContainerRef}
            className="glass rounded-xl backdrop-blur-md bg-[#0d1321]/30 border border-white/10 shadow-xl overflow-hidden flex flex-col h-full relative"
          >
            {/* Chat header */}
            <div className="p-3 border-b border-white/10 bg-[#1a2b4b]/40 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <MessageSquare size={18} className="text-[#a097c2]" />
                <h3 className="font-medium text-white">Assistant IA</h3>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                  aria-label={isMinimized ? "Expand" : "Minimize"}
                >
                  <Minimize size={14} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                  aria-label="Close"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Messages area - only visible when not minimized */}
            {!isMinimized && (
              <div className="p-4 overflow-y-auto flex-grow">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex flex-col ${
                        message.role === "user" ? "items-end" : "items-start"
                      }`}
                    >
                      <div className={`max-w-[85%] rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-[#30175f]/30 text-white rounded-tr-none"
                          : "bg-[#1a2b4b]/30 text-white rounded-tl-none"
                      }`}>
                        <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                      </div>
                      <span className="text-xs text-white/40 mt-1">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex items-start">
                      <div className="bg-[#1a2b4b]/30 text-white rounded-lg rounded-tl-none p-3">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                          <div className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                          <div className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            )}

            {/* Input area - only visible when not minimized */}
            {!isMinimized && (
              <div className="p-3 border-t border-white/10 bg-[#1a2b4b]/20">
                <div className="flex items-end gap-2">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Saisissez votre message..."
                    className="resize-none min-h-[40px] max-h-[120px] glass border-white/10 focus:border-[#a097c2]/60 bg-black/10 text-sm"
                    disabled={isLoading || connectionStatus === "error"}
                  />
                  <Button
                    onClick={handleSend}
                    disabled={isLoading || !input.trim() || connectionStatus === "error"}
                    size="icon"
                    className={`shrink-0 h-10 w-10 rounded-full ${
                      connectionStatus === "error" ? "bg-red-500/40 cursor-not-allowed" : "bg-[#30175f]/40 hover:bg-[#30175f]/60"
                    } transition-colors`}
                  >
                    <Send size={16} />
                  </Button>
                </div>
                
                {/* API connection information */}
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-xs text-white/40 flex items-center gap-1">
                    <span>Gemma 3 1B</span>
                    <div className={`w-2 h-2 rounded-full ${
                      connectionStatus === "connected" ? "bg-green-500" : 
                      connectionStatus === "error" ? "bg-red-500" : "bg-yellow-500"
                    }`}></div>
                  </div>
                  <button 
                    onClick={() => setIsConfigOpen(true)}
                    className="text-xs text-white/40 flex items-center opacity-60 hover:opacity-100 transition-opacity"
                  >
                    <span>Options</span>
                    <ExternalLink size={10} className="ml-1" />
                  </button>
                </div>
                
                {/* Debugging information */}
                {debugInfo && (
                  <div className="mt-2 p-2 bg-orange-500/10 border border-orange-500/20 rounded-md text-xs text-white/90 max-h-[60px] overflow-y-auto">
                    <p className="font-mono break-words">{debugInfo}</p>
                  </div>
                )}
                
                {/* Connection error message */}
                {connectionStatus === "error" && (
                  <div className="mt-2 p-2 bg-red-500/10 border border-red-500/20 rounded-md text-xs text-white/90">
                    Impossible de se connecter à Ollama. Vérifiez qu'Ollama est en cours d'exécution avec la commande: <code className="bg-black/20 px-1 rounded">ollama pull gemma3:1b</code>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Configuration Modal */}
      <ChatBotConfig
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        config={apiConfig}
        onSave={handleConfigSave}
      />
    </>
  );
};

export default ChatBot; 