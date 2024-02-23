import { User } from "../../types";
export interface AuthState {
  user: User;
  token: string | null;
  loading: boolean;
  error: Error | null;
}
