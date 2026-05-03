import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { API_BASE_URL } from '../config/constants';
import { ID_OBJECT, storage } from '../db/storage';
type Calificacion = {
  id: number;
  nota: number;
  curso_nombre: string;
};

export default function CalificacionesScreen() {
  const [calificaciones, setCalificaciones] = useState<Calificacion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
           const res = await fetch(`${API_BASE_URL}/calificaciones/`);
           const data: Calificacion[] = await res.json();
           setCalificaciones(data);
           storage.set(ID_OBJECT.calificaciones, JSON.stringify(data));
         } catch (error) {
          console.log('ERROR API:', error);
         const cache = storage.getString(ID_OBJECT.calificaciones);
         if (cache) {
           setCalificaciones(JSON.parse(cache));
         }
         } finally {
           setLoading(false);
         }
  };

  const getColor = (nota: number) => {
    if (nota >= 9) return '#10b981'; // excelente
    if (nota >= 7) return '#3b82f6'; // aprobado
    return '#ef4444'; // reprobado
  };

  const getLabel = (nota: number) => {
    if (nota >= 9) return 'Excelente';
    if (nota >= 7) return 'Aprobado';
    return 'Reprobado';
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>🎓 Calificaciones</Text>
        <Text style={styles.subtitle}>
          Revisa tu rendimiento académico
        </Text>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" />
            <Text style={styles.loadingText}>Cargando...</Text>
          </View>
        ) : (
          <FlatList
            data={calificaciones}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View style={styles.card}>
                
                {/* BARRA COLOR */}
                <View
                  style={[
                    styles.colorBar,
                    { backgroundColor: getColor(item.nota) },
                  ]}
                />

                {/* CONTENIDO */}
                <View style={styles.cardContent}>
                  <Text style={styles.course}>
                    {item.curso_nombre}
                  </Text>

                  <Text style={styles.label}>
                    {getLabel(item.nota)}
                  </Text>
                </View>

                {/* NOTA */}
                <View
                  style={[
                    styles.badge,
                    { backgroundColor: getColor(item.nota) },
                  ]}
                >
                  <Text style={styles.badgeText}>
                    {item.nota}
                  </Text>
                </View>
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.empty}>
                No hay calificaciones disponibles
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

  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },

  badgeText: {
    color: 'white',
    fontWeight: 'bold',
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