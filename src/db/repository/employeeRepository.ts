import Employee from '../entity/EmployeeEntity'
import dataSource from '../../dataSource'
import Role from 'db/entity/RoleEntity'

export const employeeRepository = dataSource.getRepository(Employee).extend({
  async createEmployee (name:string, account:string, role: Role ) {
    const newEmployee = this.create({
      name,
      account,
      role,
    })
    return await this.save(newEmployee)
  },

  async getEmployees () {
    const employees = await this.find({
      relations: ['role'],
    })
  
    return employees
  },

  async getEmployeeById (id: number) {
    const employees = await this.findOne({
      where: { id },
      relations: ['role'],
    })
    
    if (!employees) {
      throw new Error(`Employee with id ${id} not found`)
    }
    return employees
  },
})