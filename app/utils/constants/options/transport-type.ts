import type { OptionItem } from "~/types";

export const transportTypeOptions: OptionItem[] = [
  "Mobil",
  "Motor",
  "Truk",
  "Bus",
  "Becak",
  "Lainnya",
].map((val) => {
  return {
    value: val,
    label: val,
  };
});
