import "reflect-metadata";
import bodyParser = require( "body-parser" );

import { createConnection, useContainer as ormUseContainer } from "typeorm";
import { createExpressServer, useContainer as routingUseContainer } from "routing-controllers"

import { Container } from "typedi";
import { UserController } from "./controller/UserController"

//routingUseContainer( Container )
routingUseContainer( Container )
ormUseContainer( Container )

createConnection()
    .then( async connection => {

        // create express app
        // const app = express();
        // register express routes from defined application routes
        const app = createExpressServer( {
            controllers: [
                UserController
            ]
        } )

        // setup express app here
        // ...
        app.use( bodyParser.json() )

        // start express server
        app.listen( process.env.PORT || 3000 );

        console.log( "Express server has started" );

    } ).catch( error => console.log( error ) );
function normalizePort( arg0: string ) {
    throw new Error( "Function not implemented." );
}