import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import TextToImage from './pages/TextToImage'
import Chat from './pages/Chat'
import DocumentChat from './pages/DocumentChat'
import AudioGeneration from './pages/AudioGeneration'
import ImageAnalysis from './pages/ImageAnalysis'
import { useWebSocket } from './hooks/useWebSocket'

function App() {
  useWebSocket()
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/text-to-image" element={<TextToImage />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/document-chat" element={<DocumentChat />} />
        <Route path="/audio-generation" element={<AudioGeneration />} />
        <Route path="/image-analysis" element={<ImageAnalysis />} />
      </Routes>
    </Layout>
  )
}

export default App
