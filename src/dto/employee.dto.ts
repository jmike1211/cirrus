export interface createEmployeeServiceDto {
  name: string;
  account: string;
  role: string;
}

export interface updateEmployeeServiceDto {
  employeeId: number;
  name?: string | undefined;
  account?: string | undefined;
  role?: string | undefined;
}

export interface createEmployeeRepositoryDto {
    name: string;
    account: string;
    role: string;
  }