import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { storage, ID_OBJECT } from '../db/storage';
import { useUser } from '../hooks/useUser';

export type DrawerParamList = {
  HomeMain: undefined;
  Cursos: undefined;
  Matricula: undefined;
  Calificaciones: undefined;
  Perfil: undefined;
  Horarios: undefined;
};

export default function CustomDrawer(props: DrawerContentComponentProps) {
  const { navigation } = props;
  const user = useUser();

  const logout = () => {
    storage.remove(ID_OBJECT.user);

    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' as never }],
    });
  };

  const Item = ({
    label,
    screen,
  }: {
    label: string;
    screen: keyof DrawerParamList;
  }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        navigation.navigate(screen);
        navigation.dispatch(DrawerActions.closeDrawer());
      }}
    >
      <Text style={styles.itemText}>{label}</Text>
    </TouchableOpacity>
  );

  const getInitial = () => {
    if (!user?.username) return 'U';
    return user.username.charAt(0).toUpperCase();
  };

  return (
    <DrawerContentScrollView {...props} style={styles.drawer}>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.image}
        />
        <Text style={styles.logo}>EduTech</Text>
      </View>

      <View style={styles.profile}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getInitial()}</Text>
        </View>

        <View>
          <Text style={styles.name}>{user?.username ?? 'Usuario'}</Text>
          <Text style={styles.username}>{user?.email ?? ''}</Text>
        </View>
      </View>

      <Text style={styles.section}>Principal</Text>
      <Item label="Home" screen="HomeMain" />

      <Text style={styles.section}>Académico</Text>
      <Item label="Cursos" screen="Cursos" />
      <Item label="Calificaciones" screen="Calificaciones" />
      <Item label="Horario" screen="Horarios" />
      <Item label="Matrícula" screen="Matricula" />

      <Text style={styles.section}>Cuenta</Text>
      <Item label="Perfil" screen="Perfil" />

      <TouchableOpacity style={styles.logout} onPress={logout}>
        <Text style={styles.logoutText}>Salir</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: '#0f172a',
  },

  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },

  logo: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  profile: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    margin: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 10,
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  avatarText: {
    color: 'white',
    fontWeight: 'bold',
  },

  name: {
    color: 'white',
    fontWeight: 'bold',
  },

  username: {
    color: '#94a3b8',
    fontSize: 12,
  },

  section: {
    color: '#64748b',
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },

  item: {
    padding: 14,
    paddingLeft: 20,
  },

  itemText: {
    color: '#cbd5e1',
  },

  logout: {
    marginTop: 20,
    padding: 15,
    paddingLeft: 20,
  },

  logoutText: {
    color: '#ef4444',
    fontWeight: 'bold',
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
