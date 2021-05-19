"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const bodyParser = require("body-parser");
const typeorm_1 = require("typeorm");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const UserController_1 = require("./controller/UserController");
//routingUseContainer( Container )
routing_controllers_1.useContainer(typedi_1.Container);
typeorm_1.useContainer(typedi_1.Container);
typeorm_1.createConnection()
    .then(async (connection) => {
    // create express app
    // const app = express();
    // register express routes from defined application routes
    const app = routing_controllers_1.createExpressServer({
        controllers: [
            UserController_1.UserController
        ]
    });
    // setup express app here
    // ...
    app.use(bodyParser.json());
    // start express server
    app.listen(process.env.PORT || 3000);
    console.log("Express server has started");
}).catch(error => console.log(error));
function normalizePort(arg0) {
    throw new Error("Function not implemented.");
}
//# sourceMappingURL=index.js.map