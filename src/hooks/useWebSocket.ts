import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useWebSocketStore } from "../stores/websocketStore";

interface WebSocketMessage {
  type: string;
  data: {
    status?: {
      exec_info: {
        queue_remaining: number;
      };
    };
    value?: number;
    max?: number;
  };
}

export const useWebSocket = () => {
  const { setQueueRemaining, setProgressData } = useWebSocketStore();

  useEffect(() => {
    const clientId = uuidv4();
    const ws = new WebSocket(`/ws?clientId=${clientId}`);

    ws.addEventListener("execution_start", (data) => {
      console.log("Execution started", data);
    });

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onmessage = (event) => {
      const message: WebSocketMessage = JSON.parse(`${event.data}`);
      
      if (message.type === "status") {
        const queue_remaining = message.data.status?.exec_info.queue_remaining;
        console.log(`Queue remaining: ${queue_remaining}`);
        if (queue_remaining !== undefined) {
          setQueueRemaining(queue_remaining);
        }
      }
      
      if (message.type === "progress") {
        const steps = message.data.value;
        const total_steps = message.data.max;
        const progressData = {
          steps: message.data.value || 0,
          total_steps: message.data.max || 1,
          progress: ((message.data.value || 0) / (message.data.max || 1)) * 100
        };
        
        if (steps !== undefined && total_steps !== undefined) {
          setProgressData(progressData);
          console.log("Progress data updated:", progressData);
        }
      }
      
      if (message.type === "execution_success") {
        console.log(`Execution success`);
      }
    };

    ws.addEventListener("execution_start", () => {
      console.log("Execution started");
    });
    
    ws.addEventListener("execution_success", () => {
      console.log("Execution success");
    });

    // Cleanup function to close WebSocket connection
    return () => {
      ws.close();
    };
  }, [setQueueRemaining, setProgressData]);
}; 