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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../entity/User");
const viewmodel_1 = require("../viewmodels/viewmodel");
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
exports.RegisterUsecaseToken = new typedi_1.Token();
let RegisterUsecase = class RegisterUsecase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async saveUser(firstName, lastName, email, age) {
        const user = new User_1.User(firstName, lastName, email, age);
        await this.userRepository.insert(user);
        const userResponse = new viewmodel_1.UserCreateResponse(user.firstName, user.lastName, user.email, user.age);
        return userResponse;
    }
};
RegisterUsecase = __decorate([
    typedi_1.Service(exports.RegisterUsecaseToken),
    __param(0, typeorm_typedi_extensions_1.InjectRepository()),
    __metadata("design:paramtypes", [userRepository_1.default])
], RegisterUsecase);
exports.RegisterUsecase = RegisterUsecase;
//# sourceMappingURL=usercase.js.map