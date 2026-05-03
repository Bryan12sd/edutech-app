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
  RefreshControl
} from 'react-native';
import { Curso } from '../db/types';
import { API_BASE_URL } from '../config/constants';
import { useUser } from '../hooks/useUser';

type Matricula = {
  curso: number;
};

export default function MatriculaScreen() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [misCursos, setMisCursos] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const user = useUser();

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const cursosRes = await fetch(`${API_BASE_URL}/cursos/`);
      const cursosData = await cursosRes.json();

      const matRes = await fetch(
        `${API_BASE_URL}/matriculas?user_id=${user.user_id}`,
      );
      const matData: Matricula[] = await matRes.json();

      const inscritos = matData.map(m => m.curso);

      setCursos(cursosData);
      setMisCursos(inscritos);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false); // solo afecta carga inicial
    }
  };
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };
  const matricular = async (cursoId: number) => {
    try {
      setLoadingId(cursoId);

      const res = await fetch(`${API_BASE_URL}/matriculas/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          estudiante: user.user_id,
          curso: cursoId,
        }),
      });

      if (res.ok) {
        Alert.alert('Éxito', 'Te matriculaste correctamente');

        // actualizar estado local (sin recargar todo)
        setMisCursos(prev => [...prev, cursoId]);
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

  const isInscrito = (cursoId: number) => {
    return misCursos.includes(cursoId);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

      <View style={styles.header}>
        <Text style={styles.title}>📝 Matrícula</Text>
        <Text style={styles.subtitle}>Inscríbete en nuevos cursos</Text>
      </View>

      <View style={styles.content}>
        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" />
            <Text style={styles.loadingText}>Cargando...</Text>
          </View>
        ) : (
          <FlatList
            data={cursos}
            keyExtractor={item => item.id.toString()}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#3b82f6']} // Android
                tintColor="#3b82f6" // iOS
              />
            }
            renderItem={({ item, index }) => {
              const inscrito = isInscrito(item.id);

              return (
                <View style={styles.card}>
                  <View
                    style={[
                      styles.colorBar,
                      { backgroundColor: getColor(index) },
                    ]}
                  />

                  <View style={styles.cardContent}>
                    <Text style={styles.course}>{item.nombre}</Text>

                    <Text style={styles.label}>
                      {inscrito ? 'Ya inscrito' : 'Disponible'}
                    </Text>
                  </View>

                  {inscrito ? (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>Inscrito</Text>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => matricular(item.id)}
                      disabled={loadingId === item.id}
                    >
                      {loadingId === item.id ? (
                        <ActivityIndicator color="#fff" />
                      ) : (
                        <Text style={styles.buttonText}>Matricular</Text>
                      )}
                    </TouchableOpacity>
                  )}
                </View>
              );
            }}
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
  },

  label: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
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

  badge: {
    backgroundColor: '#d1fae5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },

  badgeText: {
    color: '#065f46',
    fontWeight: 'bold',
    fontSize: 12,
  },

  center: {
    alignItems: 'center',
    marginTop: 50,
  },

  loadingText: {
    marginTop: 10,
    color: '#64748b',
  },
});
