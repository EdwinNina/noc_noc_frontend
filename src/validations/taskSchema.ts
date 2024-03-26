export const taskSchema = {
	title(value: string) {
		if (!value) return "El titulo es obligatorio";
		return true;
	},
	description(value: string) {
		if (!value) return "La descripcion es obligatoria";
		return true;
	},
	user_id(value: string) {
		if (!value) return "Debe seleccionar un empleado";
		return true;
	},
};

export const taskEditSchema = {
	title(value: string) {
		if (!value) return "El titulo es obligatorio";
		return true;
	},
	description(value: string) {
		if (!value) return "La descripcion es obligatoria";
		return true;
	},
	user_id(value: string) {
		if (!value) return "Debe seleccionar un empleado";
		return true;
	},
	status(value: string) {
		if (!value) return "Debe seleccionar un estado";
		return true;
	},
};
