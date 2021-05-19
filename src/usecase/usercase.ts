import { User } from '../entity/User'
import { UserCreateResponse } from '../viewmodels/viewmodel'
import IUserRepository from '../repositories/userRepository'
import UserRepository from '../repositories/userRepository'
import { Service, Token } from 'typedi'
import { InjectRepository } from "typeorm-typedi-extensions";

export interface IRegisterUsecase {
  saveUser(
    firstName: string,
    lastName: string,
    email: string,
    age: number
  ): Promise<UserCreateResponse>
}

export const RegisterUsecaseToken = new Token<RegisterUsecase>()

@Service( RegisterUsecaseToken )
export class RegisterUsecase implements IRegisterUsecase {

  constructor(
    @InjectRepository()
    private readonly userRepository: IUserRepository
  ) { }

  async saveUser( firstName: string, lastName: string, email: string, age: number ) {

    const user = new User( firstName, lastName, email, age )

    console.log( user )

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