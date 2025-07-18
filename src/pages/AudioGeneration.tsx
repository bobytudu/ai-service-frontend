import { useState } from 'react'
import { SpeakerWaveIcon, PlayIcon, PauseIcon, ArrowDownTrayIcon, SparklesIcon } from '@heroicons/react/24/outline'

const AudioGeneration = () => {
  const [prompt, setPrompt] = useState('')
  const [selectedModel, setSelectedModel] = useState('musicgen')
  const [audioType, setAudioType] = useState('music')
  const [duration, setDuration] = useState(30)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedAudio, setGeneratedAudio] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const models = [
    { id: 'musicgen', name: 'MusicGen', description: 'Meta\'s music generation model' },
    { id: 'audiocraft', name: 'AudioCraft', description: 'Comprehensive audio generation' },
    { id: 'jukebox', name: 'Jukebox', description: 'OpenAI\'s music generation' },
    { id: 'bark', name: 'Bark', description: 'Text-to-speech with emotions' },
    { id: 'tortoise-tts', name: 'Tortoise TTS', description: 'High-quality speech synthesis' },
    { id: 'riffusion', name: 'Riffusion', description: 'Stable diffusion for audio' }
  ]

  const audioTypes = [
    { value: 'music', label: 'Music', description: 'Generate musical compositions' },
    { value: 'speech', label: 'Speech', description: 'Text-to-speech synthesis' },
    { value: 'sound-effects', label: 'Sound Effects', description: 'Environmental and action sounds' },
    { value: 'ambient', label: 'Ambient', description: 'Atmospheric and background sounds' }
  ]

  const durations = [
    { value: 15, label: '15 seconds' },
    { value: 30, label: '30 seconds' },
    { value: 60, label: '1 minute' },
    { value: 120, label: '2 minutes' },
    { value: 300, label: '5 minutes' }
  ]

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    setIsGenerating(true)
    
    // Simulate API call
    setTimeout(() => {
      // This would be replaced with actual audio file URL from API
      setGeneratedAudio('https://www.soundjay.com/misc/sounds/bell-ringing-05.wav')
      setIsGenerating(false)
    }, 5000)
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    // In a real implementation, this would control actual audio playback
  }

  const handleDownload = () => {
    if (generatedAudio) {
      const link = document.createElement('a')
      link.href = generatedAudio
      link.download = 'generated-audio.wav'
      link.click()
    }
  }

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Audio Generation
        </h1>
        <p className="text-gray-600">
          Create music, speech, and sound effects using advanced AI models
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

            {/* Audio Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Audio Type
              </label>
              <div className="space-y-2">
                {audioTypes.map((type) => (
                  <label key={type.value} className="flex items-center">
                    <input
                      type="radio"
                      name="audioType"
                      value={type.value}
                      checked={audioType === type.value}
                      onChange={(e) => setAudioType(e.target.value)}
                      className="mr-2"
                    />
                    <div>
                      <span className="text-sm font-medium">{type.label}</span>
                      <p className="text-xs text-gray-500">{type.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {durations.map((dur) => (
                  <option key={dur.value} value={dur.value}>
                    {dur.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Prompt Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={`Describe the ${audioType} you want to generate...`}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                {audioType === 'music' && 'Example: "Upbeat jazz piano with drums"'}
                {audioType === 'speech' && 'Example: "Hello world, this is a test"'}
                {audioType === 'sound-effects' && 'Example: "Rain falling on leaves"'}
                {audioType === 'ambient' && 'Example: "Peaceful forest sounds"'}
              </p>
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
                  <SpeakerWaveIcon className="h-5 w-5 mr-2" />
                  Generate Audio
                </>
              )}
            </button>
          </div>
        </div>

        {/* Audio Player Area */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Generated Audio</h2>
              {generatedAudio && (
                <button
                  onClick={handleDownload}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                  Download
                </button>
              )}
            </div>
            
            <div className="aspect-video bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center">
              {isGenerating ? (
                <div className="text-center">
                  <SparklesIcon className="h-12 w-12 text-blue-500 mx-auto mb-4 animate-pulse" />
                  <p className="text-gray-600">Generating your audio...</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Creating {formatDuration(duration)} of {audioType}
                  </p>
                  <div className="mt-4 bg-gray-200 rounded-full h-2 w-64 mx-auto">
                    <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                </div>
              ) : generatedAudio ? (
                <div className="text-center w-full max-w-md">
                  {/* Audio Waveform Placeholder */}
                  <div className="mb-6">
                    <div className="flex items-center justify-center h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
                      <div className="flex items-end space-x-1">
                        {Array.from({ length: 40 }, (_, i) => (
                          <div
                            key={i}
                            className="bg-blue-500 rounded-t"
                            style={{ 
                              height: `${Math.random() * 60 + 10}px`,
                              width: '3px'
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Audio Controls */}
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <button
                      onClick={handlePlayPause}
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 transition-colors"
                    >
                      {isPlaying ? (
                        <PauseIcon className="h-6 w-6" />
                      ) : (
                        <PlayIcon className="h-6 w-6" />
                      )}
                    </button>
                    <div className="flex-1 max-w-xs">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: isPlaying ? '45%' : '0%' }}
                        />
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatDuration(duration)}
                    </span>
                  </div>
                  
                  {/* Audio Info */}
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Type:</strong> {audioTypes.find(t => t.value === audioType)?.label}</p>
                    <p><strong>Model:</strong> {models.find(m => m.id === selectedModel)?.name}</p>
                    <p><strong>Duration:</strong> {formatDuration(duration)}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <SpeakerWaveIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Your generated audio will appear here</p>
                  <p className="text-sm text-gray-500 mt-2">Enter a prompt and click generate to start</p>
                </div>
              )}
            </div>

            {/* Recent Generations */}
            {generatedAudio && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Generations</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-500 rounded-full p-2">
                        <SpeakerWaveIcon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {prompt.slice(0, 50)}...
                        </p>
                        <p className="text-xs text-gray-500">
                          {audioTypes.find(t => t.value === audioType)?.label} • {formatDuration(duration)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <PlayIcon className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        <ArrowDownTrayIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AudioGeneration 