
export const tasksStatus = [
   { id: 1, title: 'Pendiente'},
   { id: 2, title: 'En progreso'},
   { id: 3, title: 'Bloqueado'},
   { id: 4, title: 'Completado'},
]

export const getStatusName = (id: number) => {
   const status = tasksStatus.find(t => t.id === id);
   return status ? status.title : 'Pendiente';
}