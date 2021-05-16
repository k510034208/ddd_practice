/*
import { readFile } from 'fs'
import { resolve } from 'url'

function appendAndReadPromise( path: string, data: string ): Promise<string> {
  return appendFile( paths, data )
    .then( () => readFile( path ) )
    .catch( error => console.log( error ) )
}

type Executor<T, E extends Error> = (
  resolve: ( result: T ) => void,
  refect: ( error: E ) => void
) => void

class Promise<T, E extends Error> {
  constructor( f: Executor<T, E> ) { }
  then<U, F extends Error>( g: ( result: T ) => Promise<U, F> | U ): Promise<U, F>
  catch<U, F extends Error>( g: ( error: E ) => Promise<U, F> | U ): Promise<U, F>
}

readFile( path, ( error, result ) => {

} )

function readFilePromise( path: string ): Promise<string> {
  return new Promise( ( resolve, reject ) => {
    readFile( path, ( error, result ) => {
      if ( error ) {
        reject( error )
      } else {
        resolve( error )
      }
    } )
  } )
}
*/