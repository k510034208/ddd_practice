/*
  エンティティの性質
  1. 可変である
  2. 同じ属性であっても区別される
  3. 同一性により区別される
  */

// 1. 可変である
// 人の名前は変化しない、身長は変化する
// エンティティでは振る舞いを通じて属性の変更を行う != メンバーをpublicにしてsetterでの変更を行う
class User2 {

  constructor( private name: string ) {
    if ( name.length < 3 ) { throw TypeError() }
  }

  changeName( name: string ) {
    if ( name.length < 3 ) { throw TypeError() }
    this.name = name
  }
}

let user2 = new User2( 'nakamura' )
user2.changeName( 'kazutaka' )

// 2. 同じ属性であっても区別される
// 同姓同名の人間は同じ人間ではない
// 3. 同一性により区別される

// 値オブジェクト
class UserId2 {
  constructor( private readonly userid: number ) { }
}

// エンティティ
class User3 {

  userId: UserId2

  constructor(
    private name: string,
    userId: UserId2
  ) {
    if ( name.length < 3 ) { throw TypeError() }
    this.userId = userId
  }

  changeUserName( name: string ) {
    if ( name.length < 3 ) { throw TypeError() }
    this.name = name
  }

  Equals( other: User3 ): boolean {
    if ( other == null ) { return false }
    if ( other == this ) { return true }
    return ( this.userId == other.userId )
  }
}

let user4 = new User3( 'nakamura', new UserId2( 1 ) )
let user5 = new User3( 'nakamura', new UserId2( 1 ) )

const resultCompareInstance = user4.Equals( user5 )
console.log( resultCompareInstance )

/* 
  ドメインオブジェクトを定義するメリット
  1. コードのドキュメント性が高まる
  2. ドメインにおける変更をコードに伝えやすくする
  */

// 説明不足
class User4 {
  constructor( private name: string ) { }
}

// 饒舌なコード
class User5 {
  constructor( private readonly name: string ) {
    if ( name.length < 3 ) { throw new TypeError() }
  }
}

// 2. ドメインにおける変更をコードに伝えやすくする
// ユーザ名の最低文字数を変更する場合、上記のクラスのコンストラクタを変更すればよい

class User6 { // 練習のため新たにクラスを定義
  constructor( private readonly name: string ) {
    // if ( name.length < 3 ) { throw new TypeError() }
    if ( name.length < 6 ) { throw new TypeError() }
  }
}