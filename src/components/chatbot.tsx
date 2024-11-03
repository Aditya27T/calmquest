'use client'
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Minimize2, Maximize2, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { analyzeStressLevel, generateResponse } from '@/lib/chat-utils';
import type { Message } from '@/types';

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  content: "Halo! Saya asisten CalmQuest. Bagaimana perasaan Anda hari ini?",
  sender: 'bot',
  timestamp: new Date(),
  needsFeedback: false
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>(Date.now().toString());
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Reset chat tapi tetap simpan training data
  const resetChat = () => {
    // Simpan chat saat ini ke training data sebelum reset
    const chatToSave = messages.filter(msg => msg.id !== 'welcome');
    if (chatToSave.length > 0) {
      saveChatToTraining(chatToSave);
    }

    // Reset state
    setMessages([WELCOME_MESSAGE]);
    setInputMessage('');
    setSessionId(Date.now().toString());
  };

  // Simpan seluruh chat ke training data
  const saveChatToTraining = async (chatMessages: Message[]) => {
    try {
      // Ambil pasangan pesan user dan bot
      for (let i = 0; i < chatMessages.length - 1; i++) {
        const userMessage = chatMessages[i];
        const botMessage = chatMessages[i + 1];
        
        if (userMessage.sender === 'user' && botMessage.sender === 'bot') {
          await fetch('/api/training/save', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userMessage: userMessage.content,
              botResponse: botMessage.content,
              stressLevel: botMessage.stressLevel || 'medium',
              timestamp: botMessage.timestamp,
              sessionId: sessionId,
              effectiveness: botMessage.feedback ? 5 : undefined
            })
          });
        }
      }
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputMessage.trim()) return;
  
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
  
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
  
    try {
      const stressLevel = await analyzeStressLevel(inputMessage);
      
      const botResponse = await generateResponse(inputMessage, stressLevel);
  
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        stressLevel,
        needsFeedback: true
      };
  
      setMessages(prev => [...prev, botMessage]);  
      try {
        await fetch('/api/training/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userMessage: inputMessage,
            botResponse,
            stressLevel,
            timestamp: new Date(),
            sessionId
          })
        });
      } catch (error) {
        console.error('Error saving to training data:', error);
      }
  
    } catch (error) {
      console.error('Error in chat:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: "Maaf, terjadi kesalahan. Silakan coba lagi.",
        sender: 'bot',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = async (messageId: string, isPositive: boolean) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, needsFeedback: false, feedback: isPositive } 
        : msg
    ));

    const messageIndex = messages.findIndex(m => m.id === messageId);
    if (messageIndex > 0 && messageIndex < messages.length) {
      const botMessage = messages[messageIndex];
      const userMessage = messages[messageIndex - 1];

      await fetch('/api/training/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userMessage: userMessage.content,
          botResponse: botMessage.content,
          stressLevel: botMessage.stressLevel!,
          effectiveness: isPositive ? 5 : 1,
          timestamp: botMessage.timestamp,
          sessionId
        })
      });
    }
  };

  const toggleChat = () => {
    if (isOpen) {
      // Saat menutup chat, simpan dan reset
      resetChat();
    }
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="rounded-full w-14 h-14 bg-purple-700 hover:bg-purple-800 text-white shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {isOpen && (
        <Card className={`
          bg-white shadow-xl transition-all duration-300 ease-in-out
          ${isMinimized ? 'h-14 w-72' : 'w-72 h-96'}
        `}>
          {/* Header */}
          <div className="flex items-center justify-between p-3 bg-purple-700 text-white rounded-t-lg">
            <span className="font-medium">CalmQuest Assistant</span>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:text-purple-200"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:text-purple-200"
                onClick={toggleChat}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <ScrollArea className="h-64 p-4">
                <div className="flex flex-col gap-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex flex-col ${
                        message.sender === 'user' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-purple-700 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {message.content}
                      </div>
                      
                      {message.sender === 'bot' && message.needsFeedback && (
                        <div className="flex gap-2 mt-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 hover:text-green-600"
                            onClick={() => handleFeedback(message.id, true)}
                          >
                            <ThumbsUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 hover:text-red-600"
                            onClick={() => handleFeedback(message.id, false)}
                          >
                            <ThumbsDown className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <span className="animate-pulse">...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              <div className="p-3 border-t">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex gap-2"
                >
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ketik pesan Anda..."
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={isLoading || !inputMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </>
          )}
        </Card>
      )}
    </div>
  );
};

export default ChatBot;