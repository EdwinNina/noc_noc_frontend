
export const PENDING = 1
export const PROGRESS = 2
export const BLOCKED = 3
export const COMPLETED = 4

export const tasksStatus = [
   { id: PENDING, title: 'Pendiente'},
   { id: PROGRESS, title: 'En progreso'},
   { id: BLOCKED, title: 'Bloqueado'},
   { id: COMPLETED, title: 'Completado'},
]

export const getStatusName = (id: number) => {
   const status = tasksStatus.find(t => t.id === id);
   return status ? status.title : 'Pendiente';
}