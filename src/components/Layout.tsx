import { useState } from 'react'
import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Bars3Icon, 
  XMarkIcon,
  PhotoIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  SpeakerWaveIcon,
  EyeIcon,
  HomeIcon
} from '@heroicons/react/24/outline'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Text to Image', href: '/text-to-image', icon: PhotoIcon },
    { name: 'Chat', href: '/chat', icon: ChatBubbleLeftRightIcon },
    { name: 'Document Chat', href: '/document-chat', icon: DocumentTextIcon },
    { name: 'Audio Generation', href: '/audio-generation', icon: SpeakerWaveIcon },
    { name: 'Image Analysis', href: '/image-analysis', icon: EyeIcon },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between p-4 bg-white shadow-md">
          <h1 className="text-xl font-bold text-gray-900">AI Services</h1>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
          <div className="flex items-center h-16 flex-shrink-0 px-4 bg-white border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">AI Services</h1>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      isActive(item.href)
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    } group flex items-center px-2 py-2 text-sm font-medium border-l-4 transition-colors duration-150 ease-in-out`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-40 flex">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsMenuOpen(false)} />
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <nav className="mt-5 flex-1 px-2 space-y-1">
                  {navigation.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`${
                          isActive(item.href)
                            ? 'bg-blue-50 border-blue-500 text-blue-700'
                            : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        } group flex items-center px-2 py-2 text-sm font-medium border-l-4 transition-colors duration-150 ease-in-out`}
                      >
                        <Icon className="h-5 w-5 mr-3" />
                        {item.name}
                      </Link>
                    )
                  })}
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="lg:pl-64">
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout 