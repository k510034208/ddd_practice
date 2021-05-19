"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserCreateApiResponse {
    constructor(status, result) {
        this.status = status;
        this.result = result;
    }
}
exports.UserCreateApiResponse = UserCreateApiResponse;
class UserCreateResponse {
    constructor(firstName, lastName, email, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.age = age;
    }
}
exports.UserCreateResponse = UserCreateResponse;
class UserCreateRequest {
    constructor(firstName, lastName, email, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.age = age;
    }
}
exports.UserCreateRequest = UserCreateRequest;
//# sourceMappingURL=viewmodel.js.map