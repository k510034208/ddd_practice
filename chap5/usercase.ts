import UserRepository from './repository2'
import { User } from '../src/entity/User'
import { UserResponse } from './viemodel'

export interface IRegisterUsecase {
  saveUser( email: string, firstName: string, lastName: string, age: number ): Promise<UserResponse> | undefined
}

class RegisterUsecase implements IRegisterUsecase {

  constructor(
    private readonly userRepository: UserRepository
  ) { }

  async saveUser( email: string, firstName: string, lastName: string, age: number ) {

    const user = new User( firstName, lastName, email, age )

    try {

      await this.userRepository.insert( user )
      const userResponse = new UserResponse(
        user.firstName,
        user.lastName,
        user.email,
        user.age
      )

      return userResponse

    } catch ( err ) {

      console.error( err )
      return err.message
    }
  }

}
