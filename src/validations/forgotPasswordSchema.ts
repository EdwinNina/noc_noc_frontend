export const forgotPasswordSchema = {
	email(value: string) {
		if (!value) return "El correo electrónico es obligatorio";

		const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
		if (!regex.test(value)) {
			return "Ingrese un correo electrónico válido";
		}
		return true;
	}
};
