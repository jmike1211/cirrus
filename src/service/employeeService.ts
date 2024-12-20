import dataSource from '../dataSource'
import { employeeRepository } from '../db/repository/employeeRepository'
import { createEmployeeServiceDto, updateEmployeeServiceDto } from '../dto/employee.dto'

export const createEmployee = async (dto: createEmployeeServiceDto) => {
  console.log(`createEmployee service ${dto}`)

  const {name, account, role} = dto
  const {id} = await employeeRepository.createEmployee({
    name,
    account,
    role
  })
  return id
}

export const updateEmployee = async (dto: updateEmployeeServiceDto) => {
  console.log(`updateEmployee service ${dto}`)

  const {employeeId, name, account, role} = dto
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