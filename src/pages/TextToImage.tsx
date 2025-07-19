import { useEffect, useState, useCallback } from "react";
import {
  Card,
  Select,
  Radio,
  Input,
  Button,
  Space,
  Typography,
  message,
  Progress,
} from "antd";
import axios from "axios";
import {
  PictureOutlined,
  DownloadOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { defaultWorkflow } from "../workflows/default";
import _ from "lodash";
import { useWebSocketStore } from "../stores/websocketStore";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

// Types
interface Model {
  id: string;
  name: string;
  description: string;
}

interface ImageSize {
  value: string;
  label: string;
}

interface ImageStyle {
  value: string;
  label: string;
  description: string;
}

interface GenerationState {
  isGenerating: boolean;
  promptId: string | null;
  generatedImage: string | null;
}

interface ProgressData {
  steps: number;
  total_steps: number;
  progress: number;
}

// Constants
const AI_MODELS: Model[] = [
  {
    id: "dall-e-3",
    name: "DALL-E 3",
    description: "Latest OpenAI model with improved quality",
  },
  {
    id: "dall-e-2",
    name: "DALL-E 2",
    description: "Reliable and fast image generation",
  },
  {
    id: "midjourney",
    name: "Midjourney",
    description: "Artistic and creative outputs",
  },
  {
    id: "stable-diffusion",
    name: "Stable Diffusion",
    description: "Open-source alternative",
  },
  {
    id: "firefly",
    name: "Adobe Firefly",
    description: "Commercial-safe generations",
  },
];

const IMAGE_SIZES: ImageSize[] = [
  { value: "1024x1024", label: "1024×1024 (Square)" },
  { value: "1792x1024", label: "1792×1024 (Landscape)" },
  { value: "1024x1792", label: "1024×1792 (Portrait)" },
];

const IMAGE_STYLES: ImageStyle[] = [
  { value: "vivid", label: "Vivid", description: "Hyper-real and dramatic" },
  {
    value: "natural",
    label: "Natural",
    description: "More natural and less hyper-real",
  },
];

const DEFAULT_PROMPT = "beautiful scenery nature glass bottle landscape, , purple galaxy bottle,";

// Custom hooks
const useImageGeneration = () => {
  const [generationState, setGenerationState] = useState<GenerationState>({
    isGenerating: false,
    promptId: null,
    generatedImage: null,
  });
  const { queue_remaining, progressData } = useWebSocketStore();

  const generateImage = useCallback(async (prompt: string) => {
    try {
      if (!prompt.trim()) {
        message.warning("Please enter a prompt");
        return;
      }

      setGenerationState(prev => ({ ...prev, isGenerating: true }));
      const { data } = await axios.post("/api/prompt", defaultWorkflow(prompt));
      setGenerationState(prev => ({ 
        ...prev, 
        promptId: data.prompt_id,
        isGenerating: false 
      }));
      message.success("Image generated successfully!");
    } catch (error) {
      message.error("Failed to generate image");
      console.error(error);
      setGenerationState(prev => ({ ...prev, isGenerating: false }));
    }
  }, []);

  const downloadImage = useCallback(() => {
    if (generationState.generatedImage) {
      const link = document.createElement("a");
      link.href = generationState.generatedImage;
      link.download = "generated-image.png";
      link.click();
      message.success("Download started!");
    }
  }, [generationState.generatedImage]);

  useEffect(() => {
    const fetchGeneratedImage = async () => {
      if (!generationState.promptId) return;
      
      try {
        const { data } = await axios.get(`/api/history/${generationState.promptId}`);
        const imageData = _.get(data, `${generationState.promptId}.outputs.9.images[0].filename`);
        
        if (imageData) {
          setGenerationState(prev => ({
            ...prev,
            isGenerating: false,
            generatedImage: `http://localhost:8080/outputs/${imageData}`,
          }));
        }
      } catch (error) {
        console.error("Failed to fetch generated image:", error);
        setGenerationState(prev => ({ ...prev, isGenerating: false }));
      }
    };

    if (queue_remaining === 0 && generationState.promptId) {
      fetchGeneratedImage();
    }
  }, [generationState.promptId, progressData, queue_remaining]);

  return {
    ...generationState,
    generateImage,
    downloadImage,
    progressData,
  };
};

// Components
const ModelSelection = ({ 
  selectedModel, 
  onModelChange 
}: { 
  selectedModel: string; 
  onModelChange: (model: string) => void; 
}) => {
  const selectedModelData = AI_MODELS.find(m => m.id === selectedModel);

  return (
    <div>
      <Text strong className="block mb-2">
        AI Model
      </Text>
      <Select
        value={selectedModel}
        onChange={onModelChange}
        className="w-full"
        size="large"
      >
        {AI_MODELS.map((model) => (
          <Option key={model.id} value={model.id}>
            {model.name}
          </Option>
        ))}
      </Select>
      <Text type="secondary" className="text-sm mt-1 block">
        {selectedModelData?.description}
      </Text>
    </div>
  );
};

const ImageSizeSelection = ({ 
  imageSize, 
  onSizeChange 
}: { 
  imageSize: string; 
  onSizeChange: (size: string) => void; 
}) => (
  <div>
    <Text strong className="block mb-2">
      Image Size
    </Text>
    <Select
      value={imageSize}
      onChange={onSizeChange}
      className="w-full"
      size="large"
    >
      {IMAGE_SIZES.map((size) => (
        <Option key={size.value} value={size.value}>
          {size.label}
        </Option>
      ))}
    </Select>
  </div>
);

const StyleSelection = ({ 
  imageStyle, 
  onStyleChange 
}: { 
  imageStyle: string; 
  onStyleChange: (style: string) => void; 
}) => (
  <div>
    <Text strong className="block mb-2">
      Style
    </Text>
    <Radio.Group
      value={imageStyle}
      onChange={(e) => onStyleChange(e.target.value)}
      className="w-full"
    >
      <Space direction="vertical" className="w-full">
        {IMAGE_STYLES.map((style) => (
          <Radio key={style.value} value={style.value} className="w-full">
            <div>
              <Text strong className="text-sm">
                {style.label}
              </Text>
              <br />
              <Text type="secondary" className="text-xs">
                {style.description}
              </Text>
            </div>
          </Radio>
        ))}
      </Space>
    </Radio.Group>
  </div>
);

const PromptInput = ({ 
  prompt, 
  onPromptChange 
}: { 
  prompt: string; 
  onPromptChange: (prompt: string) => void; 
}) => (
  <div>
    <Text strong className="block mb-2">
      Prompt
    </Text>
    <TextArea
      value={prompt}
      onChange={(e) => onPromptChange(e.target.value)}
      placeholder="Describe the image you want to generate..."
      rows={4}
      className="w-full"
      size="large"
    />
  </div>
);

const GenerateButton = ({ 
  isGenerating, 
  isDisabled, 
  onClick 
}: { 
  isGenerating: boolean; 
  isDisabled: boolean; 
  onClick: () => void; 
}) => (
  <Button
    type="primary"
    size="large"
    onClick={onClick}
    disabled={isDisabled}
    className="w-full h-12"
    icon={isGenerating ? <LoadingOutlined /> : <PictureOutlined />}
  >
    {isGenerating ? "Generating..." : "Generate Image"}
  </Button>
);

const ImageDisplay = ({ 
  isGenerating, 
  generatedImage, 
  progressData, 
  onDownload 
}: { 
  isGenerating: boolean; 
  generatedImage: string | null; 
  progressData: ProgressData | null; 
  onDownload: () => void; 
}) => (
  <Card
    title={
      <div className="flex items-center justify-between">
        <span>Generated Image</span>
        {generatedImage && (
          <Button
            icon={<DownloadOutlined />}
            onClick={onDownload}
            size="small"
          >
            Download
          </Button>
        )}
      </div>
    }
    className="shadow-xs border border-gray-200"
  >
    <div className="bg-gray-50 flex-1 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center h-full min-h-80">
      {isGenerating ? (
        <div className="text-center">
          <Progress
            percent={progressData?.progress}
            className="mb-4"
            type="circle"
          />
          <Text className="text-gray-600 block">
            Generating your image...
          </Text>
          <Text type="secondary" className="text-sm mt-2 block">
            This may take a few moments
          </Text>
        </div>
      ) : generatedImage ? (
        <img
          src={generatedImage}
          alt="Generated"
          className="max-w-full max-h-full object-contain rounded-lg"
        />
      ) : (
        <div className="text-center">
          <PictureOutlined className="text-5xl text-gray-400 mb-4 block" />
          <Text className="text-gray-600 block">
            Your generated image will appear here
          </Text>
          <Text type="secondary" className="text-sm mt-2 block">
            Enter a prompt and click generate to start
          </Text>
        </div>
      )}
    </div>
  </Card>
);

// Main component
const TextToImage = () => {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [selectedModel, setSelectedModel] = useState("dall-e-3");
  const [imageSize, setImageSize] = useState("1024x1024");
  const [imageStyle, setImageStyle] = useState("vivid");

  const {
    isGenerating,
    generatedImage,
    generateImage,
    downloadImage,
    progressData,
  } = useImageGeneration();

  const handleGenerate = useCallback(() => {
    generateImage(prompt);
  }, [generateImage, prompt]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <Title level={1} className="text-gray-900 mb-2">
          Text to Image Generation
        </Title>
        <Paragraph className="text-gray-600">
          Create stunning images from text descriptions using advanced AI models
        </Paragraph>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls Panel */}
        <div className="lg:col-span-1">
          <Card
            title="Generation Settings"
            className="shadow-xs border border-gray-200"
            headStyle={{ borderBottom: "1px solid #e5e7eb" }}
          >
            <Space direction="vertical" size="large" className="w-full">
              <ModelSelection
                selectedModel={selectedModel}
                onModelChange={setSelectedModel}
              />
              <ImageSizeSelection
                imageSize={imageSize}
                onSizeChange={setImageSize}
              />
              <StyleSelection
                imageStyle={imageStyle}
                onStyleChange={setImageStyle}
              />
              <PromptInput
                prompt={prompt}
                onPromptChange={setPrompt}
              />
              <GenerateButton
                isGenerating={isGenerating}
                isDisabled={!prompt.trim() || isGenerating}
                onClick={handleGenerate}
              />
            </Space>
          </Card>
        </div>

        {/* Image Display Area */}
        <div className="lg:col-span-2">
          <ImageDisplay
            isGenerating={isGenerating}
            generatedImage={generatedImage}
            progressData={progressData}
            onDownload={downloadImage}
          />
        </div>
      </div>
    </div>
  );
};

export default TextToImage;
