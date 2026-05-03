import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f7fb',
  },

  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  text: {
    fontSize: 16,
  },

  button: {
    marginTop: 10,
    backgroundColor: '#2563eb',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});