import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { storage, ID_OBJECT } from '../db/storage';

export default function AuthLoadingScreen({ navigation }: any) {
  useEffect(() => {
    const checkSession = () => {
      const user = storage.getString(ID_OBJECT.user);

      if (user) {
        navigation.replace('Home');
      } else {
        navigation.replace('Login');
      }
    };

    checkSession();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}