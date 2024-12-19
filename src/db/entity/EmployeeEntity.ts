import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'
import Base from './BaseEntity'

@Entity('employees')
export default class Employee extends Base {
  @Column({ type: 'varchar', length: 50 })
  name!: string
  
  @Column({ type: 'varchar', length: 50, unique: true })
  account!: string

  @Column({ type: 'varchar', length: 50 })
  role!: string
}
