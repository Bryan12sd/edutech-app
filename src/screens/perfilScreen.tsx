import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Estudiante } from '../db/types';
import { storage } from '../db/storage';
import { styles } from '../config/styles';
import { API_BASE_URL } from '../config/constants';
import { useUser } from '../hooks/useUser';

export default function PerfilScreen() {
  const [user, setUser] = useState<Estudiante | null>(null);

  const userId = Number(storage.getString('user_id'));
  const userM = useUser();

  useEffect(() => {
    fetch(`${API_BASE_URL}/estudiantes/`)
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
        <Text style={styles.text}>Nombre: {userM?.username}</Text>
        <Text style={styles.text}>Email: {userM?.email}</Text>
      </View>
    </View>
  );
}
