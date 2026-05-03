import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import { storage } from '../db/storage';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const username = storage.getString('username') || 'Estudiante';
  const email = storage.getString('email');

  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    const date = new Date().toLocaleDateString('es-ES', options);
    setCurrentDate(date.charAt(0).toUpperCase() + date.slice(1));
  }, []);

  // Datos de ejemplo
  const stats = {
    cursosActivos: 5,
    cursosCompletados: 2,
    promedio: 8.5,
    tareasPendientes: 3,
  };

  const proximasClases = [
    { nombre: 'Matemáticas', hora: '08:00', duracion: '2h', aula: 'Aula 301', color: '#3b82f6' },
    { nombre: 'Física', hora: '10:30', duracion: '1.5h', aula: 'Lab 102', color: '#10b981' },
  ];

  const misCursos = [
    { id: 1, nombre: 'Matemáticas', profesor: 'Dr. García', color: '#3b82f6' },
    { id: 2, nombre: 'Física', profesor: 'Dra. Martínez', color: '#10b981' },
    { id: 3, nombre: 'Química', profesor: 'Dr. López', color: '#8b5cf6' },
    { id: 4, nombre: 'Historia', profesor: 'Dra. Rodríguez', color: '#f59e0b' },
  ];

  const accesosRapidos = [
    { id: 1, titulo: 'Calificaciones', icono: '📊', color: '#3b82f6' },
    { id: 2, titulo: 'Horario', icono: '📅', color: '#10b981' },
    { id: 3, titulo: 'Matrícula', icono: '📚', color: '#8b5cf6' },
    { id: 4, titulo: 'Perfil', icono: '👤', color: '#ef4444' },
  ];

  const actividades = [
    { tipo: 'calificacion', mensaje: 'Calificación publicada en Matemáticas', tiempo: 'Hace 2 horas', icono: '📊', color: '#3b82f6' },
    { tipo: 'tarea', mensaje: 'Nueva tarea en Física', tiempo: 'Hace 5 horas', icono: '📝', color: '#10b981' },
    { tipo: 'matricula', mensaje: 'Matriculado en Química', tiempo: 'Hace 1 día', icono: '✅', color: '#8b5cf6' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>👋 Hola, {username}</Text>
            <Text style={styles.subtitle}>Aquí está tu resumen académico de hoy</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.dateIcon}>📅</Text>
            <Text style={styles.dateText}>{currentDate}</Text>
          </View>
        </View>

        {/* ESTADÍSTICAS */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { borderLeftColor: '#3b82f6' }]}>
            <Text style={styles.statIcon}>📚</Text>
            <Text style={styles.statNumber}>{stats.cursosActivos}</Text>
            <Text style={styles.statLabel}>Cursos Activos</Text>
          </View>

          <View style={[styles.statCard, { borderLeftColor: '#10b981' }]}>
            <Text style={styles.statIcon}>🎓</Text>
            <Text style={styles.statNumber}>{stats.cursosCompletados}</Text>
            <Text style={styles.statLabel}>Completados</Text>
          </View>

          <View style={[styles.statCard, { borderLeftColor: '#8b5cf6' }]}>
            <Text style={styles.statIcon}>⭐</Text>
            <Text style={styles.statNumber}>{stats.promedio}</Text>
            <Text style={styles.statLabel}>Promedio</Text>
          </View>

          <View style={[styles.statCard, { borderLeftColor: '#f59e0b' }]}>
            <Text style={styles.statIcon}>📝</Text>
            <Text style={styles.statNumber}>{stats.tareasPendientes}</Text>
            <Text style={styles.statLabel}>Tareas</Text>
          </View>
        </View>

        {/* ACCESOS RÁPIDOS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>⚡ Accesos Rápidos</Text>
          </View>
          <View style={styles.quickAccessGrid}>
            {accesosRapidos.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.quickAccessCard}
                activeOpacity={0.7}
              >
                <View style={[styles.quickAccessIcon, { backgroundColor: item.color }]}>
                  <Text style={styles.quickAccessEmoji}>{item.icono}</Text>
                </View>
                <Text style={styles.quickAccessText}>{item.titulo}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* MIS CURSOS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📖 Mis Cursos</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          {misCursos.slice(0, 4).map((curso) => (
            <TouchableOpacity 
              key={curso.id} 
              style={styles.courseCard}
              activeOpacity={0.7}
            >
              <View style={[styles.courseColor, { backgroundColor: curso.color }]} />
              <View style={styles.courseContent}>
                <Text style={styles.courseName}>{curso.nombre}</Text>
                <Text style={styles.courseProfesor}> {curso.profesor}</Text>
              </View>
              <View style={styles.activeBadge}>
                <Text style={styles.activeBadgeText}>Activo</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* PRÓXIMAS CLASES */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🕐 Próximas Clases</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Ver horario</Text>
            </TouchableOpacity>
          </View>
          {proximasClases.map((clase, index) => (
            <View key={index} style={styles.scheduleCard}>
              <View style={styles.scheduleTime}>
                <Text style={styles.scheduleHour}>{clase.hora}</Text>
                <Text style={styles.scheduleDuration}>{clase.duracion}</Text>
              </View>
              <View style={styles.scheduleContent}>
                <Text style={styles.scheduleName}>{clase.nombre}</Text>
                <Text style={styles.scheduleLocation}>📍 {clase.aula}</Text>
              </View>
              <View style={[styles.scheduleIndicator, { backgroundColor: clase.color }]} />
            </View>
          ))}
        </View>

        {/* ACTIVIDAD RECIENTE */}
        <View style={[styles.section, { marginBottom: 30 }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🔔 Actividad Reciente</Text>
          </View>
          {actividades.map((actividad, index) => (
            <View key={index} style={styles.activityCard}>
              <View style={[styles.activityDot, { backgroundColor: actividad.color }]} />
              <View style={styles.activityContent}>
                <Text style={styles.activityMessage}>{actividad.mensaje}</Text>
                <Text style={styles.activityTime}>{actividad.tiempo}</Text>
              </View>
              <Text style={styles.activityIcon}>{actividad.icono}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  
  // HEADER
  header: {
    backgroundColor: '#0f172a',
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 15,
    alignSelf: 'flex-start',
  },
  dateIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  dateText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },

  // ESTADÍSTICAS
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    gap: 12,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    width: (width - 54) / 2,
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },

  // SECCIONES
  section: {
    paddingHorizontal: 15,
    marginTop: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  seeAllText: {
    fontSize: 14,
    color: '#0f172a',
    fontWeight: '600',
  },

  // ACCESOS RÁPIDOS
  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickAccessCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: (width - 54) / 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickAccessIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  quickAccessEmoji: {
    fontSize: 24,
  },
  quickAccessText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0f172a',
    textAlign: 'center',
  },

  // CURSOS
  courseCard: {
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
  courseColor: {
    width: 6,
    height: 50,
    borderRadius: 3,
    marginRight: 15,
  },
  courseContent: {
    flex: 1,
  },
  courseName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 5,
  },
  courseProfesor: {
    fontSize: 13,
    color: '#64748b',
  },
  activeBadge: {
    backgroundColor: '#d1fae5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  activeBadgeText: {
    fontSize: 11,
    color: '#065f46',
    fontWeight: '600',
  },

  // HORARIO
  scheduleCard: {
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
  scheduleTime: {
    alignItems: 'center',
    marginRight: 15,
    minWidth: 60,
  },
  scheduleHour: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  scheduleDuration: {
    fontSize: 11,
    color: '#fff',
    backgroundColor: '#64748b',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  scheduleContent: {
    flex: 1,
  },
  scheduleName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 5,
  },
  scheduleLocation: {
    fontSize: 12,
    color: '#64748b',
  },
  scheduleIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  // ACTIVIDAD
  activityCard: {
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
  activityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityMessage: {
    fontSize: 14,
    color: '#0f172a',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#94a3b8',
  },
  activityIcon: {
    fontSize: 20,
  },
});