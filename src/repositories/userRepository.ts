import {Repository, EntityRepository, InsertResult} from 'typeorm'
import {User} from '../entity/User'

export interface IUserRepository {
  findByEmail (email: string): Promise<User> | undefined
  countByEmail (email: string): Promise<number>
  insert (user: User): Promise<InsertResult>
}

// カスタムリポジトリ
@EntityRepository(User)
export default class UserRepository extends Repository<User> implements IUserRepository {

  findByEmail (email: string) {
    return this.findOne({email})
  }
  countByEmail (email: string) {
    return this.count({email})
  }

  // データが存在する場合は登録。すでに存在する場合はundefinedを返却
  insert (user: User) {
    if (!this.findOne(user)) {
      return super.insert(user)
    } else {
      throw Error('すでに登録されています')
    }
  }
}