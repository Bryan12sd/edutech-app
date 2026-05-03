import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';

export default function TopBar() {
  const navigation = useNavigation();

  return (
    <View style={styles.bar}>
      
   
      <View style={styles.left}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Text style={styles.menu}>☰</Text>
        </TouchableOpacity>

        <Text style={styles.brand}>🎓 EduTech</Text>
      </View>

    
     {/*  <View style={styles.right}>
        <Text style={styles.user}></Text>
      </View> */}

    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 60,
    backgroundColor: '#0f172a',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  menu: {
    color: 'white',
    fontSize: 22,
  },

  brand: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  right: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 8,
  },

  user: {
    color: '#cbd5e1',
    fontSize: 12,
  },
});