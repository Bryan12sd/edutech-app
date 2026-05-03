import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Curso } from '../db/types';
import { styles } from '../config/styles';
export default function CursosScreen() {

  const [cursos, setCursos] = useState<Curso[]>([]);

  useEffect(() => {
    fetch('http://192.168.100.40:8000/api/cursos/')
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