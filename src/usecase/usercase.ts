import UserRepository from '../repositories/userRepository'
import {User} from '../entity/User'
import {UserCreateResponse} from '../viewmodels/viewmodel'

export interface IRegisterUsecase {
  saveUser (
    firstName: string,
    lastName: string,
    email: string,
    age: number
  ): Promise<UserCreateResponse> | undefined
}

export class RegisterUsecase implements IRegisterUsecase {

  constructor (
    private readonly userRepository: UserRepository
  ) { }

  async saveUser (firstName: string, lastName: string, email: string, age: number) {

    const user = new User(firstName, lastName, email, age)

    try {

      await this.userRepository.insert(user)
      const userResponse = new UserCreateResponse(
        user.firstName,
        user.lastName,
        user.email,
        user.age
      )

      return userResponse

    } catch (err) {

      console.error(err)
      return err.message
    }
  }

}
