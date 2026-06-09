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
  Modal,
} from 'react-native';
import { RefreshCw, Download, QrCode, Minus, Plus } from 'lucide-react-native';
import { Card } from '../../components/common/Card';
import { COLORS, SPACING, BORDER_RADIUS } from '../../utils/designTokens';
import { tablesApi } from '../../api/tables.api';
import type { Table } from '../../types/api.types';

export const TablesScreen = () => {
  const [tableCount, setTableCount] = useState(10);
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);
  const [generatingQR, setGeneratingQR] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Load tables on mount
  useEffect(() => {
    loadTables();
  }, []);

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
      setIsModalVisible(false); // Close modal on success
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
          {/* Control Row */}
          <View style={styles.controlRow}>
            <View style={styles.statusChip}>
              <View style={styles.statusPulse} />
              <Text style={styles.statusText}>
                {tables.length} tables • {activeTablesCount} active
              </Text>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.generateButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={() => setIsModalVisible(true)}
            >
              <RefreshCw size={16} color={COLORS.onPrimary} strokeWidth={2} />
              <Text style={styles.generateButtonText}>Generate QR</Text>
            </Pressable>
          </View>

          {/* Empty State */}
          {tables.length === 0 ? (
            <View style={styles.emptyState}>
              <QrCode size={64} color={COLORS.outline} strokeWidth={2} />
              <Text style={styles.emptyStateTitle}>No Tables Yet</Text>
              <Text style={styles.emptyStateText}>
                Click "Generate QR" to create tables and their QR codes.
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
                            <QrCode
                              size={32}
                              color={COLORS.outline}
                              strokeWidth={2}
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
                        <Download size={12} color={COLORS.primary} strokeWidth={2} />
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

      {/* QR Generation Modal */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Generate QR Codes</Text>
              <Text style={styles.modalSubtitle}>
                Specify how many table QR codes to generate
              </Text>
            </View>

            {/* Table Count Input */}
            <View style={styles.modalBody}>
              <Text style={styles.tableCountLabel}>TABLE COUNT</Text>
              <View style={styles.tableCountInput}>
                <Pressable
                  style={({ pressed }) => [
                    styles.counterButton,
                    pressed && styles.buttonPressed,
                  ]}
                  onPress={() => setTableCount(Math.max(1, tableCount - 1))}
                  disabled={generatingQR}
                >
                  <Minus size={16} color={COLORS.primary} strokeWidth={2} />
                </Pressable>
                <Text style={styles.counterValue}>{tableCount}</Text>
                <Pressable
                  style={({ pressed }) => [
                    styles.counterButton,
                    pressed && styles.buttonPressed,
                  ]}
                  onPress={() => setTableCount(Math.min(50, tableCount + 1))}
                  disabled={generatingQR}
                >
                  <Plus size={16} color={COLORS.primary} strokeWidth={2} />
                </Pressable>
              </View>
            </View>

            {/* Modal Actions */}
            <View style={styles.modalActions}>
              <Pressable
                style={({ pressed }) => [
                  styles.modalButton,
                  styles.cancelButton,
                  pressed && styles.buttonPressed,
                ]}
                onPress={() => setIsModalVisible(false)}
                disabled={generatingQR}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.modalButton,
                  styles.confirmButton,
                  pressed && styles.buttonPressed,
                  generatingQR && styles.buttonDisabled,
                ]}
                onPress={handleGenerateQR}
                disabled={generatingQR}
              >
                {generatingQR ? (
                  <ActivityIndicator size="small" color={COLORS.onPrimary} />
                ) : (
                  <Text style={styles.confirmButtonText}>Generate</Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    padding: SPACING.md,
    paddingBottom: 80,
  },

  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  
  // Table Count Control - Compact (now in modal)
  tableCountLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textSecondary,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: SPACING.xs,
  },
  tableCountInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surfaceContainerLow,
    borderWidth: 1,
    borderColor: COLORS.outline,
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  counterButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.xs,
  },
  counterValue: {
    width: 60,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },
  
  // Status Chip - Compact
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    backgroundColor: `${COLORS.primary}0D`,
    borderWidth: 1,
    borderColor: `${COLORS.primary}33`,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.md,
  },
  statusPulse: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.tertiary,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.tertiary,
  },
  
  // Generate Button - Compact
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: 8,
    borderRadius: BORDER_RADIUS.md,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  generateButtonText: {
    fontSize: 13,
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
    gap: SPACING.sm,
  },
  tableCard: {
    width: '19.2%',
    minWidth: 160,
  },
  
  // Card - Ultra Compact
  card: {
    padding: SPACING.sm + 2,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    backgroundColor: COLORS.surface,
    elevation: 1,
  },

  cardHeader: {
    marginBottom: SPACING.xs,
  },
  tableInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs + 2,
  },
  tableNumberCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableNumber: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.onPrimary,
  },
  tableNameContainer: {
    flex: 1,
  },
  tableName: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 1,
  },
  statusBadge: {
    backgroundColor: `${COLORS.tertiary}15`,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: BORDER_RADIUS.full,
    alignSelf: 'flex-start',
  },
  statusBadgeText: {
    fontSize: 7,
    fontWeight: '700',
    color: COLORS.tertiary,
    letterSpacing: 0.5,
  },

  qrSection: {
    alignItems: 'center',
    paddingVertical: SPACING.xs + 2,
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.sm,
    marginBottom: SPACING.xs,
  },
  qrCodeLabel: {
    fontSize: 7,
    fontWeight: '700',
    color: COLORS.secondary,
    letterSpacing: 1,
    marginBottom: 4,
  },
  qrCodeContainer: {
    width: 72,
    height: 72,
    backgroundColor: COLORS.surface,
    padding: 4,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    marginBottom: 4,
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
    fontSize: 8,
    fontWeight: '500',
    color: COLORS.textSecondary,
    fontFamily: 'monospace',
  },

  downloadButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: COLORS.outline,
    borderRadius: BORDER_RADIUS.sm,
    paddingVertical: 6,
    backgroundColor: `${COLORS.primary}0A`,
  },
  downloadButtonText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.primary,
  },
  
  // Interactive States
  buttonPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.8,
  },
  
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  modalContent: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xl,
    width: '100%',
    maxWidth: 400,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  modalHeader: {
    marginBottom: SPACING.lg,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  modalSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  modalBody: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  modalActions: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  cancelButton: {
    backgroundColor: COLORS.surfaceContainerLow,
    borderWidth: 1,
    borderColor: COLORS.outline,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  confirmButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.onPrimary,
  },
});
