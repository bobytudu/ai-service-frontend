import { create } from 'zustand';

interface ProgressData {
  steps: number;
  total_steps: number;
  progress: number;
}

interface WebSocketStore {
  queue_remaining: number | null;
  progressData: ProgressData | null;
  setQueueRemaining: (remaining: number) => void;
  setProgressData: (data: ProgressData) => void;
  reset: () => void;
}

export const useWebSocketStore = create<WebSocketStore>((set) => ({
  queue_remaining: null,
  progressData: null,
  setQueueRemaining: (remaining: number) => set({ queue_remaining: remaining }),
  setProgressData: (data: ProgressData) => set({ progressData: data }),
  reset: () => set({ queue_remaining: null, progressData: null }),
})); 