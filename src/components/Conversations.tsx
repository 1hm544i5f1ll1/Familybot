import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MessageSquare, 
  Phone, 
  User, 
  Clock,
  CheckCircle,
  AlertCircle,
  Languages,
  Mic,
  Image,
  FileText,
  MapPin
} from 'lucide-react';

const Conversations: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const conversations = [
    {
      id: '1',
      name: 'Sarah Johnson',
      phone: '+1 (555) 123-4567',
      lastMessage: 'Can you help me with my child\'s homework schedule?',
      timestamp: '2 minutes ago',
      unread: 3,
      status: 'active',
      role: 'Parent',
      avatar: '👩‍💼'
    },
    {
      id: '2',
      name: 'Ahmed Al-Rashid',
      phone: '+966 50 123 4567',
      lastMessage: 'مرحبا، أحتاج مساعدة في الترجمة',
      timestamp: '15 minutes ago',
      unread: 1,
      status: 'active',
      role: 'Parent',
      avatar: '👨‍💼'
    },
    {
      id: '3',
      name: 'Emily Davis',
      phone: '+1 (555) 987-6543',
      lastMessage: 'Travel planning for summer vacation completed ✅',
      timestamp: '1 hour ago',
      unread: 0,
      status: 'completed',
      role: 'Family',
      avatar: '👩‍🎓'
    },
    {
      id: '4',
      name: 'Class 5A Group',
      phone: 'Group Chat',
      lastMessage: 'Homework reminder sent to all parents',
      timestamp: '2 hours ago',
      unread: 0,
      status: 'broadcast',
      role: 'School',
      avatar: '🎓'
    },
  ];

  const messages = [
    {
      id: '1',
      sender: 'user',
      content: 'Can you help me with my child\'s homework schedule?',
      timestamp: '10:30 AM',
      type: 'text'
    },
    {
      id: '2',
      sender: 'bot',
      content: 'Of course! I\'d be happy to help you organize your child\'s homework schedule. Could you tell me which grade they\'re in and what subjects they need help with?',
      timestamp: '10:31 AM',
      type: 'text'
    },
    {
      id: '3',
      sender: 'user',
      content: 'She\'s in Grade 5 and needs help with Math and Science',
      timestamp: '10:32 AM',
      type: 'text'
    },
    {
      id: '4',
      sender: 'bot',
      content: 'Perfect! I\'ve created a personalized homework schedule for Grade 5 Math and Science. Here\'s what I recommend:\n\n📚 **Daily Schedule:**\n• Math: 30 minutes (4:00-4:30 PM)\n• Science: 20 minutes (4:45-5:05 PM)\n\nWould you like me to set up reminders for these times?',
      timestamp: '10:33 AM',
      type: 'text'
    },
    {
      id: '5',
      sender: 'user',
      content: '🎤 Voice message',
      timestamp: '10:34 AM',
      type: 'voice'
    },
  ];

  const filteredConversations = conversations.filter(conv => {
    if (filterStatus === 'all') return true;
    return conv.status === filterStatus;
  });

  return (
    <div className="flex h-full bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Conversations</h2>
            <div className="flex items-center space-x-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="broadcast">Broadcast</option>
              </select>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
            />
          </div>
        </div>

        <div className="overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
              className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                selectedConversation === conversation.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-lg">
                    {conversation.avatar}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {conversation.name}
                    </p>
                    <div className="flex items-center space-x-2">
                      {conversation.unread > 0 && (
                        <span className="bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {conversation.unread}
                        </span>
                      )}
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {conversation.timestamp}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate mt-1">
                    {conversation.lastMessage}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      conversation.role === 'Parent' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      conversation.role === 'Family' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {conversation.role}
                    </span>
                    <div className={`w-2 h-2 rounded-full ${
                      conversation.status === 'active' ? 'bg-green-500' :
                      conversation.status === 'completed' ? 'bg-gray-400' : 'bg-blue-500'
                    }`}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-lg">
                    👩‍💼
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Sarah Johnson</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Parent • +1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <Languages className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <Phone className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    {message.type === 'voice' ? (
                      <div className="flex items-center space-x-2">
                        <Mic className="h-4 w-4" />
                        <span className="text-sm">Voice message (0:15)</span>
                        <button className="ml-2 p-1 rounded-full bg-white/20 hover:bg-white/30">
                          ▶️
                        </button>
                      </div>
                    ) : (
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    )}
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Type a message or command..."
                    className="w-full px-4 py-2 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                    <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <Image className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <Mic className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No conversation selected</h3>
              <p className="text-gray-500 dark:text-gray-400">Choose a conversation from the left to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Conversations;