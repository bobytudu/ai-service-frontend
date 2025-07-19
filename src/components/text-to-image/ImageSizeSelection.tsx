import { Select, Typography } from "antd";
import type { ImageSize } from "../../types/text-to-image";

const { Text } = Typography;
const { Option } = Select;

const IMAGE_SIZES: ImageSize[] = [
  { value: "1024x1024", label: "1024×1024 (Square)" },
  { value: "1792x1024", label: "1792×1024 (Landscape)" },
  { value: "1024x1792", label: "1024×1792 (Portrait)" },
];

export default function ImageSizeSelection({
  imageSize,
  onSizeChange,
}: {
  imageSize: string;
  onSizeChange: (size: string) => void;
}) {
  return (
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
}
