import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'
import Base from './BaseEntity'
import PerformanceReview from './PerformanceReviewEntity'
import Employee from './EmployeeEntity'

@Entity('feedbacks')
export default class Feedback extends Base {
    
  @Column({ type: 'text' })
  feedback_text!: string

  @Column({ type: 'varchar', length: 20, default: 'pending' })
  status!: string
  
  @ManyToOne(() => PerformanceReview, (performanceReview: PerformanceReview) => performanceReview.id)
  @JoinColumn({ name: 'performance_review_id' })
  review!: PerformanceReview

  @ManyToOne(() => Employee, (employee: Employee) => employee.id)
  @JoinColumn({ name: 'from_employee_id' })
  fromEmployee!: Employee
}
