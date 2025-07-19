import { useState, useCallback } from "react";
import { Card, Input, Button, Space, Typography } from "antd";
import { PictureOutlined, LoadingOutlined } from "@ant-design/icons";
import { useImageGeneration } from "../hooks/useImageGeneration";
import ModelSelection from "../components/text-to-image/ImageSelection";
import ImageSizeSelection from "../components/text-to-image/ImageSizeSelection";
import ImageDisplay from "../components/text-to-image/ImageDisplay";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const DEFAULT_PROMPT =
  "beautiful scenery nature glass bottle landscape, , purple galaxy bottle,";

const PromptInput = ({
  prompt,
  onPromptChange,
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
  onClick,
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

// Main component
const TextToImage = () => {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [selectedModel, setSelectedModel] = useState("dall-e-3");
  const [imageSize, setImageSize] = useState("1024x1024");

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
              <PromptInput prompt={prompt} onPromptChange={setPrompt} />
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
