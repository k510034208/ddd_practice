import { User } from '../entity/User'
import { UserCreateResponse } from '../viewmodels/viewmodel'
import IUserRepository from '../repositories/userRepository'
import UserRepository from '../repositories/userRepository'

export interface IRegisterUsecase {
  saveUser(
    firstName: string,
    lastName: string,
    email: string,
    age: number
  ): Promise<UserCreateResponse>
}

export class RegisterUsecase implements IRegisterUsecase {

  userRepository: IUserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async saveUser( firstName: string, lastName: string, email: string, age: number ) {

    const user = new User( firstName, lastName, email, age )

    await this.userRepository.insert( user )
    const userResponse = new UserCreateResponse(
      user.firstName,
      user.lastName,
      user.email,
      user.age
    )

    return userResponse
  }
}
