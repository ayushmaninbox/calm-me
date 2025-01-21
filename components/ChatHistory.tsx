"use client";

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { getChatHistory, type ChatMessage } from '@/lib/supabase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { formatDistanceToNow } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Loader2 } from 'lucide-react';

interface ChatHistoryProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatHistory({ isOpen, onClose }: ChatHistoryProps) {
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchChatHistory() {
      if (!user) return;
      
      try {
        setLoading(true);
        const history = await getChatHistory(user.uid);
        setMessages(history);
      } catch (err) {
        console.error('Error fetching chat history:', err);
        setError('Failed to load chat history');
      } finally {
        setLoading(false);
      }
    }

    if (isOpen) {
      fetchChatHistory();
    }
  }, [user, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>chat history</DialogTitle>
        </DialogHeader>

        <div className="flex-grow overflow-y-auto py-4">
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : error ? (
            <div className="text-center text-destructive p-4">{error}</div>
          ) : messages.length === 0 ? (
            <div className="text-center text-muted-foreground p-4">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>no chat history yet</p>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className={`p-4 mb-2 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-yellow-500/5 ml-8'
                      : 'bg-muted mr-8'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-medium opacity-50">
                      {message.role === 'user' ? 'you' : 'assistant'}
                    </span>
                    <span className="text-xs opacity-50">
                      {formatDistanceToNow(new Date(message.created_at), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <p className="text-sm">{message.content}</p>
                  {message.emotions && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {Object.entries(message.emotions)
                        .sort(([, a], [, b]) => b - a)
                        .slice(0, 3)
                        .map(([emotion, score]) => (
                          <span
                            key={emotion}
                            className="text-xs px-2 py-1 rounded-full bg-background"
                          >
                            {emotion}: {(score * 100).toFixed(0)}%
                          </span>
                        ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}