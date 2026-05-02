import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { Curso } from '../db/types';
import { storage } from '../db/storage';

export default function MatriculaScreen() {

  const [cursos, setCursos] = useState<Curso[]>([]);
  const userId = Number(storage.getString('user_id'));

  useEffect(() => {
    fetch('http://192.168.100.40:8000/api/cursos/')
      .then(res => res.json())
      .then(setCursos);
  }, []);

  const matricular = (cursoId: number) => {
    fetch('http://192.168.100.40:8000/api/matriculas/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        estudiante: userId,
        curso: cursoId
      })
    });
  };

  return (
    <View>
      <FlatList
        data={cursos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.nombre}</Text>
            <Button title="Matricular" onPress={() => matricular(item.id)} />
          </View>
        )}
      />
    </View>
  );
}