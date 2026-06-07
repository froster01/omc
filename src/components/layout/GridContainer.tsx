/**
 * GridContainer - Flexbox-based grid layout system
 * Mimics CSS Grid for React Native (grid-cols-X gap-Y)
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { calculateGridItemWidth } from '../../utils/layoutConstants';

interface GridContainerProps {
  children: React.ReactNode;
  columns?: number;           // grid-cols-3
  gap?: number;               // gap-6 = 24
  padding?: number;           // Container padding
  style?: ViewStyle;
}

interface GridItemProps {
  children: React.ReactNode;
  span?: number;              // col-span-7 (for 12-column grid)
  style?: ViewStyle;
}

/**
 * GridContainer - Main grid wrapper
 * Usage: <GridContainer columns={3} gap={24}>
 */
export const GridContainer: React.FC<GridContainerProps> = ({
  children,
  columns = 3,
  gap = 16,
  padding = 0,
  style,
}) => {
  return (
    <View style={[styles.container, { padding }, style]}>
      <View style={[styles.grid, { marginHorizontal: -gap / 2 }]}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, {
              _columns: columns,
              _gap: gap,
            });
          }
          return child;
        })}
      </View>
    </View>
  );
};

/**
 * GridItem - Individual grid item
 * Usage: <GridItem span={7}> for col-span-7
 */
export const GridItem: React.FC<GridItemProps & { _columns?: number; _gap?: number }> = ({
  children,
  span,
  style,
  _columns = 3,
  _gap = 16,
}) => {
  const { width: screenWidth } = useWindowDimensions();
  
  // Calculate width based on span (for 12-column grid) or equal distribution
  let itemWidth: number | string = '100%';
  
  if (span) {
    // 12-column grid system (col-span-X)
    itemWidth = `${(span / 12) * 100}%`;
  } else if (_columns) {
    // Equal distribution (grid-cols-X)
    itemWidth = `${100 / _columns}%`;
  }

  return (
    <View
      style={[
        styles.gridItem,
        {
          width: itemWidth as any, // Type cast for percentage string
          paddingHorizontal: _gap / 2,
          marginBottom: _gap,
        },
        style,
      ]}>
      {children}
    </View>
  );
};

/**
 * ResponsiveGrid - Auto-responsive grid based on screen size
 */
interface ResponsiveGridProps {
  children: React.ReactNode;
  minItemWidth?: number;      // Minimum width per item
  gap?: number;
  padding?: number;
  style?: ViewStyle;
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  minItemWidth = 200,
  gap = 16,
  padding = 0,
  style,
}) => {
  const { width: screenWidth } = useWindowDimensions();
  
  // Calculate optimal columns based on screen width
  const availableWidth = screenWidth - (padding * 2);
  const columns = Math.max(1, Math.floor(availableWidth / minItemWidth));
  
  return (
    <GridContainer columns={columns} gap={gap} padding={padding} style={style}>
      {children}
    </GridContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    // Width set dynamically
  },
});
