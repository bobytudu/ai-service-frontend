export interface Model {
  id: string;
  name: string;
  description: string;
}

export interface ImageSize {
  value: string;
  label: string;
}

export interface ImageStyle {
  value: string;
  label: string;
  description: string;
}

export interface GenerationState {
  isGenerating: boolean;
  promptId: string | null;
  generatedImage: string | null;
}

export interface ProgressData {
  steps: number;
  total_steps: number;
  progress: number;
}
