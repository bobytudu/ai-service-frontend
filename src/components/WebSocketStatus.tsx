import React from 'react';
import { useWebSocketStore } from '../stores/websocketStore';

export const WebSocketStatus: React.FC = () => {
  const { queue_remaining, progressData } = useWebSocketStore();

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">WebSocket Status</h3>
      
      <div className="space-y-3">
        <div>
          <span className="font-medium">Queue Remaining: </span>
          <span className="text-blue-600">
            {queue_remaining !== null ? queue_remaining : 'N/A'}
          </span>
        </div>
        
        {progressData && (
          <div>
            <div className="font-medium mb-2">Progress:</div>
            <div className="space-y-1">
              <div>
                <span>Steps: </span>
                <span className="text-green-600">{progressData.steps}</span>
                <span> / </span>
                <span className="text-green-600">{progressData.total_steps}</span>
              </div>
              <div>
                <span>Progress: </span>
                <span className="text-purple-600">{progressData.progress.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressData.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 