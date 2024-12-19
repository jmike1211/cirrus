import dataSource from '../dataSource'
import { employeeRepository } from '../db/repository/employeeRepository'

export const createEmployee = async (name: string, account: string, role: string) => {
  console.log(`createEmployee service`)

  const {id} = await employeeRepository.createEmployee(
    name,
    account,
    role
  )
  return id
}

export const updateEmployee = async (employeeId: number, name?: string, account?: string, role?: string) => {
  console.log(`updateEmployee service ${employeeId}`)

  await dataSource.transaction(async manager => {
    const employee = await manager.withRepository(employeeRepository).getEmployeeById(employeeId)
    employee.name = name || employee.name
    employee.account = account || employee.account
    employee.role = role || employee.role
    await manager.withRepository(employeeRepository).updateEmployee( employee )
  })
  return employeeId
}

export const deleteEmployee = async (employeeId: number) => {
  console.log(`deleteEmployee service ${employeeId}`)

  await dataSource.transaction(async manager => {
    const employee = await manager.withRepository(employeeRepository).getEmployeeById(employeeId)
    await manager.withRepository(employeeRepository).deleteEmployee( employee )
  })
  return employeeId
}

export const getEmployees = async () => {
  console.log(`getEmployees service`)
  return await employeeRepository.getEmployees()
}

export const getEmployeeById = async (employeeId: number) => {
  console.log(`getEmployeeById service ${employeeId}`)
  return await employeeRepository.getEmployeeById(employeeId)
}