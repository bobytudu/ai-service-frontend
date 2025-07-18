import { Link } from 'react-router-dom'
import { 
  PhotoIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  SpeakerWaveIcon,
  EyeIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

const Home = () => {
  const services = [
    {
      name: 'Text to Image',
      description: 'Generate stunning images from text descriptions using advanced AI models',
      icon: PhotoIcon,
      href: '/text-to-image',
      color: 'bg-purple-500'
    },
    {
      name: 'Chat',
      description: 'Have conversations with powerful AI language models',
      icon: ChatBubbleLeftRightIcon,
      href: '/chat',
      color: 'bg-blue-500'
    },
    {
      name: 'Document Chat',
      description: 'Chat with your documents using RAG (Retrieval-Augmented Generation)',
      icon: DocumentTextIcon,
      href: '/document-chat',
      color: 'bg-green-500'
    },
    {
      name: 'Audio Generation',
      description: 'Create music, speech, and sound effects using AI',
      icon: SpeakerWaveIcon,
      href: '/audio-generation',
      color: 'bg-orange-500'
    },
    {
      name: 'Image Analysis',
      description: 'Analyze and understand images with computer vision models',
      icon: EyeIcon,
      href: '/image-analysis',
      color: 'bg-red-500'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          AI Services Hub
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore our comprehensive suite of AI-powered tools and services. 
          From image generation to document analysis, we've got you covered.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => {
          const Icon = service.icon
          return (
            <Link
              key={service.name}
              to={service.href}
              className="group block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200"
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg ${service.color} mr-4`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {service.name}
                  </h3>
                </div>
                <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.description}
              </p>
            </Link>
          )
        })}
      </div>

      <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Choose any service from above to begin exploring the power of AI. 
          Each service offers multiple models and customization options to suit your needs.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/text-to-image"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Start with Text to Image
          </Link>
          <Link
            to="/chat"
            className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Try Chat Instead
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home 