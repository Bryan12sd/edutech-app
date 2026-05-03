export type User = {
  user_id: number;
  username: string;
  email: string;
};
export type Curso = {
  id: number;
  nombre: string;
  codigo: string;
  creditos: number;
  categoria: string;
  nivel: string;
  descripcion:string;
  duracion:string;
  cupo:number;
  color:string;
  icono:string;
  activo:boolean;
  fecha_creacion: string;
  fecha_actualizacion: string;
  profesor: string;
};

export type Calificacion = {
  id: number;
  nota: number;
  curso: number;
  estudiante: number;
  estudiante_nombre: string;
  curso_nombre: string;
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
  estudiante_nombre: string;
};