import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import {Body, JsonController, Post} from "routing-controllers";
import {RegisterUsecase} from "../usecase/usercase";
import {UserCreateRequest, UserCreateResponse} from "../viewmodels/viewmodel";

@JsonController('/api/user')
export class UserController {
    constructor (
        private readonly registerUsecase: RegisterUsecase
    ) { }

    @Post('/')
    async registerUser (@Body({required: true}) userCreateRequest: UserCreateRequest): Promise<{
        status: 'success' | 'error',
        result: UserCreateResponse
    }> {
        const user = await this.registerUsecase.saveUser(
            userCreateRequest.firstName,
            userCreateRequest.lastName,
            userCreateRequest.email,
            userCreateRequest.age
        )

        return {

        }
    }
}