import React from "react";
import { employees } from "../data";
import { IndividualEmployeePage } from "./EmployeeExperiencePages";

const nova = employees.find((employee) => employee.slug === "nova");

export default function NovaExperiencePage() {
  if (!nova) return null;
  return <IndividualEmployeePage employee={nova} />;
}
