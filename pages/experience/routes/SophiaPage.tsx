import React from "react";
import { employees } from "../data";
import { IndividualEmployeePage } from "./EmployeeExperiencePages";

const sophia = employees.find((employee) => employee.slug === "sophia");

export default function SophiaExperiencePage() {
  if (!sophia) return null;
  return <IndividualEmployeePage employee={sophia} />;
}
