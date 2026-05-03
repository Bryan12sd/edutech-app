import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV({
  id: `storageEduTech`,
  encryptionKey: 'edutech',
});

export const ID_OBJECT = {
  user: 'user',
  cursos: 'cursos',
  calificaciones: 'calificaciones',
  matriculas: 'matriculas',
  horarios: 'horarios',
};
