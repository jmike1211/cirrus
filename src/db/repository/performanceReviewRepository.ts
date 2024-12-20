
import PerformanceReview from '../entity/PerformanceReviewEntity'
import dataSource from '../../dataSource'
import { assignPerformanceReviewRepositoryDto } from '../../dto/performanceReview.dto'

export const performanceReviewRepository = dataSource.getRepository(PerformanceReview).extend({
  async assignPerformanceReview (dto: assignPerformanceReviewRepositoryDto) {
    const {employee, createdByEmployee, fromEmployee} = dto
    const newPerformanceReview = this.create({
      employee,
      createdByEmployee: createdByEmployee,
      fromEmployee,
    })
    return await this.save(newPerformanceReview)
  },

  async updatePerformanceReview (updatePerformanceReview: PerformanceReview) {
    return await this.save(updatePerformanceReview)
  },

  async getPerformanceReviews () {
    const performanceReviews = await this.find({})
    return performanceReviews
  },

  async getPerformanceReviewById (id: number) {
    const performanceReview = await this.findOne({
      where: { id },
    })
    if (!performanceReview) {
      throw new Error(`PerformanceReview with id ${id} not found`)
    }
    return performanceReview
  }

})