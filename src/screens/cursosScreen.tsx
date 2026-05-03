import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Curso } from '../db/types';
import { styles } from '../config/styles';
import { API_BASE_URL } from '../config/constants';
export default function CursosScreen() {

  const [cursos, setCursos] = useState<Curso[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/cursos/`)
      .then(res => res.json())
      .then(data => setCursos(data));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cursos</Text>

      <FlatList
        data={cursos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>{item.nombre}</Text>
          </View>
        )}
      />
    </View>
  );
}