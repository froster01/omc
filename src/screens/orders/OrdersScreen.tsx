/**
 * Orders Screen
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { OrdersList } from '../../components/orders/OrdersList';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { useOrders } from '../../hooks/useOrders';
import { useWebSocket } from '../../hooks/useWebSocket';
import { COLORS } from '../../utils/constants';
import type { OrdersScreenProps } from '../../types/navigation.types';

export const OrdersScreen: React.FC<OrdersScreenProps> = ({ navigation }) => {
  const { orders, isLoading } = useOrders();
  
  // Connect to WebSocket for real-time updates
  useWebSocket();

  const handleOrderPress = (orderId: string) => {
    navigation.navigate('OrderDetail', { orderId });
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading orders..." />;
  }

  return (
    <View style={styles.container}>
      <OrdersList orders={orders} onOrderPress={handleOrderPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
