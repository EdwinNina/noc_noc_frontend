import type { User } from "./users-response.interface";

export interface LoginResponse {
   user:    User;
   token:   string;
}