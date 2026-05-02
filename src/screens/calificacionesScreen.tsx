import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Calificacion } from '../db/types';
import { storage } from '../db/storage';

export default function CalificacionesScreen() {

  const [data, setData] = useState<Calificacion[]>([]);
  const userId = Number(storage.getString('user_id'));

  useEffect(() => {
    fetch('http://192.168.100.40:8000/api/calificaciones/')
      .then(res => res.json())
      .then(res => {
        const filtrado = res.filter((c: Calificacion) => c.estudiante === userId);
        setData(filtrado);
      });
  }, []);

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>Curso: {item.curso} - Nota: {item.nota}</Text>
        )}
      />
    </View>
  );
}