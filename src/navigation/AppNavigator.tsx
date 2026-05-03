import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Alert, View, Text, TouchableOpacity } from 'react-native';
import { ID_OBJECT, storage } from '../db/storage';

import LoginScreen from '../screens/loginScreen';
import RegisterScreen from '../screens/registerScreen';
import HomeScreen from '../screens/homeScreen';
import CursosScreen from '../screens/cursosScreen';
import MatriculaScreen from '../screens/matriculaScreen';
import CalificacionesScreen from '../screens/calificacionesScreen';
import PerfilScreen from '../screens/perfilScreen';
import HorariosScreen from '../screens/horarioScreen';
import TopBar from '../components/topbar';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import CustomDrawer from '../components/CustomDrawer';
export type RootStackParamList = {
  AuthLoading: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

function HomeDrawer({ navigation }: any) {
  const logout = () => {
    Alert.alert('Cerrar sesión', '¿Seguro que quieres salir?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Salir',
        onPress: () => {
          storage.remove(ID_OBJECT.user); // borra sesión

          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        },
      },
    ]);
  };

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        header: () => <TopBar />,
        drawerStyle: {
          backgroundColor: '#0f172a',
          width: 280,
        },
      }}
    >
      <Drawer.Screen name="HomeMain" component={HomeScreen} />
      <Drawer.Screen name="Cursos" component={CursosScreen} />
      <Drawer.Screen name="Matricula" component={MatriculaScreen} />
      <Drawer.Screen name="Calificaciones" component={CalificacionesScreen} />
      <Drawer.Screen name="Perfil" component={PerfilScreen} />
      <Drawer.Screen name="Horarios" component={HorariosScreen} />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthLoading">
        <Stack.Screen
          name="AuthLoading"
          component={AuthLoadingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeDrawer}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
