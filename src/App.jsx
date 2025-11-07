import { useState, useEffect } from 'react'
import ChatInterface from './components/ChatInterface'
import FAQ from './components/FAQ'
import { MessageSquare, HelpCircle, Github, Send, Sparkles, Zap, Star } from 'lucide-react'

function App() {
  const [activeTab, setActiveTab] = useState('chat')
  const [particles, setParticles] = useState([])
  
  // Генерация анимированных частиц
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Animated particles background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
              opacity: 0.3
            }}
          />
        ))}
        
        {/* Gradient blobs */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-6000"></div>
        </div>
      </div>

      {/* Main content */}
      <main className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="relative z-10 border-b border-white/10 backdrop-blur-xl bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                  <div className="relative text-4xl transform group-hover:scale-110 transition-transform duration-300 animate-bounce-slow">🥛</div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
                    RYAZHA AI
                  </h1>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-yellow-400 animate-pulse" />
                    Powered by GPT-4
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <a
                  href="https://t.me/Ryazhenkabestcfw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/50 transition-all transform hover:scale-105"
                >
                  <Send className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                  <span className="text-sm font-medium">Telegram</span>
                  <Zap className="w-3 h-3 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a
                  href="https://github.com/Dimasick-git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105"
                >
                  <Github className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  <span className="text-sm font-medium">GitHub</span>
                  <Star className="w-3 h-3 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => setActiveTab('chat')}
              className={`group flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 ${
                activeTab === 'chat'
                  ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white shadow-lg shadow-purple-500/50 animate-gradient-x'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10 hover:border-purple-500/50'
              }`}
            >
              <MessageSquare className={`w-5 h-5 ${activeTab === 'chat' ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'}`} />
              <span>🥛 RYAZHA AI</span>
              {activeTab === 'chat' && <Sparkles className="w-4 h-4 animate-spin-slow" />}
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`group flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 ${
                activeTab === 'faq'
                  ? 'bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 text-white shadow-lg shadow-blue-500/50 animate-gradient-x'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10 hover:border-blue-500/50'
              }`}
            >
              <HelpCircle className={`w-5 h-5 ${activeTab === 'faq' ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'}`} />
              <span>❓ FAQ</span>
              {activeTab === 'faq' && <Star className="w-4 h-4 animate-spin-slow" />}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 container mx-auto px-4 py-8">
          <div className="w-full max-w-5xl mx-auto">
            {activeTab === 'chat' && <ChatInterface />}
            {activeTab === 'faq' && <FAQ />}
          </div>
        </div>

        {/* Крутой footer */}
        <footer className="border-t border-white/5 backdrop-blur-2xl bg-black/30 py-6">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between text-sm">
              <div className="text-gray-500">
                Made with 💜 by <span className="text-purple-400">Dimasick-git</span> & <span className="text-pink-400">Ryazha-Helper-01</span>
              </div>
              <div className="text-gray-600">
                v5.1 | Free AI Models
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App

// Добавляем кастомные CSS анимации
const style = document.createElement('style')
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) translateX(0px); }
    25% { transform: translateY(-20px) translateX(10px); }
    50% { transform: translateY(-10px) translateX(-10px); }
    75% { transform: translateY(-30px) translateX(5px); }
  }
  
  @keyframes gradient {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  @keyframes gradient-x {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  @keyframes bounce-slow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
  
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient 3s ease infinite;
  }
  
  .animate-gradient-x {
    background-size: 200% 200%;
    animation: gradient-x 3s ease infinite;
  }
  
  .animate-bounce-slow {
    animation: bounce-slow 2s ease-in-out infinite;
  }
  
  .animate-spin-slow {
    animation: spin-slow 3s linear infinite;
  }
`
document.head.appendChild(style)
