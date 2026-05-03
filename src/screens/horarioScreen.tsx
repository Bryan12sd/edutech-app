import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { styles } from '../config/styles';
import { Horario } from '../db/types';

export default function HorariosScreen() {
  const [horarios, setHorarios] = useState<Horario[]>([]);

  useEffect(() => {
    fetch('http://192.168.100.40:8000/api/horario')
      .then(res => res.json())
      .then(data => {
        console.log('RESPUESTA API:', data);
        setHorarios(data);
      })
      .catch(err => console.log('ERROR API:', err));
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Horarios</Text>

      <FlatList
        data={horarios}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>Día: {item.dia}</Text>
            <Text style={styles.text}>Hora: {item.hora}</Text>
            <Text style={styles.text}>Curso: {item.curso_nombre}</Text>
          </View>
        )}
      />
    </View>
  );
}
