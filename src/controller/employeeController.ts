import { Controller, Response, Route, Tags, Post, Body, Path, Delete, Get, Patch } from 'tsoa'
import {
  createEmployee,
  deleteEmployee,
  getEmployeeById,
  getEmployees, 
  updateEmployee
} from '../service/employeeService'
import Employee from '../db/entity/EmployeeEntity';
  
interface CreateEmployeeRequest {
  name: string;
  account: string;
  role: string;
}

interface UpdateEmployeeRequest {
  name?: string | undefined, 
  account?: string | undefined, 
  role?: string | undefined
}

@Tags('Employees')
@Route('employees')
export class EmployeeController extends Controller {
  /**
   * 新增員工
   * @param body 包含員工的基本資料
   */
  @Post('/')
  @Response(201, 'Created')
  public async createEmployee(
    @Body() body: CreateEmployeeRequest
  ) {
    console.log('Received request body:', body);
    const employeeId = await createEmployee({
      name: body.name, 
      account: body.account,
      role: body.role
    })
    return employeeId
  }

  /**
   * 更新指定 ID 的員工資料
   * @param id 員工的唯一識別碼
   * @param requestBody 要更新的欄位資料
   */
  @Patch('/{id}')
  @Response(404, 'Not Found')
  public async updateEmployee(
    @Path() id: number,
    @Body() body: UpdateEmployeeRequest
    ) {
      const employeeId = await updateEmployee({
        employeeId: id,
        name: body.name,
        account: body.account,
        role: body.role
    })
      return employeeId
    }

  /**
   * 刪除指定 ID 的員工
   * @param id 員工的唯一識別碼
   */
  @Delete('/{id}')
  @Response(404, 'Not Found')
  public async deleteEmployee(
    @Path() id: number
  ) {
    const employeeId = await deleteEmployee(id)
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
  @Get('/{id}')
  @Response(404, 'Not Found')
  public async getEmployeeById(
    @Path() id: number
  ): Promise<Employee> {
    const employee = await getEmployeeById(id)
    return employee
  }
}