import React from "react";
import { employees } from "../data";
import { IndividualEmployeePage } from "./EmployeeExperiencePages";

const atlas = employees.find((employee) => employee.slug === "atlas");

export default function AtlasExperiencePage() {
  if (!atlas) return null;
  return <IndividualEmployeePage employee={atlas} />;
}
