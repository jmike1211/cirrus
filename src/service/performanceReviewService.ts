import dataSource from '../dataSource'
import { performanceReviewRepository } from '../db/repository/performanceReviewRepository'
import { employeeRepository } from '../db/repository/employeeRepository'
import { assignPerformanceReviewServiceDto, updatePerformanceReviewServiceDto } from '../dto/performanceReview.dto'

export const assignPerformanceReview = async (dto: assignPerformanceReviewServiceDto) => {
  console.log(`assignPerformanceReview service ${dto}`)

  const { employeeId, createdByEmployeeId, fromEmployeeId } = dto
  await dataSource.transaction(async manager => {
    const employee = await manager.withRepository(employeeRepository).getEmployeeById(employeeId)
    const createdByEmployee = await manager.withRepository(employeeRepository).getEmployeeById(createdByEmployeeId)
    const fromEmployee = await manager.withRepository(employeeRepository).getEmployeeById(fromEmployeeId)
    await manager.withRepository(performanceReviewRepository).assignPerformanceReview({
      employee,
      createdByEmployee,
      fromEmployee
    })
  })
}

export const updatePerformanceReview = async (dto: updatePerformanceReviewServiceDto) => {
  console.log(`updatePerformanceReview service ${dto}`)

  const { performanceReviewId, feedback_text, status } = dto
  await dataSource.transaction(async manager => {
    const performanceReview = await manager.withRepository(performanceReviewRepository).getPerformanceReviewById(performanceReviewId)
    performanceReview.feedback_text = feedback_text || performanceReview.feedback_text
    performanceReview.status = status || performanceReview.status
    await manager.withRepository(performanceReviewRepository).updatePerformanceReview(performanceReview)
  })
}
