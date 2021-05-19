import 'reflect-metadata'
import { Container, Inject, Service, Token } from "typedi";

const myToken = new Token( 'SECRET_VAL_KEY' )

Container.set( myToken, 'my-secret-val' )
Container.set( 'my-config-key', 'val-for-config-key' )
Container.set( 'default-pagination', 30 )

const tokenVal = Container.get( myToken )
const configVal = Container.get( 'my-config-key' )
const defaultPagenation = Container.get( 'default-pagination' )

//console.log( tokenVal, configVal, defaultPagenation )
// my-secret-val val-for-config-key 30

@Service()
class InjectClass {
}

@Service()
class ExampleClass {
  @Inject()
  injectedClass: InjectClass
  // constructor( public injectedClass: InjectClass ) { }
}

const instance = Container.get( ExampleClass )

console.log( instance.injectedClass instanceof InjectClass )


