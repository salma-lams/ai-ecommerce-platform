import { useEffect, useState } from 'react';

/**
 * Custom React Hook connecting directly to the FastAPI WebSocket router 
 * enabling instant push-updates for tracking status or notifications.
 */
export function useRealtimeOrders(userId: string | null) {
  const [messages, setMessages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!userId) return;

    // Use environment variable, strip scheme mapping http->ws
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8000/api/realtime/ws/orders";
    const ws = new WebSocket(`${wsUrl}/${userId}`);

    ws.onopen = () => setIsConnected(true);
    
    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    ws.onclose = () => setIsConnected(false);

    return () => {
      ws.close();
    };
  }, [userId]);

  return { messages, isConnected };
}
