import { EmployeePage } from '../../components/employees/EmployeePage'
import { echo } from '../../data/employees'

export default function EchoPage() {
  return <EmployeePage employee={echo} />
}
