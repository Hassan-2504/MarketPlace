import React, { createContext, useContext, useState, useEffect } from 'react';
import { Conversation, Message } from '../types';
import { useAuth } from './AuthContext';

interface ChatContextType {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  messages: Message[];
  isLoading: boolean;
  loadConversations: () => Promise<void>;
  selectConversation: (conversationId: string) => void;
  sendMessage: (content: string, type?: 'text' | 'image' | 'video', mediaUrl?: string) => Promise<void>;
  markAsRead: (conversationId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Mock data for demonstration
const mockConversations: Conversation[] = [
  {
    id: '1',
    participants: [
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        avatar: 'https://picsum.photos/100/100?random=10',
        joinedDate: '2023-01-15T10:00:00Z',
      },
    ],
    lastMessage: {
      id: '101',
      senderId: '2',
      receiverId: '1',
      content: 'Is this still available?',
      timestamp: new Date().toISOString(),
      isRead: false,
      type: 'text',
    },
    unreadCount: 1,
    product: {
      id: '1',
      title: 'iPhone 13 Pro - Excellent Condition',
      images: ['https://picsum.photos/400/400?random=1'],
      price: 799,
    } as any,
  },
  {
    id: '2',
    participants: [
      {
        id: '3',
        name: 'Mike Chen',
        email: 'mike@example.com',
        avatar: 'https://picsum.photos/100/100?random=11',
        joinedDate: '2023-06-20T10:00:00Z',
      },
    ],
    lastMessage: {
      id: '102',
      senderId: '1',
      receiverId: '3',
      content: 'Thanks for your interest!',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      isRead: true,
      type: 'text',
    },
    unreadCount: 0,
    product: {
      id: '2',
      title: 'Samsung 55" 4K Smart TV',
      images: ['https://picsum.photos/400/400?random=3'],
      price: 350,
    } as any,
  },
];

const mockMessages: Message[] = [
  {
    id: '100',
    senderId: '1',
    receiverId: '2',
    content: 'Hi! I am interested in your iPhone.',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    isRead: true,
    type: 'text',
  },
  {
    id: '101',
    senderId: '2',
    receiverId: '1',
    content: 'Is this still available?',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    isRead: false,
    type: 'text',
  },
];

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadConversations();
    }
  }, [user]);

  const loadConversations = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement actual API call to fetch conversations
      await new Promise(resolve => setTimeout(resolve, 500));
      setConversations(mockConversations);
    } catch (error) {
      console.error('Error loading conversations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectConversation = (conversationId: string) => {
    const conversation = conversations.find(c => c.id === conversationId);
    setCurrentConversation(conversation || null);
    
    // TODO: Load messages for this conversation
    setMessages(mockMessages);
    markAsRead(conversationId);
  };

  const sendMessage = async (content: string, type: 'text' | 'image' | 'video' = 'text', mediaUrl?: string) => {
    if (!currentConversation || !user) return;

    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      senderId: user.id,
      receiverId: currentConversation.participants[0].id,
      content,
      timestamp: new Date().toISOString(),
      isRead: false,
      type,
      mediaUrl,
    };

    setMessages(prev => [...prev, newMessage]);

    // Update conversation's last message
    setConversations(prev =>
      prev.map(c =>
        c.id === currentConversation.id
          ? {
              ...c,
              lastMessage: newMessage,
            }
          : c
      )
    );

    // TODO: Implement actual API call to send message
  };

  const markAsRead = (conversationId: string) => {
    setConversations(prev =>
      prev.map(c =>
        c.id === conversationId
          ? {
              ...c,
              unreadCount: 0,
              lastMessage: {
                ...c.lastMessage,
                isRead: true,
              },
            }
          : c
      )
    );
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        currentConversation,
        messages,
        isLoading,
        loadConversations,
        selectConversation,
        sendMessage,
        markAsRead,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
