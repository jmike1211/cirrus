import { Controller, Response, Route, Tags, Post, Body, Request, Security, Path, Delete, Get, Query, Patch } from 'tsoa'
import {
  createEmployee,
  getEmployeeById,
  getEmployees 
} from '../service/employeeService'
import Employee from '../db/entity/EmployeeEntity';
  
interface CreateEmployeeRequest {
  name: string;
  account: string;
  roleId: number;
}

interface UpdateEmployeeRequest {
  first_name?: string;
  last_name?: string;
  email?: string;
  department?: string;
}

@Tags('Employees')
@Route('employees')
export class EmployeeController extends Controller {
  /**
   * 新增員工
   * @param requestBody 包含員工的基本資料
   */
  @Post('/')
  @Response(201, 'Created')
  public async createEmployee(
    @Body() requestBody: CreateEmployeeRequest
  ) {
    const employeeId = await createEmployee(
      requestBody.name, 
      requestBody.account,
      requestBody.roleId
    )
    return employeeId
  }

    
  /**
   * @summary 取得所有員工
   */
  @Get('/')
  @Response(404, 'Not Found')
  public async getEmployees (
  ): Promise<Employee[]> {
    const employees = await getEmployees()
    return employees
  }

  /**
   * 根據 ID 取得單一員工資料
   * @param id 員工的唯一識別碼
   */
  @Get('{id}')
  @Response(404, 'Not Found')
  public async getEmployeeById(
    @Path() id: number
  ): Promise<Employee> {
    const employee = await getEmployeeById(id)
    return employee
  }
}