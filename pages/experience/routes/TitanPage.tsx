import React from "react";
import { employees } from "../data";
import { IndividualEmployeePage } from "./EmployeeExperiencePages";

const titan = employees.find((employee) => employee.slug === "titan");

export default function TitanExperiencePage() {
  if (!titan) return null;
  return <IndividualEmployeePage employee={titan} />;
}
