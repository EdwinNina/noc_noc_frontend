import type { User } from "./users-response.interface"

export interface Comment {
   content: string
   created_at: string
   user: User
}