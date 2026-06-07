declare module 'react-native-config' {
  export interface NativeConfig {
    API_URL?: string;
    API_BASE_URL?: string;
    NODE_ENV?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
