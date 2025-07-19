import type { ProgressData } from "../../types/text-to-image";
import { Card, Button, Progress, Typography, Image } from "antd";
import { DownloadOutlined, PictureOutlined } from "@ant-design/icons";

export default function ImageDisplay({
  isGenerating,
  generatedImage,
  progressData,
  onDownload,
}: {
  isGenerating: boolean;
  generatedImage: string | null;
  progressData: ProgressData | null;
  onDownload: () => void;
}) {
  return (
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
      {generatedImage && (
        <Image
          src={generatedImage}
          alt="Generated"
          className="max-h-full ml-auto w-full"
        />
      )}

      {isGenerating && (
        <div className="text-center flex flex-col">
          <Progress
            percent={progressData?.progress}
            className="mb-4"
            type="circle"
          />
          <Typography.Text>Generating your image...</Typography.Text>
          <Typography.Text type="secondary" className="text-sm mt-2 block">
            This may take a few moments
          </Typography.Text>
        </div>
      )}
      {!isGenerating && !generatedImage && (
        <div className="bg-gray-50 flex-1 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center h-full min-h-80">
          <div className="text-center">
            <PictureOutlined className="text-5xl text-gray-400 mb-4 block" />
            <Typography.Text className="text-gray-600 block">
              Your generated image will appear here
            </Typography.Text>
            <Typography.Text type="secondary" className="text-sm mt-2 block">
              Enter a prompt and click generate to start
            </Typography.Text>
          </div>
        </div>
      )}
    </Card>
  );
}
