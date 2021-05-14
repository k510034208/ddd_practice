export class UserCreateApiResponse {
  status: 'success' | 'error'
  result: UserCreateResponse | {}

  constructor(
    status: 'success' | 'error',
    result: UserCreateResponse | {} ) {
    this.status = status
    this.result = result
  }
}

export class UserCreateResponse {
  firstName: string
  lastName: string
  email: string
  age: number
  constructor(
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
  constructor(
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