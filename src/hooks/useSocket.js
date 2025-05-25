import { useEffect, useRef } from "react";
// import io from "socket.io-client"; // Uncomment if you add socket.io-client

export function useSocket(url, onEvent) {
  const socketRef = useRef(null);

  useEffect(() => {
    // socketRef.current = io(url); // Uncomment if you add socket.io-client
    // socketRef.current.on("new_alert", onEvent);

    return () => {
      // socketRef.current?.disconnect();
    };
  }, [url, onEvent]);

  return socketRef.current;
}