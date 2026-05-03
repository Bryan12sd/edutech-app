import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Curso } from '../db/types';
import { API_BASE_URL } from '../config/constants';
import { useUser } from '../hooks/useUser';

export default function MatriculaScreen() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const user = useUser();

  useEffect(() => {
    fetchCursos();
  }, []);

  const fetchCursos = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/cursos/`);
      const data = await res.json();
      setCursos(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const matricular = async (cursoId: number) => {
    try {
      setLoadingId(cursoId);

      const res = await fetch(`${API_BASE_URL}/matriculas/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          estudiante: user?.user_id,
          curso: cursoId,
        }),
      });

      if (res.ok) {
        Alert.alert('Éxito', 'Te matriculaste correctamente');
      } else {
        Alert.alert('Error', 'No se pudo matricular');
      }
    } catch (e) {
      Alert.alert('Error', 'Fallo de conexión');
    } finally {
      setLoadingId(null);
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
        <Text style={styles.title}>Matrícula</Text>
        <Text style={styles.subtitle}>
          Inscríbete en nuevos cursos
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
            data={cursos}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View style={styles.card}>
                
                {/* COLOR */}
                <View
                  style={[
                    styles.colorBar,
                    { backgroundColor: getColor(index) },
                  ]}
                />

                {/* INFO */}
                <View style={styles.cardContent}>
                  <Text style={styles.course}>
                    {item.nombre}
                  </Text>
                  <Text style={styles.label}>
                    Disponible
                  </Text>
                </View>

                {/* BOTÓN */}
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => matricular(item.id)}
                  disabled={loadingId === item.id}
                >
                  {loadingId === item.id ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>
                      Matricular
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.empty}>
                No hay cursos disponibles
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

  colorBar: {
    width: 6,
    height: 50,
    borderRadius: 3,
    marginRight: 12,
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

  button: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },

  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
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