
import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{text: string, user: boolean}[]>([
    { text: "👋 Hello! I'm AgriBot, your farming assistant. How can I help you today?", user: false }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { text: input, user: true }]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I'd recommend checking your soil moisture levels before planting.",
        "Based on your location, wheat and barley would be good choices this season.",
        "Would you like me to provide more information about crop rotation?",
        "The weather forecast shows rain in the next 48 hours. Consider delaying fertilizer application.",
        "Market prices for corn have increased by 5% this week. This might be a good time to sell."
      ];
      
      const hindiResponses = [
        "बुवाई से पहले मिट्टी की नमी की जांच करने की सलाह दूंगा।",
        "आपके स्थान के आधार पर, इस मौसम में गेहूं और जौ अच्छे विकल्प होंगे।",
        "क्या आप फसल चक्र के बारे में अधिक जानकारी चाहते हैं?",
        "मौसम पूर्वानुमान अगले 48 घंटों में बारिश दिखाता है। उर्वरक के आवेदन में देरी करने पर विचार करें।",
        "मक्का के बाज़ार मूल्य इस सप्ताह 5% बढ़े हैं। यह बेचने का अच्छा समय हो सकता है।"
      ];
      
      const marathiResponses = [
        "पेरणीपूर्वी मातीच्या ओलाव्याची तपासणी करण्याची शिफारस करेन.",
        "तुमच्या स्थानावर आधारित, या हंगामात गहू आणि बार्ली चांगले पर्याय असतील.",
        "तुम्हाला पीक फेरपालट बद्दल अधिक माहिती हवी आहे का?",
        "हवामान अंदाज पुढील 48 तासांत पाऊस दर्शवतो. खते टाकण्यास विलंब करण्याचा विचार करा.",
        "मक्याच्या बाजारभावात या आठवड्यात 5% वाढ झाली आहे. हा विक्री करण्याचा चांगला काळ असू शकतो."
      ];
      
      const responseList = language === 'hindi' ? hindiResponses : 
                          language === 'marathi' ? marathiResponses : 
                          responses;
      
      const randomResponse = responseList[Math.floor(Math.random() * responseList.length)];
      setIsTyping(false);
      setMessages(prev => [...prev, { text: randomResponse, user: false }]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl bg-primary hover:bg-primary/90"
              onClick={() => setIsOpen(true)}
              aria-label="Open chat assistant"
            >
              <Sparkles className="h-6 w-6 absolute" />
              <Bot className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Card className="w-[350px] h-[500px] shadow-xl flex flex-col border border-primary/20 overflow-hidden rounded-2xl bg-card/95 backdrop-blur-sm">
              <CardHeader className="bg-primary text-primary-foreground py-3 px-4 flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-medium flex items-center">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 5 }}
                  >
                    <Bot className="mr-2 h-5 w-5" />
                  </motion.div>
                  AgriBot Assistant
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full text-primary-foreground hover:bg-primary-foreground/20"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="flex-1 p-0 flex flex-col">
                <ScrollArea className="flex-1 p-4 h-full" ref={scrollAreaRef as any}>
                  <div className="space-y-4">
                    {messages.map((msg, index) => (
                      <motion.div 
                        key={index} 
                        className={`flex ${msg.user ? 'justify-end' : 'justify-start'}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div 
                          className={cn(
                            "max-w-[80%] p-3 rounded-2xl shadow-sm",
                            msg.user 
                              ? "bg-primary text-primary-foreground rounded-tr-none" 
                              : "bg-muted text-foreground rounded-tl-none"
                          )}
                        >
                          {msg.text}
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Typing indicator */}
                    {isTyping && (
                      <motion.div 
                        className="flex justify-start"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div className="bg-muted text-foreground rounded-2xl rounded-tl-none p-3 max-w-[80%]">
                          <span className="flex space-x-1">
                            <motion.span 
                              animate={{ y: [0, -5, 0] }}
                              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.1 }}
                              className="h-2 w-2 bg-primary rounded-full inline-block"
                            />
                            <motion.span 
                              animate={{ y: [0, -5, 0] }}
                              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.2 }}
                              className="h-2 w-2 bg-primary rounded-full inline-block"
                            />
                            <motion.span 
                              animate={{ y: [0, -5, 0] }}
                              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.3 }}
                              className="h-2 w-2 bg-primary rounded-full inline-block"
                            />
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </ScrollArea>
                <div className="p-3 border-t bg-card/80 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <Input 
                      placeholder={t('chatPlaceholder')}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className="flex-1 rounded-full border-primary/20 focus-visible:ring-primary"
                    />
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button 
                        size="icon" 
                        className="rounded-full bg-primary hover:bg-primary/90"
                        onClick={handleSendMessage}
                        aria-label="Send message"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
