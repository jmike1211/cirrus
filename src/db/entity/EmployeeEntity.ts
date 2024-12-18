import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'
import Base from './BaseEntity'
import Role from './RoleEntity'

@Entity('employees')
export default class Employee extends Base {
  @Column({ type: 'varchar', length: 50 })
  name!: string
  
  @Column({ type: 'varchar', length: 50 })
  account!: string

  @ManyToOne(() => Role, (role: Role) => role.employees)
  @JoinColumn({ name: 'role_id' })
  role!: Role
}
