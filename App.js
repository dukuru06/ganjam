import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthProvider } from './src/context/AuthContext';
import RootNavigator from './src/navigation';

export default function App() {
  const [fontsLoaded, fontError] = useFonts({ ...Ionicons.font });
  const [timedOut, setTimedOut] = useState(false);

  // Don't let a stuck/failed font load leave the app on a blank screen forever.
  useEffect(() => {
    const t = setTimeout(() => setTimedOut(true), 3000);
    return () => clearTimeout(t);
  }, []);

  if (!fontsLoaded && !fontError && !timedOut) {
    return <View style={{ flex: 1, backgroundColor: '#0A0A12' }} />;
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar style="light" />
        <RootNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
