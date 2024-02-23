import { User } from "types";

export interface Auth {
  user: User;
  token: string | null;
}
