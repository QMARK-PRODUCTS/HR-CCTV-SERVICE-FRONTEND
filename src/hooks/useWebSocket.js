import { useState, useEffect, useRef } from "react";
import { webSockectBaseUrl } from "../utils/Endpoint";

const useWebSocket = () => {
  const [messages, setMessages] = useState(null);
  const [isConnected, setIsConnected] = useState(false); // Track connection state
  const socketRef = useRef(null);

  const connect = () => {
    if (!socketRef.current || socketRef.current.readyState === WebSocket.CLOSED) {
      socketRef.current = new WebSocket(`${webSockectBaseUrl}/api/v1/detect-faces/notifications`);

      socketRef.current.onopen = () => {
        console.log("WebSocket connected");
        setIsConnected(true);
      };

      socketRef.current.onmessage = (event) => {
        try {
          const messageData = JSON.parse(event.data);
          console.log("message from sockect",messageData)
          setMessages(messageData);
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      socketRef.current.onclose = (event) => {
        console.log("WebSocket disconnected", event);
        setIsConnected(false);
      };

      socketRef.current.onerror = (error) => {
        console.error("WebSocket Error:", error);
      };
    }
  };

  const disconnect = () => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      disconnect(); // Cleanup on unmount
    };
  }, []);

  return { socket: socketRef.current, messages, isConnected, connect, disconnect };
};

export default useWebSocket;
