
import type { Comment } from "./comment.interface";
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
   comments: Comment[];
   files: File[]
}


export interface File {
   id: number;
   url: string;
   created_at: string;
   user: User;
}