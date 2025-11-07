import { useState, useRef, useEffect } from 'react'
import { Send, User, Bot, Loader2, Sparkles, Zap, CheckCircle, Settings, X, Key } from 'lucide-react'
import { sendMessage, getCurrentAPI, getCurrentModelName, setCustomAPIKey } from '../services/api'

function ChatInterface() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentApi, setCurrentApi] = useState('Free AI')
  const [showSettings, setShowSettings] = useState(false)
  const [customKey, setCustomKey] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const reply = await sendMessage(userMessage)
      setCurrentApi(getCurrentAPI()) // Обновляем текущий API
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: reply 
      }])
    } catch (error) {
      console.error('❌ Error:', error)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `❌ Ошибка: ${error.message}\n\n💡 Проверь:\n• Подключение к интернету\n• Groq API работает\n• Попробуй еще раз через минуту` 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl blur-2xl opacity-20"></div>
        <div className="relative bg-black/40 backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-transparent">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl blur-lg opacity-50"></div>
                  <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center shadow-lg">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">RYAZHA AI 🥛</h2>
                  <p className="text-xs text-gray-400">{currentApi} • {getCurrentModelName()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400 font-medium">Online</span>
                </div>
                <button
                  onClick={() => setShowSettings(true)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 transition-all group"
                  title="Настройки API"
                >
                  <Settings className="w-5 h-5 text-gray-400 group-hover:text-purple-400 group-hover:rotate-90 transition-all" />
                </button>
              </div>
            </div>
          </div>

          <div className="h-[650px] overflow-y-auto p-8 space-y-6 custom-scrollbar">
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full text-center">
                <div className="space-y-6">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
                    <div className="relative text-7xl">🥛</div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-3 animate-pulse">
                      Привет! Я RYAZHA AI 🥛
                    </h3>
                    <p className="text-gray-300 text-base max-w-md mx-auto mb-4">
                      Задавай любые вопросы о Nintendo Switch, CFW, разгоне игр, оптимизации и многом другом!
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm text-green-400 mb-4">
                      <CheckCircle className="w-4 h-4" />
                      <span>Powered by GPT-4</span>
                      <Sparkles className="w-4 h-4 animate-spin" />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-200 text-sm font-medium hover:bg-purple-500/30 transition-all cursor-pointer transform hover:scale-105">🎮 Switch CFW</span>
                    <span className="px-4 py-2 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-200 text-sm font-medium hover:bg-pink-500/30 transition-all cursor-pointer transform hover:scale-105">⚡ Разгон</span>
                    <span className="px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-200 text-sm font-medium hover:bg-blue-500/30 transition-all cursor-pointer transform hover:scale-105">🔧 Оптимизация</span>
                    <span className="px-4 py-2 rounded-full bg-yellow-500/20 border border-yellow-500/40 text-yellow-200 text-sm font-medium hover:bg-yellow-500/30 transition-all cursor-pointer transform hover:scale-105">🥛 Ryazhenka</span>
                  </div>
                </div>
              </div>
            )}
          
            {messages.map((message, index) => (
              <div key={index} className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="relative flex-shrink-0">
                  {message.role === 'user' ? (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl blur-md opacity-30"></div>
                      <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-400" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl blur-md opacity-30"></div>
                      <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-purple-400" />
                      </div>
                    </>
                  )}
                </div>
                
                <div className={`flex-1 group`}>
                  <div className={`p-4 rounded-2xl transition-all ${
                    message.role === 'user' 
                      ? 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 text-white hover:border-blue-500/40' 
                      : 'bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 text-gray-200 hover:border-white/20'
                  } whitespace-pre-wrap leading-relaxed`}>
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
          
            {isLoading && (
              <div className="flex gap-4 animate-fade-in">
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl blur-md opacity-30 animate-pulse"></div>
                  <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-purple-400" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10">
                    <div className="flex items-center gap-3">
                      <Loader2 className="w-5 h-5 animate-spin text-purple-400" />
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                      </div>
                      <span className="text-sm text-gray-400">Генерирую ответ...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          
          <div ref={messagesEndRef} />
        </div>

          <div className="p-6 border-t border-white/10 bg-gradient-to-t from-black/20 to-transparent">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Задай вопрос о Switch, CFW, разгоне..."
                className="flex-1 px-6 py-4 bg-white/5 text-white rounded-2xl border border-white/10 focus:outline-none focus:border-purple-500/50 focus:shadow-lg focus:shadow-purple-500/20 transition-all placeholder-gray-500 text-sm"
                disabled={isLoading}
                autoFocus
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="group relative px-6 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white rounded-2xl font-medium hover:from-purple-500 hover:via-pink-500 hover:to-purple-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 transform hover:scale-105 disabled:transform-none"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity"></div>
                <Send className="relative w-5 h-5 group-hover:rotate-45 transition-transform" />
                <Zap className="relative w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Модальное окно настроек */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur-xl opacity-30"></div>
            <div className="relative bg-slate-900 rounded-2xl border border-white/10 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                    <Key className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Настройки API</h3>
                    <p className="text-xs text-gray-400">Добавь свой API ключ</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors group"
                >
                  <X className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    🔑 OpenAI API Key (необязательно)
                  </label>
                  <input
                    type="password"
                    value={customKey}
                    onChange={(e) => setCustomKey(e.target.value)}
                    placeholder="sk-..."
                    className="w-full px-4 py-3 bg-white/5 text-white rounded-lg border border-white/10 focus:outline-none focus:border-purple-500/50 focus:shadow-lg focus:shadow-purple-500/20 transition-all placeholder-gray-500 text-sm"
                  />
                  <p className="mt-2 text-xs text-gray-400">
                    💡 Если не указан - используются бесплатные API
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-blue-300">
                      <p className="font-medium mb-1">Поддерживаемые API:</p>
                      <ul className="space-y-1 text-blue-200/80">
                        <li>• OpenAI (GPT-4, GPT-3.5)</li>
                        <li>• ChatAnywhere (бесплатно)</li>
                        <li>• DeepInfra, Blackbox AI</li>
                        <li>• И другие OpenAI-совместимые</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setCustomAPIKey(customKey)
                      setShowSettings(false)
                      if (customKey) {
                        alert('✅ API ключ сохранен!')
                      } else {
                        alert('✅ Используются бесплатные API')
                      }
                    }}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50"
                  >
                    💾 Сохранить
                  </button>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="px-4 py-3 bg-white/5 text-gray-300 rounded-lg font-medium hover:bg-white/10 transition-all border border-white/10"
                  >
                    Отмена
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatInterface
