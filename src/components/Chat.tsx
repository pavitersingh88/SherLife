import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { useAuth0 } from '@auth0/auth0-react';
import { Send } from 'lucide-react';
import { db } from '../config/firebase';
import type { Message } from '../types';

interface ChatProps {
  listingId: string;
  sellerId: string;
  onClose: () => void;
}

function Chat({ listingId, sellerId, onClose }: ChatProps) {
  const { user } = useAuth0();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (!user) return;

    const chatQuery = query(
      collection(db, 'chats'),
      where('listingId', '==', listingId),
      where('participants', 'array-contains', user.sub),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(chatQuery, (snapshot) => {
      const newMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[];
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, [listingId, user]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    try {
      await addDoc(collection(db, 'chats'), {
        listingId,
        content: newMessage,
        senderId: user.sub,
        senderName: user.name,
        receiverId: sellerId,
        timestamp: new Date(),
        participants: [user.sub, sellerId]
      });
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">Chat with Seller</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>
        
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.senderId === user?.sub ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.senderId === user?.sub
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <span className="text-xs opacity-75">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={sendMessage} className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chat; 