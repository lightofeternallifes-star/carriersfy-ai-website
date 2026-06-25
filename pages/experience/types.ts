export type Accent = "blue" | "red";

export type EmployeeKind = "employee" | "ceo";

export interface EmployeeProfile {
  slug: string;
  name: string;
  role: string;
  kind: EmployeeKind;
  status: "Online" | "Coordinating";
  avatar: string;
  accent: Accent;
  shortDescription: string;
  hero: string;
  origin: string;
  nameMeaning: string;
  mission: string;
  responsibilities: string[];
  benefits: string[];
  industries: string[];
  technology: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export interface ConfiguratorStep {
  id: string;
  title: string;
  type: "single" | "multi" | "text" | "placeholder";
  options?: string[];
  placeholder?: string;
}

export interface DashboardMetric {
  label: string;
  value: string;
  detail: string;
  trend?: string;
}
