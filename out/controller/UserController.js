"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const usercase_1 = require("../usecase/usercase");
const viewmodel_1 = require("../viewmodels/viewmodel");
const typedi_1 = require("typedi");
let UserController = class UserController {
    constructor(registerUsecase) {
        this.registerUsecase = registerUsecase;
    }
    async registerUser(userCreateRequest) {
        try {
            console.log(this.registerUsecase instanceof usercase_1.RegisterUsecase);
            const user = await this.registerUsecase.saveUser(userCreateRequest.firstName, userCreateRequest.lastName, userCreateRequest.email, userCreateRequest.age);
            return new viewmodel_1.UserCreateApiResponse('success', user);
        }
        catch (err) {
            console.error(err);
            return new viewmodel_1.UserCreateApiResponse('error', {});
        }
    }
};
__decorate([
    routing_controllers_1.Post('/'),
    __param(0, routing_controllers_1.Body({ required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [viewmodel_1.UserCreateRequest]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "registerUser", null);
UserController = __decorate([
    typedi_1.Service(),
    routing_controllers_1.JsonController('/api/user'),
    __param(0, typedi_1.Inject(usercase_1.RegisterUsecaseToken)),
    __metadata("design:paramtypes", [Object])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map