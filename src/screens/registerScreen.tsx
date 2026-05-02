import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: Props) {

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const register = async () => {

    
    const res = await fetch('http://127.0.0.1:8000/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();
    console.log({ username, email, password });
    Alert.alert(data.message);
    navigation.goBack();
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Registro</Text>

      <TextInput placeholder="Usuario" onChangeText={setUsername} />
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput placeholder="Contraseña" secureTextEntry onChangeText={setPassword} />

      <Button title="Registrar" onPress={register} />
    </View>
  );
}