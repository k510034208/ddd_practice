
import { Body, JsonController, Post } from "routing-controllers";
import { IRegisterUsecase, RegisterUsecase, RegisterUsecaseToken } from "../usecase/usercase";
import { UserCreateRequest, UserCreateApiResponse } from "../viewmodels/viewmodel";
import { Inject, Service } from "typedi";

@Service()
@JsonController( '/api/user' )
export class UserController {

    constructor(
        @Inject( RegisterUsecaseToken )
        private readonly registerUsecase: IRegisterUsecase,

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