import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { ID_OBJECT, storage } from '../db/storage';
import { API_BASE_URL } from '../config/constants';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const login = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      console.log('status:', res.status);
      console.log('data:', data);

      if (res.ok) {
        const user = {
          user_id: data.user_id,
          username: data.username,
          email: data.email,
        };

        storage.set(ID_OBJECT.user, JSON.stringify(user));

        navigation.replace('Home');
      } else {
        Alert.alert('Error', data.message || 'Credenciales incorrectas');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'No se pudo conectar al servidor');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Login</Text>

      <TextInput placeholder="Usuario" onChangeText={setUsername} />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Ingresar" onPress={login} />
      <Button
        title="Registrarse"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
}
