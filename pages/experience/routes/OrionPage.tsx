import React from "react";
import { employees } from "../data";
import { IndividualEmployeePage } from "./EmployeeExperiencePages";

const orion = employees.find((employee) => employee.slug === "orion");

export default function OrionExperiencePage() {
  if (!orion) return null;
  return <IndividualEmployeePage employee={orion} />;
}
