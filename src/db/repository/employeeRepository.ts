import Employee from '../entity/EmployeeEntity'
import dataSource from '../../dataSource'
import { createEmployeeRepositoryDto } from '../../dto/employee.dto'

export const employeeRepository = dataSource.getRepository(Employee).extend({
  async createEmployee (dto: createEmployeeRepositoryDto) {
    const { name, account, role } = dto
    const newEmployee = this.create({
      name,
      account,
      role,
    })
    return await this.save(newEmployee)
  },

  async updateEmployee (employee: Employee) {
    return await this.save(employee)
  },

  async deleteEmployee (employee: Employee) {
    return await this.softRemove(employee)
  },

  async getEmployees () {
    const employees = await this.find({})
  
    return employees
  },

  async getEmployeeById (id: number) {
    const employees = await this.findOne({
      where: { id },
    })
    
    if (!employees) {
      throw new Error(`Employee with id ${id} not found`)
    }
    return employees
  },
})