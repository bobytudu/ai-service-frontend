import { useCallback, useEffect, useState } from "react";
import { message } from "antd";
import _ from "lodash";
import { useWebSocketStore } from "../stores/websocketStore";
import { defaultWorkflow } from "../workflows/default";
import axios from "axios";
import type { GenerationState } from "../types/text-to-image";

export const useImageGeneration = () => {
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
              generatedImage: `https://gif-seats-sure-wild.trycloudflare.com/outputs/${imageData}`,
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