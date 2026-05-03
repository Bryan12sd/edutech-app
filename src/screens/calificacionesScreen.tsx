import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Calificacion } from '../db/types';
import { styles } from '../config/styles';
import { storage } from '../db/storage';
import { API_BASE_URL } from '../config/constants';
export default function CalificacionesScreen() {

  const [data, setData] = useState<Calificacion[]>([]);
  const userId = Number(storage.getString('user_id'));

  useEffect(() => {
    fetch(`${API_BASE_URL}/calificaciones/`)
      .then(res => res.json())
      .then(res => {
        const filtrado = res.filter((c: Calificacion) => c.estudiante === userId);
        setData(filtrado);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calificaciones</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>Curso ID: {item.curso}</Text>
            <Text style={styles.text}>Nota: {item.nota}</Text>
          </View>
        )}
      />
    </View>
  );
}