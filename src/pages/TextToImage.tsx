import { useState } from 'react'
import { PhotoIcon, ArrowDownTrayIcon, SparklesIcon } from '@heroicons/react/24/outline'

const TextToImage = () => {
  const [prompt, setPrompt] = useState('')
  const [selectedModel, setSelectedModel] = useState('dall-e-3')
  const [imageSize, setImageSize] = useState('1024x1024')
  const [imageStyle, setImageStyle] = useState('vivid')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)

  const models = [
    { id: 'dall-e-3', name: 'DALL-E 3', description: 'Latest OpenAI model with improved quality' },
    { id: 'dall-e-2', name: 'DALL-E 2', description: 'Reliable and fast image generation' },
    { id: 'midjourney', name: 'Midjourney', description: 'Artistic and creative outputs' },
    { id: 'stable-diffusion', name: 'Stable Diffusion', description: 'Open-source alternative' },
    { id: 'firefly', name: 'Adobe Firefly', description: 'Commercial-safe generations' }
  ]

  const imageSizes = [
    { value: '1024x1024', label: '1024×1024 (Square)' },
    { value: '1792x1024', label: '1792×1024 (Landscape)' },
    { value: '1024x1792', label: '1024×1792 (Portrait)' }
  ]

  const imageStyles = [
    { value: 'vivid', label: 'Vivid', description: 'Hyper-real and dramatic' },
    { value: 'natural', label: 'Natural', description: 'More natural and less hyper-real' }
  ]

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    setIsGenerating(true)
    
    // Simulate API call
    setTimeout(() => {
      setGeneratedImage('https://via.placeholder.com/1024x1024/6366f1/ffffff?text=Generated+Image')
      setIsGenerating(false)
    }, 3000)
  }

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a')
      link.href = generatedImage
      link.download = 'generated-image.png'
      link.click()
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Text to Image Generation
        </h1>
        <p className="text-gray-600">
          Create stunning images from text descriptions using advanced AI models
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Generation Settings</h2>
            
            {/* Model Selection */}
            <div className="mb-6">
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
              <p className="text-sm text-gray-500 mt-1">
                {models.find(m => m.id === selectedModel)?.description}
              </p>
            </div>

            {/* Image Size */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image Size
              </label>
              <select
                value={imageSize}
                onChange={(e) => setImageSize(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {imageSizes.map((size) => (
                  <option key={size.value} value={size.value}>
                    {size.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Image Style */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Style
              </label>
              <div className="space-y-2">
                {imageStyles.map((style) => (
                  <label key={style.value} className="flex items-center">
                    <input
                      type="radio"
                      name="imageStyle"
                      value={style.value}
                      checked={imageStyle === style.value}
                      onChange={(e) => setImageStyle(e.target.value)}
                      className="mr-2"
                    />
                    <div>
                      <span className="text-sm font-medium">{style.label}</span>
                      <p className="text-xs text-gray-500">{style.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Prompt Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the image you want to generate..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center"
            >
              {isGenerating ? (
                <>
                  <SparklesIcon className="h-5 w-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <PhotoIcon className="h-5 w-5 mr-2" />
                  Generate Image
                </>
              )}
            </button>
          </div>
        </div>

        {/* Image Display Area */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Generated Image</h2>
              {generatedImage && (
                <button
                  onClick={handleDownload}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                  Download
                </button>
              )}
            </div>
            
            <div className="aspect-square bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center">
              {isGenerating ? (
                <div className="text-center">
                  <SparklesIcon className="h-12 w-12 text-blue-500 mx-auto mb-4 animate-pulse" />
                  <p className="text-gray-600">Generating your image...</p>
                  <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
                </div>
              ) : generatedImage ? (
                <img
                  src={generatedImage}
                  alt="Generated"
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              ) : (
                <div className="text-center">
                  <PhotoIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Your generated image will appear here</p>
                  <p className="text-sm text-gray-500 mt-2">Enter a prompt and click generate to start</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextToImage 