export interface UsersResponse {
	users: User[];
	roles: Role[];
}

export interface Role {
	id: number;
	name: string;
	description: string;
}

export interface User {
	id: number;
	name: string;
	email: string;
	role: Role;
}
