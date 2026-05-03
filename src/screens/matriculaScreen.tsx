import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../config/styles';
import { storage } from '../db/storage';
import { Curso } from '../db/types';
import { API_BASE_URL } from '../config/constants';
export default function MatriculaScreen() {

  const [cursos, setCursos] = useState<Curso[]>([]);
  const userId = Number(storage.getString('user_id'));

  useEffect(() => {
    fetch(`${API_BASE_URL}/cursos/`)
      .then(res => res.json())
      .then(setCursos);
  }, []);

  const matricular = (cursoId: number) => {
    fetch(`${API_BASE_URL}/matriculas/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        estudiante: userId,
        curso: cursoId
      })
    });
  };

  return (
     <View style={styles.container}>
      <Text style={styles.title}>Matrícula</Text>

      <FlatList
        data={cursos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>{item.nombre}</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => matricular(item.id)}
            >
              <Text style={styles.buttonText}>Matricular</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}