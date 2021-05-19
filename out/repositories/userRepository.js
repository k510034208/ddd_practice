"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/User");
// カスタムリポジトリ
let UserRepository = class UserRepository extends typeorm_1.Repository {
    async findByEmail(email) {
        return await super.findOne({ email });
    }
    async countByEmail(email) {
        return await super.count({ email });
    }
    // データが存在する場合は登録。すでに存在する場合はundefinedを返却
    async insert(user) {
        if (await !super.findOne(user)) {
            return await super.insert(user);
        }
        else {
            throw Error('すでに登録されています');
        }
    }
};
UserRepository = __decorate([
    typeorm_1.EntityRepository(User_1.User)
], UserRepository);
exports.default = UserRepository;
//# sourceMappingURL=userRepository.js.map