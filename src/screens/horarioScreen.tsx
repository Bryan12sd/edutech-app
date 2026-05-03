import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { Horario } from '../db/types';
import { API_BASE_URL } from '../config/constants';

export default function HorariosScreen() {
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHorarios();
  }, []);

  const fetchHorarios = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/horario`);
      const data = await res.json();
      setHorarios(data);
    } catch (err) {
      console.log('ERROR API:', err);
    } finally {
      setLoading(false);
    }
  };

  const getColor = (index: number) => {
    const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'];
    return colors[index % colors.length];
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Horarios</Text>
        <Text style={styles.subtitle}>
          Consulta tus clases programadas
        </Text>
      </View>

      {/* CONTENIDO */}
      <View style={styles.content}>
        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" />
            <Text style={styles.loadingText}>Cargando...</Text>
          </View>
        ) : (
          <FlatList
            data={horarios}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View style={styles.card}>
                
                {/* HORA */}
                <View style={styles.timeBox}>
                  <Text style={styles.hour}>{item.hora}</Text>
                  <Text style={styles.day}>{item.dia}</Text>
                </View>

                {/* INFO */}
                <View style={styles.cardContent}>
                  <Text style={styles.course}>
                    {item.curso_nombre}
                  </Text>
                  <Text style={styles.label}>
                    Clase programada
                  </Text>
                </View>

                {/* INDICADOR */}
                <View
                  style={[
                    styles.dot,
                    { backgroundColor: getColor(index) },
                  ]}
                />
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.empty}>
                No hay horarios disponibles
              </Text>
            }
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },

  header: {
    backgroundColor: '#0f172a',
    paddingTop: 20,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },

  subtitle: {
    fontSize: 13,
    color: '#fff',
    opacity: 0.8,
    marginTop: 5,
  },

  content: {
    flex: 1,
    padding: 15,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  timeBox: {
    alignItems: 'center',
    marginRight: 15,
    minWidth: 70,
  },

  hour: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
  },

  day: {
    fontSize: 12,
    color: '#64748b',
  },

  cardContent: {
    flex: 1,
  },

  course: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },

  label: {
    fontSize: 12,
    color: '#64748b',
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  center: {
    alignItems: 'center',
    marginTop: 50,
  },

  loadingText: {
    marginTop: 10,
    color: '#64748b',
  },

  empty: {
    textAlign: 'center',
    marginTop: 30,
    color: '#94a3b8',
  },
});