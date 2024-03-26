
export interface LoginResponse {
   user:    User;
   token:   string;
   message: string;
}

export interface User {
   name:  string;
   email: string;
   id:    number;
   role:  Role;
}

export interface Role {
   id:          number;
   name:        string;
   description: string;
   created_at:  string;
   updated_at:  string;
}
