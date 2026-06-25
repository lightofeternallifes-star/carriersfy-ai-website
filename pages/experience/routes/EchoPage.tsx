import React from "react";
import { employees } from "../data";
import { IndividualEmployeePage } from "./EmployeeExperiencePages";

const echo = employees.find((employee) => employee.slug === "echo");

export default function EchoExperiencePage() {
  if (!echo) return null;
  return <IndividualEmployeePage employee={echo} />;
}
