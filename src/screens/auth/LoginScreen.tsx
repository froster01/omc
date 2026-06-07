/**
 * Login Screen - Stitch Sage Green Design
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from '../../components/common/Button';
import { MaterialIcon } from '../../components/common/MaterialIcon';
import { GlassCard } from '../../components/layout/GlassCard';
import { useAuth } from '../../hooks/useAuth';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../../utils/designTokens';
import type { LoginScreenProps } from '../../types/navigation.types';

export const LoginScreen: React.FC<LoginScreenProps> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error, clearError } = useAuth();

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter username and password');
      return;
    }

    try {
      clearError();
      await login(username.trim(), password);
    } catch (err) {
      Alert.alert('Login Failed', error || 'Invalid credentials');
    }
  };

  return (
    <LinearGradient
      colors={['#F5F9F0', '#E8F0E0']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.content}>
          {/* Branding Header with Logo */}
          <View style={styles.brandingContainer}>
            <Image
              source={require('../../../assets/olmosq-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Olmosq Coffee</Text>
            <Text style={styles.subtitle}>Staff Portal</Text>
          </View>

          {/* Login Form Card */}
          <GlassCard style={styles.formCard}>
            <View style={styles.form}>
              {/* Staff ID Field */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Staff ID</Text>
                <View style={styles.inputContainer}>
                  <MaterialIcon
                    name="account"
                    size={20}
                    color={COLORS.primary}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter ID number"
                    placeholderTextColor={COLORS.textDisabled}
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!isLoading}
                  />
                </View>
              </View>

              {/* Password Field */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputContainer}>
                  <MaterialIcon
                    name="lock"
                    size={20}
                    color={COLORS.primary}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="••••••••"
                    placeholderTextColor={COLORS.textDisabled}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!isLoading}
                    onSubmitEditing={handleLogin}
                  />
                </View>
              </View>

              {error && <Text style={styles.error}>{error}</Text>}

              {/* Action Button */}
              <Button
                title="Sign In"
                onPress={handleLogin}
                loading={isLoading}
                size="large"
                icon="login"
                style={styles.button}
              />
            </View>
          </GlassCard>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  brandingContainer: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  logo: {
    width: 96,
    height: 96,
    marginBottom: SPACING.md,
  },
  title: {
    ...TYPOGRAPHY.headlineLg,
    color: COLORS.tertiary,
    fontWeight: '900',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    ...TYPOGRAPHY.bodyLg,
    color: COLORS.secondaryDark,
    fontWeight: '500',
  },
  formCard: {
    width: '100%',
    maxWidth: 450,
    padding: SPACING.cardPaddingLg,
  },
  form: {
    gap: SPACING.md,
  },
  inputGroup: {
    gap: SPACING.xs,
  },
  label: {
    ...TYPOGRAPHY.labelMd,
    color: COLORS.tertiary,
    fontWeight: '600',
    marginLeft: SPACING.xs,
  },
  inputContainer: {
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  inputIcon: {
    position: 'absolute',
    left: SPACING.md,
    top: 18,
    zIndex: 1,
  },
  input: {
    ...TYPOGRAPHY.bodyLg,
    paddingLeft: SPACING.xxxl,
    paddingRight: SPACING.md,
    paddingVertical: SPACING.md,
    color: COLORS.text,
    fontWeight: '500',
  },
  error: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.error,
    textAlign: 'center',
  },
  button: {
    marginTop: SPACING.sm,
  },
});
