import Role from '../entity/RoleEntity'
import dataSource from '../../dataSource'

export const roleRepository = dataSource.getRepository(Role).extend({
  async createRole (name: string) {
    const newRole = this.create({ name })
  },
  
  async getRoles () {
    const roles = await this.find({ relations: ['employee'] })
    return roles
  },
  
  async getRoleById (id: number) {
    const role = await this.findOne({
      where: { id }, 
      relations: ['employee'],
    })
      
    if (!role) {
      throw new Error(`Role with id ${id} not found`)
    }
    return role
  }
})