import "reflect-metadata";
import {createConnection} from "typeorm";
import {UserController} from "./controller/UserController"
import {createExpressServer} from "routing-controllers"

createConnection().then(async connection => {

    // create express app
    // const app = express();
    // register express routes from defined application routes
    const app = createExpressServer({
        controllers: [
            UserController
        ]
    })

    // setup express app here
    // ...

    // start express server
    var port = normalizePort(process.env.PORT || '3000');
    app.listen(port);

    console.log("Express server has started");

}).catch(error => console.log(error));
function normalizePort (arg0: string) {
    throw new Error("Function not implemented.");
}