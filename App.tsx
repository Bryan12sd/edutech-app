import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { StatusBar, View,Text } from 'react-native';
import { useNetwork } from './src/hooks/useNetwork';
export default function App() {
  const { isOnline } = useNetwork();
  return (
    <>
      
      {!isOnline && (
              <View
                style={{
                  backgroundColor: '#ef4444',
                  padding: 8,
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'white', fontSize: 12 }}>
                  Sin conexión a internet
                </Text>
              </View>
            )}
      <AppNavigator />
    </>
  );
}