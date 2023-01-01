import type { Status } from "@prisma/client";
export type Size = "xs" | "sm" | "md" | "lg" | "xl";

export interface IUser {
  id: string;
  name: string | null;
  username: string | null;
  image: string | null;
  status: Status;
}
