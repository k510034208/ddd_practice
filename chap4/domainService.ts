// 不自然なふるまい
// ユーザオブジェクトにユーザの重複チェックをかける
class User7 {

  constructor( private readonly userId: UserId3, private name: UserName2 ) { }

  isExists( user: User7 ) {
    // 重複を確認するコード
  }

}

class UserId3 {
  constructor( private userId: number ) { }
}

class UserName2 {
  constructor( private name: string ) { }
}

let user6 = new User7(
  new UserId3( 1 ),
  new UserName2( 'nakamura' )
)

// 生成したユーザインスタンスが存在するか、自身のインスタンスに確認している点が不自然
let checkDuplicate1 = user6.isExists( user6 )


// ユーザに関するドメインサービスの作成
class UserService {
  isExists( user: User7 ) {
    // 重複を確認するコード
  }
}

const userService = new UserService()
let checkDuplicate2 = userService.isExists( user6 )

// すべての振る舞いをドメインサービスに定義することは可能であるが、結果はドメインモデル貧血症を引き起こす（= ドメインモデルにsetteg,getterしか定義されていない状態）


// ユーザ作成のユースケースを作る
class User8 {
  Id: UserId3
  Name: UserName2

  constructor( name: UserName2 ) {

    this.Id = new UserId3( new Date().getTime() )  // 一意の値を生成
    this.Name = name
  }
}

class UserService2 {

  isExists( user: User8 ): boolean {

    // 重複を確認するコード
    // ここにDB操作のためのスクリプトを書く => DB操作するクラスに処理を任せたい
    return false
  }
}


// ユースケースはここから
let user7 = new User8(
  new UserName2( 'nakamura' )
)

const userService2 = new UserService2()

if ( userService2.isExists( user7 ) ) {
  throw new Error( 'ユーザはすでに存在している' )
}

// ここにDB操作のためのスクリプトを書く => DB操作するクラスに処理を任せたい



/* 物流システムにおけるドメインサービス */
class PhysicalDistributionBase {

  ship( baggage: Baggage ): Baggage {
    // 省略
    return new Baggage() // temorary
  }

  recieve( baggage: Baggage ): void {
    // 省略
  }


  transport( to: PhysicalDistributionBase, baggage: Baggage ): void { // 物流拠点モデル内に配送処理を書くのはおかしいのでは？

  }

  // 配送に関する記録も必要か？
}

class TransportService {

  transport( from: PhysicalDistributionBase, to: PhysicalDistributionBase, baggage: Baggage ): void {

    let shippedBaggege = from.ship( baggage )
    to.recieve( shippedBaggege )
  }

  // 配送に関する記録
}

class Baggage { }
