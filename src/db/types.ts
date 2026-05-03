export type User = {
  user_id: number;
  username: string;
  email: string;
};
export type Curso = {
  id: number;
  nombre: string;
};

export type Calificacion = {
  id: number;
  nota: number;
  curso: number;
  estudiante: number;
};

export type Matricula = {
  id: number;
  estudiante: number;
  curso: number;
};

export type Estudiante = {
  id: number;
  nombre: string;
  email: string;
  user: number;
};
export type Horario = {
  id: number;
  dia: string;
  hora: string;
  curso: number;
  estudiante: number;
  curso_nombre: string;
};