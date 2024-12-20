import Employee from "../db/entity/EmployeeEntity";

export interface assignPerformanceReviewServiceDto {
  employeeId: number;
  createdByEmployeeId: number;
  fromEmployeeId: number;
}

export interface assignPerformanceReviewRepositoryDto {
  employee: Employee;
  createdByEmployee: Employee;
  fromEmployee: Employee;
}

export interface updatePerformanceReviewServiceDto {
  performanceReviewId: number;
  feedback_text: string
  status: string
}