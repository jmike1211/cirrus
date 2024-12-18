import { Entity, ManyToOne, JoinColumn } from 'typeorm'
import Base from './BaseEntity'
import Employee from './EmployeeEntity'

@Entity('performance_reviews')
export default class PerformanceReview extends Base {
  @ManyToOne(() => Employee, (employee: Employee) => employee.id)
  @JoinColumn({ name: 'employee_id' })
  employee!: Employee

  @ManyToOne(() => Employee, (employee: Employee) => employee.id)
  @JoinColumn({ name: 'created_by' })
  createdBy!: Employee
}
