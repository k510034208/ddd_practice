export class UserCreateResponse {
  firstName: string
  lastName: string
  email: string
  age: number
  constructor (
    firstName: string,
    lastName: string,
    email: string,
    age: number
  ) {
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.age = age
  }
}

export class UserCreateRequest {
  firstName: string
  lastName: string
  email: string
  age: number
  constructor (
    firstName: string,
    lastName: string,
    email: string,
    age: number
  ) {
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.age = age
  }
}