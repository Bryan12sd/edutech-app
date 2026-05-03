import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { storage } from '../db/storage';
import { styles } from '../config/styles';
export default function HomeScreen() {
  const username = storage.getString('username');
  const email = storage.getString('email');
  console.log(email);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EduTech</Text>
    </View>
  );
}
