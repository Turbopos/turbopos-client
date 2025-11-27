import type { Home } from "lucide-vue-next";

export interface StepItem {
  step: number;
  title: string;
  icon?: typeof Home;
  description?: string;
}
