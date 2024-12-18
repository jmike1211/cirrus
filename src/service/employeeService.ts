import { employeeRepository } from '../db/repository/employeeRepository'
import { roleRepository } from '../db/repository/roleRepository'

export const createEmployee = async (name: string, account: string, roleId: number) => {
  console.log(`createEmployee service`)
  const role = await roleRepository.getRoleById(roleId)

  const {id} = await employeeRepository.createEmployee(
    name,
    account,
    role
  )
  return id
}

export const getEmployees = async () => {
  console.log(`getEmployees service`)
  return await employeeRepository.getEmployees()
}

export const getEmployeeById = async (id: number) => {
  console.log(`getEmployeeById service ${id}`)
  return await employeeRepository.getEmployeeById(id)
}