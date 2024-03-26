export const resetPasswordSchema = {
	password(value: string) {
		if (!value) return "La contraseña es obligatorio";
		return true;
	},
};
