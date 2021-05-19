// エンティティ
class UserChap6 {

  Id: UserIdChap6
  Name: UserNameChap6
  MailAddress: MaillAddress

  constructor(
    name: UserNameChap6,
    mailAddress: MaillAddress,
    id?: UserIdChap6
  ) {

    if ( id ) {
      this.Id = id
    } else {
      this.Id = new UserIdChap6( new Date().getTime() )
    }
    this.Name = name
    this.MailAddress = mailAddress
  }

  changeName( name: UserNameChap6 ): void {
    this.Name = name
  }

  changeMailAddress( mailAddress: MaillAddress ): void {
    this.MailAddress = mailAddress
  }
}

// 値オブジェクト
// コンストラクタでのみ値を設定できるようにする（getterを排除）
class UserNameChap6 {
  readonly value: string

  constructor( name: string ) {

    if ( name.length < 3 ) { throw TypeError( 'ユーザ名は3文字以上' ) }
    if ( name.length > 20 ) { throw TypeError( 'ユーザ名は20文字以下' ) }

    this.value = name
  }
}

class UserIdChap6 {
  readonly value: number

  constructor( id: number ) {

    this.value = id
  }
}

class MaillAddress {
  readonly value: string

  constructor( mailAddress: string ) {
    this.value = mailAddress
  }
}

// ドメインサービス
class UserServiceChap6 {

  constructor( private readonly userRepository: IUserRepositoryChap6 ) { }

  async isExists( user: UserChap6 ): Promise<boolean> {

    // let dupulicatedUser = await this.userRepository.findByName( user.Name )
    let dupulicatedUser = await this.userRepository.findByMailAddress( user.MailAddress ) //ユーザ名に変更があった場合に変更する箇所はここだけ
    return dupulicatedUser != null
  }
}

// リポジトリのインターフェース
interface IUserRepositoryChap6 {
  findById( id: UserIdChap6 ): Promise<UserChap6>
  findByName( name: UserNameChap6 ): Promise<UserChap6>
  findByMailAddress( mailAddress: MaillAddress ): Promise<UserChap6>
  save( user: UserChap6 ): Promise<void>
  delete( user: UserChap6 ): Promise<void>
}

class UserRepositoryChap6 implements IUserRepositoryChap6 {

  async findById( id: UserIdChap6 ): Promise<UserChap6> {
    return new UserChap6(
      new UserNameChap6( '' ),
      new MaillAddress( 'aaaa@ccc.cccc' ),
      id
    )
  }

  async findByName( name: UserNameChap6 ): Promise<UserChap6> {
    return new UserChap6(
      name,
      new MaillAddress( 'aaaa@ccc.cccc' )
    )
  }

  async findByMailAddress( mailAddress: MaillAddress ): Promise<UserChap6> {
    return new UserChap6(
      new UserNameChap6( '' ),
      mailAddress
    )
  }

  async save( user: UserChap6 ): Promise<void> { }

  async delete( user: UserChap6 ): Promise<void> { }

}


class UserApplicationService {

  constructor(
    private readonly userRepository: IUserRepositoryChap6,
    private readonly userService: UserServiceChap6
  ) { }

  /*
   * ユーザ登録 
  */
  registerUser( command: UserRegisterCommand ): void {
    let user = new UserChap6( new UserNameChap6( command.Name ), new MaillAddress( command.MailAddress ) )
    if ( this.userService.isExists( user ) ) { throw Error( 'ユーザは既に登録済み' ) }

    this.userRepository.save( user )
  }

  /*
   * ユーザ情報取得
   */
  async get( userId: number ): Promise<UserDataChap6> {
    let targetId = new UserIdChap6( userId )
    let user = await this.userRepository.findById( targetId )

    if ( !user ) {
      return null
    }

    return new UserDataChap6( user )
  }

  /*
   * ユーザ情報更新
   */
  async update( updateCommand: UserUpdateCommand ): Promise<void> {
    let targetId = new UserIdChap6( updateCommand.Id )
    let user = await this.userRepository.findById( targetId )

    if ( !user ) { throw Error( 'ユーザ登録されていない' ) }

    let newUserName = new UserNameChap6( updateCommand.Name )
    user.changeName( newUserName )

    if ( this.userService.isExists( user ) ) {
      throw Error( 'ユーザは既に登録済み' )
    }

    let mailAddress = updateCommand.MailAddress
    if ( !mailAddress ) {
      let newMailAddress = new MaillAddress( mailAddress )
      user.changeMailAddress( newMailAddress )
    }

    await this.userRepository.save( user )
  }

  /*
   * ユーザ情報削除
  */
  async deleteUser( command: UserUpdateCommand ): Promise<void> {
    let targetId = new UserIdChap6( command.Id )
    let user = await this.userRepository.findById( targetId )

    if ( !user ) { throw Error( 'ユーザ登録されていない' ) } // ユーザが見つからないため、returnとして退会成功としてもよい

    await this.userRepository.delete( user )
  }
}


class Client {
  constructor( private userApplicationSerive: UserApplicationService ) { }

  /*
   * データの永続化が出来ていない
   * アプリケーションサービス以外のオブジェクトがドメインオブジェクトを操作できてしまうことが問題
  */
  changeName( id: number, name: string ) {
    let target = this.userApplicationSerive.get( id )
    let newName = new UserNameChap6( name )
    // target.changeName( newName ) // changeNameメソッドを持たないUserDataの操作が不可となった
  }
}

// ユーザクラスを受け渡すためのDTO
class UserDataChap6 {

  readonly Id: number
  readonly Name: string

  constructor( user: UserChap6 ) {
    this.Id = user.Id.value
    this.Name = user.Name.value
  }
}

// コマンドオブジェクト => リクエストパラメータでも同じ考え方が出来そう
class UserUpdateCommand {

  readonly Id: number
  readonly Name: string
  readonly MailAddress: string

  constructor( id: number, name?: string, mailaddress?: string ) {
    this.Id = id

    if ( name ) { this.Name = name }
    if ( mailaddress ) { this.MailAddress = mailaddress }
  }
}

class UserRegisterCommand {
  readonly Name: string
  readonly MailAddress: string

  constructor( name: string, mailaddress: string ) {
    this.Name = name
    this.MailAddress = mailaddress
  }
}


// 凝集度の観点からクラスを分割する
class UserRegisterService {

  constructor(
    private readonly userRepository: IUserRepositoryChap6,
    private readonly userService: UserServiceChap6
  ) { }

  /*
   * ユーザ登録 
  */
  registerUser( command: UserRegisterCommand ): void {
    let user = new UserChap6( new UserNameChap6( command.Name ), new MaillAddress( command.MailAddress ) )
    if ( this.userService.isExists( user ) ) { throw Error( 'ユーザは既に登録済み' ) }

    this.userRepository.save( user )
  }
}

class UserGetInfoService {

  constructor(
    private readonly userRepository: IUserRepositoryChap6,
    private readonly userService: UserServiceChap6
  ) { }

  /*
   * ユーザ情報取得
   */
  async get( userId: number ): Promise<UserDataChap6> {
    let targetId = new UserIdChap6( userId )
    let user = await this.userRepository.findById( targetId )

    if ( !user ) {
      return null
    }

    return new UserDataChap6( user )
  }
}

class UserUpdateService {

  constructor(
    private readonly userRepository: IUserRepositoryChap6,
    private readonly userService: UserServiceChap6
  ) { }

  /*
   * ユーザ情報更新
   */
  async update( updateCommand: UserUpdateCommand ): Promise<void> {
    let targetId = new UserIdChap6( updateCommand.Id )
    let user = await this.userRepository.findById( targetId )

    if ( !user ) { throw Error( 'ユーザ登録されていない' ) }

    let newUserName = new UserNameChap6( updateCommand.Name )
    user.changeName( newUserName )

    if ( this.userService.isExists( user ) ) {
      throw Error( 'ユーザは既に登録済み' )
    }

    let mailAddress = updateCommand.MailAddress
    if ( !mailAddress ) {
      let newMailAddress = new MaillAddress( mailAddress )
      user.changeMailAddress( newMailAddress )
    }

    await this.userRepository.save( user )
  }
}

// 依存の注入
class UserDeleteService {

  constructor(
    private readonly userRepository: IUserRepositoryChap6,
  ) { }

  /*
   * ユーザ情報削除
  */
  async deleteUser( command: UserUpdateCommand ): Promise<void> {
    let targetId = new UserIdChap6( command.Id )
    let user = await this.userRepository.findById( targetId )

    if ( !user ) { throw Error( 'ユーザ登録されていない' ) } // ユーザが見つからないため、returnとして退会成功としてもよい

    await this.userRepository.delete( user )
  }
}

let userRepository6 = new UserRepositoryChap6()
let userDeleteService = new UserDeleteService( userRepository6 )