import React from 'react';
import { View, Text } from 'react-native';
import { storage } from '../db/storage';

export default function HomeScreen() {

  const username = storage.getString('username');

  return (
    <View style={{ padding: 20 }}>
      <Text>Bienvenido {username}</Text>
    </View>
  );
}