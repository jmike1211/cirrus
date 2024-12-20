import { Controller, Response, Route, Tags, Post, Body, Request, Security, Path, Delete, Get, Query, Patch } from 'tsoa'
import PerformanceReview from '../db/entity/PerformanceReviewEntity'
import { 
  assignPerformanceReview,
  getPerformanceReviews, 
  updatePerformanceReview
} from '../service/performanceReviewService'

interface AssignPerformanceReview {
  employeeId: number;
  createdByEmployeeId: number;
  fromEmployeeId: number;
}

interface UpdatePerformanceReview {
  performanceReviewId: number;
  feedbackText: string;
  status: string;
}

@Tags('PerformanceReview')
@Route('performance_review')
export class PerformanceReviewsController extends Controller { 
  /**
   * @summary 取得所有回饋
   */
  @Get('/')
  @Response(404, 'Not Found')
  public async getPerformanceReviews (
  ): Promise<PerformanceReview[]> {
    const employees = await getPerformanceReviews()
    return employees
  }

  /**
   * @summary 指定回饋者與被回饋者
   */
  @Post('/')
  @Response(201, 'Created')
  public async assignPerformanceReview(
    @Body() body: AssignPerformanceReview
  ) {
    const employeeId = await assignPerformanceReview({
      employeeId: body.employeeId,
      createdByEmployeeId: body.createdByEmployeeId,
      fromEmployeeId: body.fromEmployeeId
    })
    return employeeId
  }

  /**
   * @summary 指定回饋者與被回饋者
   */
  @Post('/')
  @Response(201, 'Created')
  public async updatePerformanceReview(
    @Body() body: UpdatePerformanceReview
  ) {
    const employeeId = await updatePerformanceReview({
      performanceReviewId: body.performanceReviewId,
      feedbackText: body.feedbackText,
      status: body.status
    })
    return employeeId
  }
    
}