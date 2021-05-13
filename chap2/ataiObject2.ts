class Money{
  
  constructor(
    private readonly amount: number,
    private readonly currency: string
  ) { }

  addMoney( money: Money ): Money {
    
    if ( this.currency != money.currency ) { throw TypeError( '通貨単位が異なる' ) }
    
    return new Money(this.amount + money.amount,this.currency)
  }

  multiply( rate: number ): Money {
    
    return new Money(this.amount*rate ,this.currency)
  }
}

let myMoney = new Money(1000,'JPY')
let allowance = new Money(3000,'JPY')
let allowance2 = new Money(3000,'USD') 

let result = myMoney.addMoney( allowance )
//let result2 = myMoney.addMoney( allowance2 ) // 通貨単位が異なるため例外

// 値オブジェクトの有用性
// １．製品番号等のフォーマットが決まった値に関して値オブジェクトとして定義できる
// ２．不正な値を存在させない
// ３．誤った代入を防ぐ
// ４．ロジックの散在を防ぐ

// １．製品番号等のフォーマットが決まった値に関して値オブジェクトとして定義できる
class ModuleNumber {

  constructor(
    private readonly productCode: string,
    private readonly branch: string,
    private readonly lot: string
  ) { }

  toString() :string{

    return `${ this.productCode }-${ this.branch }-${ this.lot }`
  }
}

// ２．不正な値を存在させない
// userNameを3文字以上に制限する場合
class UserName{
  private readonly userName:string

  constructor( userName: string ) {
    if ( userName.length < 3) {
      throw new TypeError()
    }
    this.userName = userName
  }
}

const user1 = new UserName( 'sss' )
//const user2 = new UserName( 'ss' ) // エラーとなる


// ３．誤った代入を防ぐ
let createUser = function ( name: string ): User{
  let user = new User()
  // user.Id = name // エラー
  user.Id = new UserId( name )
  user.Name = new UserName('kazutaka nakamura')
  return user
}

// useridを値オブジェクトとして定義する
class UserId{
  constructor(private readonly userid:string){}
}

class User{
  Id: UserId
  Name:UserName
}

let user3 = createUser( 'kazutaka' )


// ４．ロジックの散在を防ぐ
// 例えば、UserNameは3文字以上とするロジックを変更する場合、値オブジェクトのロジックのみ変更すればよい => 分散化を防いでいる
