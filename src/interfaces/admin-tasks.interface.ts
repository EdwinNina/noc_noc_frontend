
import type { User } from "./users-response.interface";

export interface AdminTasksResponse {
   tasks: Task[];
   users: User[];
}

export interface Task {
   id:          number;
   title:       string;
   description: string;
   status:      number;
   user:        User;
}