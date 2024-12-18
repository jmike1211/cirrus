import { Entity, Column, OneToMany } from 'typeorm'
import Base from './BaseEntity'
import Employee from './EmployeeEntity'

@Entity('roles')
export default class Role extends Base {
  @Column({ type: 'varchar', length: 50, unique: true })
  name!: string

  @OneToMany(() => Employee, (employee: Employee) => employee.role)
  employees!: Employee[]
}
