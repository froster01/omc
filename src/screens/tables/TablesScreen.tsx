/**
 * Tables & QR Management Screen - Compact & Modern Design
 * Features: Backend QR integration, ultra-compact layout, single download action
 */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Card } from '../../components/common/Card';
import { MaterialIcon } from '../../components/common/MaterialIcon';
import { COLORS, SPACING, BORDER_RADIUS } from '../../utils/designTokens';
import { tablesApi } from '../../api/tables.api';
import type { Table } from '../../types/api.types';

export const TablesScreen = () => {
  const [tableCount, setTableCount] = useState(10);
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);
  const [generatingQR, setGeneratingQR] = useState(false);
  const [hasQRCodes, setHasQRCodes] = useState(false);

  // Load tables on mount
  useEffect(() => {
    loadTables();
  }, []);

  // Check if QR codes exist
  useEffect(() => {
    const hasQR = tables.some(t => t.qrCode);
    setHasQRCodes(hasQR);
  }, [tables]);

  /**
   * Load tables - try with QR first, fallback to without
   */
  const loadTables = async () => {
    try {
      setLoading(true);
      
      // Try to get tables with QR codes
      const data = await tablesApi.getBulkQR();
      setTables(data.tables);
      
    } catch {
      // Fallback: get tables without QR codes
      try {
        const tablesData = await tablesApi.getTables();
        setTables(tablesData);
      } catch (err) {
        Alert.alert('Error', 'Failed to load tables');
        console.error('Load tables error:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Generate QR codes for all tables
   */
  const handleGenerateQR = async () => {
    try {
      setGeneratingQR(true);
      
      // Generate tables first if count changed
      await tablesApi.generateTables({ count: tableCount });
      
      // Then fetch with QR codes
      const data = await tablesApi.getBulkQR();
      setTables(data.tables);
      
      Alert.alert('Success', `Generated QR codes for ${tableCount} tables`);
    } catch (error) {
      Alert.alert('Error', 'Failed to generate QR codes');
      console.error('Generate QR error:', error);
    } finally {
      setGeneratingQR(false);
    }
  };

  /**
   * Download PNG for a table
   */
  const handleDownloadPNG = (table: Table) => {
    if (!table.qrCode) {
      Alert.alert('No QR Code', 'Generate QR codes first');
      return;
    }
    
    // TODO: Implement actual download/save functionality
    // For now, just show confirmation
    Alert.alert(
      'Download QR Code',
      `QR code for ${table.name || table.code} ready to download`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Save', onPress: () => {
          // Implement file save logic here
          console.log('Save QR:', table.code);
        }}
      ]
    );
  };

  const activeTablesCount = tables.filter((t) => t.isActive).length;

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading tables...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          {/* Header Section */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Tables & QR Codes</Text>
              <Text style={styles.subtitle}>
                {hasQRCodes 
                  ? 'Scan, download, or regenerate QR codes for each table.'
                  : 'Generate QR codes to enable table ordering.'
                }
              </Text>
            </View>
          </View>

          {/* Control Row */}
          <Card style={styles.controlCard}>
            <View style={styles.controlRow}>
              <View style={styles.controlLeft}>
                {/* Table Count Input */}
                <View style={styles.tableCountControl}>
                  <Text style={styles.tableCountLabel}>TABLE COUNT</Text>
                  <View style={styles.tableCountInput}>
                    <Pressable
                      style={({ pressed }) => [
                        styles.counterButton,
                        pressed && styles.buttonPressed,
                      ]}
                      onPress={() => setTableCount(Math.max(1, tableCount - 1))}
                    >
                      <MaterialIcon name="remove" size={16} color={COLORS.primary} />
                    </Pressable>
                    <Text style={styles.counterValue}>{tableCount}</Text>
                    <Pressable
                      style={({ pressed }) => [
                        styles.counterButton,
                        pressed && styles.buttonPressed,
                      ]}
                      onPress={() => setTableCount(Math.min(50, tableCount + 1))}
                    >
                      <MaterialIcon name="add" size={16} color={COLORS.primary} />
                    </Pressable>
                  </View>
                </View>

                {/* Status Chip */}
                <View style={styles.statusChip}>
                  <View style={styles.statusPulse} />
                  <Text style={styles.statusText}>
                    {tables.length} tables • {activeTablesCount} active
                  </Text>
                </View>
              </View>

              {/* Generate Button */}
              <Pressable
                style={({ pressed }) => [
                  styles.generateButton,
                  pressed && styles.buttonPressed,
                  generatingQR && styles.buttonDisabled,
                ]}
                onPress={handleGenerateQR}
                disabled={generatingQR}
              >
                {generatingQR ? (
                  <ActivityIndicator size="small" color={COLORS.onPrimary} />
                ) : (
                  <MaterialIcon name="sync" size={18} color={COLORS.onPrimary} />
                )}
                <Text style={styles.generateButtonText}>
                  {generatingQR ? 'Generating...' : 'Generate QR Codes'}
                </Text>
              </Pressable>
            </View>
          </Card>

          {/* Empty State */}
          {tables.length === 0 ? (
            <View style={styles.emptyState}>
              <MaterialIcon name="qr_code_scanner" size={64} color={COLORS.outline} />
              <Text style={styles.emptyStateTitle}>No Tables Yet</Text>
              <Text style={styles.emptyStateText}>
                Set the table count above and click "Generate QR Codes" to get started.
              </Text>
            </View>
          ) : (
            /* Table Grid - 4 Columns */
            <View style={styles.tableGrid}>
              {tables.map((table) => (
                <View key={table.code} style={styles.tableCard}>
                  <Card style={styles.card}>
                    {/* Card Header - Compact */}
                    <View style={styles.cardHeader}>
                      <View style={styles.tableInfo}>
                        <View style={styles.tableNumberCircle}>
                          <Text style={styles.tableNumber}>{table.number}</Text>
                        </View>
                        <View style={styles.tableNameContainer}>
                          <Text style={styles.tableName} numberOfLines={1}>
                            {table.name || `Table ${table.number}`}
                          </Text>
                          {table.isActive && (
                            <View style={styles.statusBadge}>
                              <Text style={styles.statusBadgeText}>ACTIVE</Text>
                            </View>
                          )}
                        </View>
                      </View>
                    </View>

                    {/* QR Code Section - Compact */}
                    <View style={styles.qrSection}>
                      <Text style={styles.qrCodeLabel}>CODE: {table.code}</Text>
                      <View style={styles.qrCodeContainer}>
                        {table.qrCode ? (
                          <Image 
                            source={{ uri: table.qrCode }}
                            style={styles.qrCodeImage}
                            resizeMode="contain"
                          />
                        ) : (
                          <View style={styles.qrCodePlaceholder}>
                            <MaterialIcon
                              name="qr_code_2"
                              size={32}
                              color={COLORS.outline}
                            />
                          </View>
                        )}
                      </View>
                      {table.url && (
                        <Text style={styles.qrUrl} numberOfLines={1}>
                          {table.url.replace(/^https?:\/\//, '')}
                        </Text>
                      )}
                    </View>

                    {/* Action Button - PNG Download Only */}
                    {table.qrCode && (
                      <Pressable
                        style={({ pressed }) => [
                          styles.downloadButton,
                          pressed && styles.buttonPressed,
                        ]}
                        onPress={() => handleDownloadPNG(table)}
                      >
                        <MaterialIcon name="download" size={14} color={COLORS.primary} />
                        <Text style={styles.downloadButtonText}>PNG Download</Text>
                      </Pressable>
                    )}
                  </Card>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  
  // Loading State
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.md,
  },
  loadingText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  
  // Content
  content: {
    padding: SPACING.md,        // 16px (was 32px)
    paddingBottom: 80,
  },
  
  // Header Section - Compact
  header: {
    marginBottom: SPACING.md,   // 16px (was 32px)
  },
  title: {
    fontSize: 24,               // was 32px (-25%)
    fontWeight: '700',          // was '900'
    color: COLORS.text,
    marginBottom: SPACING.xs,   // 4px
  },
  subtitle: {
    fontSize: 13,               // was 16px (-19%)
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  
  // Control Card - Modern & Clean
  controlCard: {
    marginBottom: SPACING.md,   // 16px
    padding: SPACING.md,        // 16px (was 24px)
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SPACING.md,
  },
  controlLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    flex: 1,
  },
  
  // Table Count Control - Compact
  tableCountControl: {
    gap: 4,
  },
  tableCountLabel: {
    fontSize: 8,                // was 10px
    fontWeight: '700',
    color: COLORS.textSecondary,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  tableCountInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainerLow,
    borderWidth: 1,
    borderColor: COLORS.outline,
    borderRadius: BORDER_RADIUS.sm,  // 8px
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  counterButton: {
    width: 28,                  // was 32px
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.xs,
  },
  counterValue: {
    width: 40,                  // was 48px
    textAlign: 'center',
    fontSize: 16,               // was 18px
    fontWeight: '700',
    color: COLORS.text,
  },
  
  // Status Chip - Compact
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,            // 4px
    backgroundColor: `${COLORS.primary}0D`,
    borderWidth: 1,
    borderColor: `${COLORS.primary}33`,
    paddingHorizontal: 10,      // was 16px
    paddingVertical: 6,         // was 10px
    borderRadius: BORDER_RADIUS.md,
  },
  statusPulse: {
    width: 6,                   // was 8px
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.tertiary,
  },
  statusText: {
    fontSize: 12,               // was 14px
    fontWeight: '600',
    color: COLORS.tertiary,
  },
  
  // Generate Button - Compact
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,            // 4px
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,  // 16px (was 24px)
    paddingVertical: 8,         // was 12px
    borderRadius: BORDER_RADIUS.md,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  generateButtonText: {
    fontSize: 13,               // was 16px
    fontWeight: '600',
    color: COLORS.onPrimary,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  
  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxxl,
    gap: SPACING.md,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  emptyStateText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    maxWidth: 300,
    lineHeight: 20,
  },
  
  // Table Grid - Tighter
  tableGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,                    // was 24px (-50%)
  },
  tableCard: {
    width: 'calc(25% - 9px)',   // 4 columns with 12px gaps
    minWidth: 220,              // was 250px
  },
  
  // Card - Ultra Compact
  card: {
    padding: 14,                // was 24px (-42%)
    borderRadius: BORDER_RADIUS.md,  // 12px (was 16/24)
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    backgroundColor: COLORS.surface,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,        // was 0.08
    shadowRadius: 2,            // was 4
    elevation: 1,
  },
  
  // Card Header - Compact
  cardHeader: {
    marginBottom: SPACING.sm,   // 8px (was 24px)
  },
  tableInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,            // 8px (was 16px)
  },
  tableNumberCircle: {
    width: 36,                  // was 48px (-25%)
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableNumber: {
    fontSize: 14,               // was 18px (-22%)
    fontWeight: '700',
    color: COLORS.onPrimary,
  },
  tableNameContainer: {
    flex: 1,
  },
  tableName: {
    fontSize: 13,               // was 16px (-19%)
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  statusBadge: {
    backgroundColor: `${COLORS.tertiary}15`,
    paddingHorizontal: 6,       // was 8px
    paddingVertical: 1,         // was 2px
    borderRadius: BORDER_RADIUS.full,
    alignSelf: 'flex-start',
  },
  statusBadgeText: {
    fontSize: 8,                // was 10px (-20%)
    fontWeight: '700',
    color: COLORS.tertiary,
    letterSpacing: 0.5,
  },
  
  // QR Code Section - Compact
  qrSection: {
    alignItems: 'center',
    paddingVertical: 10,        // was 16px (-38%)
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.sm,
    marginBottom: SPACING.sm,   // 8px (was 24px)
  },
  qrCodeLabel: {
    fontSize: 8,                // was 10px (-20%)
    fontWeight: '700',
    color: COLORS.secondary,
    letterSpacing: 1,
    marginBottom: 6,            // was 8px
  },
  qrCodeContainer: {
    width: 90,                  // was 128px (-30%)
    height: 90,
    backgroundColor: COLORS.surface,
    padding: 6,                 // was 12px
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    marginBottom: 6,            // was 12px
  },
  qrCodeImage: {
    width: '100%',
    height: '100%',
  },
  qrCodePlaceholder: {
    flex: 1,
    backgroundColor: `${COLORS.primary}08`,
    borderRadius: BORDER_RADIUS.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrUrl: {
    fontSize: 9,                // was 11px (-18%)
    fontWeight: '500',
    color: COLORS.textSecondary,
    fontFamily: 'monospace',
  },
  
  // Download Button - Single Action
  downloadButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,                     // was 8px
    borderWidth: 1,
    borderColor: COLORS.outline,
    borderRadius: BORDER_RADIUS.sm,
    paddingVertical: 8,         // was 10px
    backgroundColor: `${COLORS.primary}0A`,
  },
  downloadButtonText: {
    fontSize: 11,               // was 12px
    fontWeight: '600',
    color: COLORS.primary,
  },
  
  // Interactive States
  buttonPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.8,
  },
});
