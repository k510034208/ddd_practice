import { UserChap6, UserNameChap6, UserIdChap6, MaillAddress, IUserRepositoryChap6, UserServiceChap6, UserRegisterCommand } from '../chap6/applicationService1'

class UserChap9 extends UserChap6 { }

interface IUserFactory {
  create( name: UserNameChap6, mailAddress: MaillAddress ): UserChap9
}

class UserFactory implements IUserFactory {
  create( name: UserNameChap6, mailAddress: MaillAddress ) {

    let seqId: number
    seqId = new Date().getTime()

    return new UserChap9(
      name,
      mailAddress,
      new UserIdChap6( seqId )
    )
  }
}

// ユーザIDをシーケンシャルに設定したい時のファクトリー
class InMemoryUserFactory implements IUserFactory {

  constructor( private currentId: number ) { }

  create( name: UserNameChap6, mailAddress: MaillAddress ) {

    let userId = this.currentId++

    return new UserChap9(
      name,
      mailAddress,
      new UserIdChap6( userId )
    )
  }
}

class UserRegisterService {

  constructor(
    private readonly userRepository: IUserRepositoryChap6,
    private readonly userService: UserServiceChap6,
    private readonly userFactory: IUserFactory
  ) { }

  /*
   * ユーザ登録 
  */
  registerUser( command: UserRegisterCommand ): void {

    // インスタンス作成をFactory経由で行う
    // let user = new UserChap6( new UserNameChap6( command.Name ), new MaillAddress( command.MailAddress ) )
    let user = this.userFactory.create( new UserNameChap6( command.Name ), new MaillAddress( command.MailAddress ) )
    if ( this.userService.isExists( user ) ) { throw Error( 'ユーザは既に登録済み' ) }

    this.userRepository.save( user )
  }
}