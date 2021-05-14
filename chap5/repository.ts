/*
  リポジトリ：データを永続化して再構築する処理を抽象的に扱うためのオブジェクト
  値オブジェクト、エンティティ <=> リポジトリ <=> データストア
*/
class UserService3 {

  constructor( private userRepository: IuserRepository ) { }

  isExists( user: User9 ): boolean {

    // ユーザ名を起因として重複チェックしていることだけを示す
    let found = this.userRepository.find( user.Name )

    return found != null
  }
}

// インターフェースの定義
// インターフェース：振る舞いのみを定義したクラスのこと。実装は定義しない
// implementsキーワードでインターフェースを実装できる
interface IuserRepository {
  save( user: User9 ): void
  find( name: UserName3 ): User9 | null

  //リポジトリの責務はデータの永続化と再構築であるため、重複チェック等のロジックを実装するのは好ましくない
  // ドメインサービスに実装するほうがよい
  // isExits( user: User9 ): boolean 
}

class userRepository implements IuserRepository {

  private connectionStr = 'xxxx'

  save( user: User9 ): void {

    // DBへの保存処理
  }

  find( name: UserName3 ): User9 | null {

    // DBからの値取得処理

    // 成功時
    // return User9
    // 失敗時
    return null
  }
}

class Program {

  private userRepository: IuserRepository

  constructor( userRepository: IuserRepository ) {
    this.userRepository = userRepository
  }

  createUser( userName: string ): void {

    let user = new User9(
      new UserName3( userName )
    )

    let userService = new UserService3( this.userRepository )
    if ( userService.isExists( user ) ) {
      throw Error( '既に重複している' )
    }

    try {
      //userRepository.save()
    } catch ( err ) {
    }
    return
  }
}

class User9 {
  Name: UserName3
  constructor( name: UserName3 ) {
    this.Name = name
  }
}

class UserName3 {
  constructor( userName: string ) { }
}

// ユーザ作成処理
const userRepository2 = new userRepository()
let program = new Program( userRepository2 )
program.createUser( 'nakamura' )
