class FullName{
  constructor(
    private readonly lastName: FirstName,
    private readonly firstName: LastName,
  ){}
  
  Equals( other: this ):boolean {
    if ( other == null ) { return false }
    if ( other == this ) { return true }
    return ( this.firstName == other.firstName
      && this.lastName == other.lastName)
  }
}

class FirstName{
  private readonly firstName:string

  constructor( firstName: string ) {
    if (firstName == null || firstName.length == 0) {
      throw new TypeError()
    }
    this.firstName = firstName
  }
}

class LastName{
  private readonly lastName:string

  constructor( lastName: string ) {
    if (lastName == null || lastName.length == 0) {
      throw new TypeError()
    }
    this.lastName = lastName
  }
}


let fullName = 'kazutaka nakamura'
console.log( fullName )

let tokens = fullName.split( ' ' )
console.log( tokens[0] )

let nameA = new FullName( new FirstName('kazutaka'),new LastName('nakamura') )
let nameB = new FullName( new FirstName('kazutaka'), new LastName('nakamura'))

console.log(nameA.Equals(nameB))