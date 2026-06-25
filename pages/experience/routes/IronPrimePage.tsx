import React from "react";
import { employees } from "../data";
import { IndividualEmployeePage } from "./EmployeeExperiencePages";

const ironPrime = employees.find((employee) => employee.slug === "iron-prime");

export default function IronPrimeExperiencePage() {
  if (!ironPrime) return null;
  return <IndividualEmployeePage employee={ironPrime} />;
}
