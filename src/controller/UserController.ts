
import { Body, JsonController, Post } from "routing-controllers";
import { RegisterUsecase } from "../usecase/usercase";
import { UserCreateRequest, UserCreateApiResponse } from "../viewmodels/viewmodel";
import { IUserRepository } from '../repositories/userRepository'

@JsonController( '/api/user' )
export class UserController {
    constructor(
        private readonly registerUsecase: RegisterUsecase
    ) { }

    @Post( '/' )
    async registerUser( @Body( { required: true } ) userCreateRequest: UserCreateRequest ): Promise<UserCreateApiResponse> {

        try {

            const user = await this.registerUsecase.saveUser(
                userCreateRequest.firstName,
                userCreateRequest.lastName,
                userCreateRequest.email,
                userCreateRequest.age
            )

            return new UserCreateApiResponse( 'success', user )

        } catch ( err ) {

            console.error( err )
            return new UserCreateApiResponse( 'error', {} )
        }

    }
}