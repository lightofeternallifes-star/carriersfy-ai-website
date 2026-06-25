import { EmployeePage } from '../../components/employees/EmployeePage'
import { echo } from '../../data/employees'

export function uechoPage() {
  return <EmployeePage employee={echo} />
}
