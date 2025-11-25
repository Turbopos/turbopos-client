import type { OptionItem } from "~/types";
import { Role } from "../enum";

export const userRoleOptions: OptionItem[] = [
  {
    value: Role.Admin,
    label: "Admin",
  },
  {
    value: Role.Mekanik,
    label: "Mekanik",
  },
  {
    value: Role.Operator,
    label: "Operator",
  },
];
