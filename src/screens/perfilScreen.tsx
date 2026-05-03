import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { Estudiante } from '../db/types';
import { API_BASE_URL } from '../config/constants';
import { useUser } from '../hooks/useUser';

export default function PerfilScreen() {
  const [estudiante, setEstudiante] = useState<Estudiante | null>(null);
  const [loading, setLoading] = useState(true);

  const user = useUser();

  useEffect(() => {
    fetchEstudiante();
  }, []);

  const fetchEstudiante = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/estudiantes/`);
      const data = await res.json();

      const encontrado = data.find(
        (e: Estudiante) => e.user === user?.user_id
      );

      setEstudiante(encontrado);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const getInitial = () => {
    if (!user?.username) return 'U';
    return user.username.charAt(0).toUpperCase();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getInitial()}</Text>
        </View>

        <Text style={styles.name}>{user?.username}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      {/* CONTENIDO */}
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Información Personal</Text>

              <Text style={styles.label}>Usuario</Text>
              <Text style={styles.value}>{user?.username}</Text>

              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{user?.email}</Text>
            </View>

            {estudiante && (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Datos Académicos</Text>

                <Text style={styles.label}>ID Estudiante</Text>
                <Text style={styles.value}>{estudiante.id}</Text>

                {/* agrega más campos si tienes */}
              </View>
            )}
          </>
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

  /* HEADER */
  header: {
    backgroundColor: '#0f172a',
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  avatarText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },

  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  email: {
    color: '#cbd5e1',
    fontSize: 13,
  },

  /* CONTENT */
  content: {
    padding: 15,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 10,
  },

  label: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 8,
  },

  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
});