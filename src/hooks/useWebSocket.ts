/**
 * WebSocket hook for real-time order updates
 */
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import io, { Socket } from 'socket.io-client';
import { API_CONFIG } from '../utils/constants';
import { getToken } from '../utils/storage';
import type { Order } from '../types/api.types';

export const useWebSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    let ws: Socket | null = null;

    const connectWebSocket = async () => {
      try {
        const token = await getToken();
        if (!token) return;

        ws = io(API_CONFIG.WS_URL, {
          path: '/ws/orders',
          query: { 
            token,
            staff: 'true' 
          },
          transports: ['websocket'],
        });

        ws.on('connect', () => {
          console.log('WebSocket connected');
          setIsConnected(true);
        });

        ws.on('disconnect', () => {
          console.log('WebSocket disconnected');
          setIsConnected(false);
        });

        ws.on('order.created', (order: Order) => {
          console.log('New order created:', order.id);
          // Invalidate orders query to refetch
          queryClient.invalidateQueries({ queryKey: ['orders'] });
        });

        ws.on('order.updated', (order: Order) => {
          console.log('Order updated:', order.id);
          // Invalidate orders query to refetch
          queryClient.invalidateQueries({ queryKey: ['orders'] });
        });

        ws.on('error', (error: Error) => {
          console.error('WebSocket error:', error);
        });

        setSocket(ws);
      } catch (error) {
        console.error('WebSocket connection error:', error);
      }
    };

    connectWebSocket();

    return () => {
      if (ws) {
        ws.disconnect();
      }
    };
  }, [queryClient]);

  return { socket, isConnected };
};
