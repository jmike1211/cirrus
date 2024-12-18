import { BaseEntity, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, } from 'typeorm'

export default class Base extends BaseEntity {
  /**
   * 流水號 id (自動產生)
   */
  @PrimaryGeneratedColumn('increment', { type: 'integer', comment: '流水號 id' })
  id!: number

  /**
   * 建立日期
   */
  @CreateDateColumn({ precision: 3, comment: '建立日期' })
  created_at!: Date

  /**
   * 更新日期
   */
  @UpdateDateColumn({ precision: 3, comment: '更新日期' })
  updated_at!: Date

  /**
   * 刪除日期
   */
  @DeleteDateColumn({ precision: 3, comment: '刪除日期' })
  deleted_at!: Date | null

  public toResponseData (): Pick<this, Exclude<keyof this, 'updated_at' | 'deleted_at'>> {
    const responseData: any = Object.assign({}, this)
    delete responseData.deleted_at
    delete responseData.updated_at
    return responseData
  }
}