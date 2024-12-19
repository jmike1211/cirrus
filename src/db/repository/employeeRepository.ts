import Employee from '../entity/EmployeeEntity'
import dataSource from '../../dataSource'

export const employeeRepository = dataSource.getRepository(Employee).extend({
  async createEmployee (name:string, account:string, role:string) {
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