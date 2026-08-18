import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import { ProductProvider } from './src/context/ProductContext';
import { ChatProvider } from './src/context/ChatContext';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ProductProvider>
          <ChatProvider>
            <AppNavigator />
            <StatusBar style="auto" />
          </ChatProvider>
        </ProductProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
