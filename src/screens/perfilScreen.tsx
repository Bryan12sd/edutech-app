import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Estudiante } from '../db/types';
import { storage } from '../db/storage';
import { styles } from '../config/styles';

export default function PerfilScreen() {
  const [user, setUser] = useState<Estudiante | null>(null);
  const userId = Number(storage.getString('user_id'));
  const email = storage.getString('email');

  useEffect(() => {
    fetch('http://192.168.100.40:8000/api/estudiantes/')
      .then(res => res.json())
      .then(data => {
        const encontrado = data.find((e: Estudiante) => e.user === userId);
        setUser(encontrado);
      });
  }, []);

  return (
     <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>

      <View style={styles.card}>
        <Text style={styles.text}>Nombre: {user?.nombre}</Text>
        <Text style={styles.text}>Email: {user?.email}</Text>
      </View>
    </View>
  );
}
