import { useState, useRef, useEffect } from 'react'
import { PaperAirplaneIcon, UserIcon, CpuChipIcon, TrashIcon } from '@heroicons/react/24/outline'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedModel, setSelectedModel] = useState('gpt-4')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const models = [
    { id: 'gpt-4', name: 'GPT-4', description: 'Most capable model, best for complex tasks' },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', description: 'Fast and efficient for most tasks' },
    { id: 'claude-3-opus', name: 'Claude 3 Opus', description: 'Excellent for analysis and reasoning' },
    { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', description: 'Good balance of speed and capability' },
    { id: 'gemini-pro', name: 'Gemini Pro', description: 'Google\'s advanced language model' },
    { id: 'llama-2', name: 'Llama 2', description: 'Open-source alternative' }
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I'm a simulated response from ${models.find(m => m.id === selectedModel)?.name}. You said: "${userMessage.content}". This is where the actual AI response would appear when connected to a real API.`,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  const clearChat = () => {
    setMessages([])
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          AI Chat
        </h1>
        <p className="text-gray-600">
          Have conversations with powerful AI language models
        </p>
      </div>

      {/* Model Selection and Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                AI Model
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {models.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-sm text-gray-500 max-w-xs">
              {models.find(m => m.id === selectedModel)?.description}
            </div>
          </div>
          
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              className="flex items-center px-3 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
            >
              <TrashIcon className="h-4 w-4 mr-2" />
              Clear Chat
            </button>
          )}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <CpuChipIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg">Start a conversation</p>
                <p className="text-sm mt-2">Choose a model and send your first message</p>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-xs sm:max-w-md lg:max-w-lg ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex-shrink-0 ${message.role === 'user' ? 'ml-3' : 'mr-3'}`}>
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      message.role === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-500 text-white'
                    }`}>
                      {message.role === 'user' ? (
                        <UserIcon className="h-5 w-5" />
                      ) : (
                        <CpuChipIcon className="h-5 w-5" />
                      )}
                    </div>
                  </div>
                  <div className={`rounded-lg px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex">
                <div className="flex-shrink-0 mr-3">
                  <div className="h-8 w-8 rounded-full bg-gray-500 text-white flex items-center justify-center">
                    <CpuChipIcon className="h-5 w-5" />
                  </div>
                </div>
                <div className="bg-gray-100 rounded-lg px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-md transition-colors flex items-center"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Chat 