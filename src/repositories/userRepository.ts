import { Repository, EntityRepository, InsertResult } from 'typeorm'
import { User } from '../entity/User'

export default interface IUserRepository {
  findByEmail( email: string ): Promise<User> | undefined
  countByEmail( email: string ): Promise<number>
  insert( user: User ): Promise<InsertResult>
}

// カスタムリポジトリ
@EntityRepository( User )
export default class UserRepository extends Repository<User> implements IUserRepository {

  async findByEmail( email: string ) {
    return await super.findOne( { email } )
  }
  async countByEmail( email: string ) {
    return await super.count( { email } )
  }

  // データが存在する場合は登録。すでに存在する場合はundefinedを返却
  async insert( user: User ) {
    if ( await !super.findOne( user ) ) {
      return await super.insert( user )
    } else {
      throw Error( 'すでに登録されています' )
    }
  }
}