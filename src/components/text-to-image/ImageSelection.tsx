import { Select, Typography } from "antd";
import type { Model } from "../../types/text-to-image";

const { Text } = Typography;

const { Option } = Select;
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

export default function ModelSelection({
  selectedModel,
  onModelChange,
}: {
  selectedModel: string;
  onModelChange: (model: string) => void;
}) {
  const selectedModelData = AI_MODELS.find((m) => m.id === selectedModel);

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
}
