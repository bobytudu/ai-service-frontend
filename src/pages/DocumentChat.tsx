import { useState, useRef, useEffect } from 'react'
import { 
  PaperAirplaneIcon, 
  UserIcon, 
  CpuChipIcon, 
  TrashIcon,
  DocumentTextIcon,
  CloudArrowUpIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  sources?: string[]
}

interface Document {
  id: string
  name: string
  size: number
  type: string
  uploadedAt: Date
}

const DocumentChat = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedModel, setSelectedModel] = useState('gpt-4')
  const [documents, setDocuments] = useState<Document[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const models = [
    { id: 'gpt-4', name: 'GPT-4', description: 'Best for complex document analysis' },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', description: 'Fast and efficient for most documents' },
    { id: 'claude-3-opus', name: 'Claude 3 Opus', description: 'Excellent for long documents' },
    { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', description: 'Good balance for document Q&A' },
    { id: 'gemini-pro', name: 'Gemini Pro', description: 'Strong document understanding' }
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return

    Array.from(files).forEach(file => {
      if (file.type === 'application/pdf' || file.type.startsWith('text/') || file.name.endsWith('.docx')) {
        const newDocument: Document = {
          id: Date.now().toString(),
          name: file.name,
          size: file.size,
          type: file.type,
          uploadedAt: new Date()
        }
        setDocuments(prev => [...prev, newDocument])
      }
    })
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    handleFileUpload(e.dataTransfer.files)
  }

  const removeDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading || documents.length === 0) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate API call with document context
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Based on the uploaded documents (${documents.map(d => d.name).join(', ')}), here's my response using ${models.find(m => m.id === selectedModel)?.name}:\n\nThis is a simulated response that would analyze your documents and provide relevant information based on your question: "${userMessage.content}". In a real implementation, this would use RAG (Retrieval-Augmented Generation) to find relevant passages from your documents and provide accurate, context-aware responses.`,
        timestamp: new Date(),
        sources: documents.slice(0, 2).map(d => d.name)
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const clearChat = () => {
    setMessages([])
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Document Chat (RAG)
        </h1>
        <p className="text-gray-600">
          Upload documents and chat with them using Retrieval-Augmented Generation
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1">
        {/* Document Upload Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 h-full flex flex-col">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Documents</h2>
            
            {/* Upload Area */}
            <div
              className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <CloudArrowUpIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                Drop files here or click to upload
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PDF, TXT, DOCX supported
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.txt,.docx"
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
            />

            {/* Document List */}
            <div className="flex-1 mt-4 space-y-2 overflow-y-auto">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center min-w-0">
                    <DocumentTextIcon className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(doc.size)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeDocument(doc.id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Model Selection */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                AI Model
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {models.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Chat Panel */}
        <div className="lg:col-span-3 flex flex-col">
          {/* Controls */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {documents.length === 0 ? (
                  'Upload documents to start chatting'
                ) : (
                  `Ready to chat with ${documents.length} document${documents.length > 1 ? 's' : ''}`
                )}
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
                    <DocumentTextIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg">
                      {documents.length === 0 ? 'Upload documents to start' : 'Ask questions about your documents'}
                    </p>
                    <p className="text-sm mt-2">
                      {documents.length === 0 
                        ? 'Upload PDF, TXT, or DOCX files to begin chatting'
                        : 'Your documents are ready for questions'
                      }
                    </p>
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex max-w-xs sm:max-w-md lg:max-w-2xl ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
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
                        {message.sources && (
                          <div className="mt-2 pt-2 border-t border-gray-200">
                            <p className="text-xs text-gray-500 mb-1">Sources:</p>
                            <div className="flex flex-wrap gap-1">
                              {message.sources.map((source, index) => (
                                <span key={index} className="text-xs bg-gray-200 px-2 py-1 rounded">
                                  {source}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
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
                  placeholder={documents.length === 0 ? "Upload documents first..." : "Ask questions about your documents..."}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoading || documents.length === 0}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading || documents.length === 0}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-md transition-colors flex items-center"
                >
                  <PaperAirplaneIcon className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocumentChat 