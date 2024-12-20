import { Entity, ManyToOne, JoinColumn, Column } from 'typeorm'
import Base from './BaseEntity'
import Employee from './EmployeeEntity'

@Entity('performance_reviews')
export default class PerformanceReview extends Base {
  @Column({ type: 'text' })
  feedback_text!: string

  @Column({ type: 'varchar', length: 20, default: 'pending' })
  status!: string
  
  @ManyToOne(() => Employee, (employee: Employee) => employee.id)
  @JoinColumn({ name: 'employee_id' })
  employee!: Employee

  @ManyToOne(() => Employee, (employee: Employee) => employee.id)
  @JoinColumn({ name: 'created_by' })
  createdByEmployee!: Employee

  @ManyToOne(() => Employee, (employee: Employee) => employee.id)
  @JoinColumn({ name: 'from_employee_id' })
  fromEmployee!: Employee
}
