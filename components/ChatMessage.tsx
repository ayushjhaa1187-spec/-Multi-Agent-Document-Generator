'use client';

import { type Message } from 'ai';
import { memo } from 'react';

interface ChatMessageProps {
  message: Message;
  stage: 'clarify' | 'generate';
}

const ChatMessage = memo(({ message, stage }: ChatMessageProps) => {
  return (
    <div
      className={`p-4 rounded-lg ${
        message.role === 'user'
          ? 'bg-indigo-100 ml-8'
          : 'bg-gray-100 mr-8'
      }`}
    >
      <div className="font-semibold text-sm mb-1 text-gray-600">
        {message.role === 'user'
          ? 'You'
          : stage === 'clarify'
          ? 'BRD Planner'
          : 'Requirement Writer'}
      </div>
      <div className="text-gray-800 whitespace-pre-wrap">
        {message.content}
      </div>
    </div>
  );
});

ChatMessage.displayName = 'ChatMessage';

export default ChatMessage;
