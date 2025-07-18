# AI Services Hub

A comprehensive AI services platform built with React, TypeScript, and Tailwind CSS. This application provides multiple AI-powered tools with custom model selection and mobile-responsive design.

## Features

### 🎨 Text to Image Generation
- Generate images from text descriptions
- Multiple AI models: DALL-E 3, DALL-E 2, Midjourney, Stable Diffusion, Adobe Firefly
- Customizable image sizes and styles
- Download generated images

### 💬 AI Chat
- Interactive chat interface with multiple language models
- Support for GPT-4, GPT-3.5, Claude 3, Gemini Pro, and Llama 2
- Real-time conversation history
- Mobile-optimized chat interface

### 📄 Document Chat (RAG)
- Upload and chat with your documents
- Supports PDF, TXT, and DOCX files
- Retrieval-Augmented Generation (RAG) functionality
- Source attribution for responses
- Drag-and-drop file upload

### 🎵 Audio Generation
- Generate music, speech, and sound effects
- Multiple models: MusicGen, AudioCraft, Jukebox, Bark, Tortoise TTS
- Customizable duration and audio types
- Built-in audio player with waveform visualization

### 👁️ Image Analysis
- Analyze images with computer vision models
- Multiple analysis types: general description, object detection, OCR, emotion analysis
- Support for various image formats
- Custom analysis prompts
- Confidence scores for results

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Package Manager**: PNPM

## Getting Started

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Start development server**
   ```bash
   pnpm dev
   ```

3. **Build for production**
   ```bash
   pnpm build
   ```

## Project Structure

```
src/
├── components/
│   └── Layout.tsx          # Main layout with navigation
├── pages/
│   ├── Home.tsx            # Landing page
│   ├── TextToImage.tsx     # Image generation interface
│   ├── Chat.tsx            # Chat interface
│   ├── DocumentChat.tsx    # RAG chat interface
│   ├── AudioGeneration.tsx # Audio generation interface
│   └── ImageAnalysis.tsx   # Image analysis interface
├── App.tsx                 # Main app component with routing
├── main.tsx               # App entry point
└── index.css              # Global styles with Tailwind
```

## Features Overview

### Mobile Responsive Design
- Adaptive navigation (sidebar on desktop, mobile menu on mobile)
- Responsive grid layouts
- Touch-friendly interface elements
- Mobile-optimized chat and upload interfaces

### Model Selection
Each service includes multiple AI model options:
- **Text to Image**: DALL-E, Midjourney, Stable Diffusion, etc.
- **Chat**: GPT-4, Claude 3, Gemini Pro, Llama 2, etc.
- **Document Chat**: Optimized models for document analysis
- **Audio**: MusicGen, AudioCraft, Bark, Tortoise TTS, etc.
- **Image Analysis**: GPT-4 Vision, Claude 3 Vision, Gemini Pro Vision, etc.

### User Experience
- Clean, modern interface design
- Loading states and progress indicators
- Drag-and-drop file uploads
- Real-time feedback
- Downloadable results

## Development

The application is built with modern React practices:
- TypeScript for type safety
- Functional components with hooks
- Context-free state management
- Modular component architecture
- Responsive design patterns

## API Integration

Currently, the application uses simulated API calls for demonstration purposes. To connect to real AI services, replace the mock functions in each page component with actual API calls to your preferred AI service providers.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the MIT License.
