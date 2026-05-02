import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { storage } from '../db/storage';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const login = async () => {
    console.log('aplasto');
    try {
      const res = await fetch('http://192.168.100.40:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      console.log('aplasto 2 ');
      const data = await res.json();

      if (data.message === 'Login exitoso') {
        storage.set('user_id', data.user_id.toString());
        storage.set('username', data.username);

        navigation.replace('Home');
      } else {
        Alert.alert('Error', 'Credenciales incorrectas');
      }
    } catch (error) {
      console.log(error);
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
