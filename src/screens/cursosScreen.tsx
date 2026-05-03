import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Curso } from '../db/types';
import { API_BASE_URL } from '../config/constants';
import { ID_OBJECT, storage } from '../db/storage';

export default function CursosScreen() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCursos();
  }, []);

  const fetchCursos = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/cursos/`);
    const data: Curso[] = await res.json();

    setCursos(data);
    storage.set(ID_OBJECT.cursos, JSON.stringify(data));
  } catch (e) {
    console.log('ERROR API:', e);
    const cache = storage.getString(ID_OBJECT.cursos);
    if (cache) {
      setCursos(JSON.parse(cache));
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Cursos</Text>
        <Text style={styles.subtitle}>
          Aquí puedes ver todos tus cursos disponibles
        </Text>
      </View>

      {/* CONTENIDO */}
      <View style={styles.content}>
        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" />
            <Text style={styles.loadingText}>Cargando cursos...</Text>
          </View>
        ) : (
          <FlatList
            data={cursos}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View style={styles.card}>
                <View
                  style={[
                    styles.colorBar,
                    { backgroundColor: getColor(index) },
                  ]}
                />

                <View style={styles.cardContent}>
                  <Text style={styles.courseName}>{item.nombre}</Text>
                  <Text style={styles.courseInfo}>
                    Curso académico
                  </Text>
                </View>

                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Activo</Text>
                </View>
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

/* Colores dinámicos tipo dashboard */
const getColor = (index: number) => {
  const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'];
  return colors[index % colors.length];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },

  /* HEADER */
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

  /* CONTENIDO */
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

  courseName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },

  courseInfo: {
    fontSize: 12,
    color: '#64748b',
  },

  badge: {
    backgroundColor: '#d1fae5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },

  badgeText: {
    fontSize: 11,
    color: '#065f46',
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