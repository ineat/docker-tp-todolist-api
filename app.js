var express = require('express');
var cors = require('cors');
const createTodosRepository = require("./repositories/todos.repository");

const createApplication = (db, configuration) => {
    const router = express.Router();
    const repository = createTodosRepository({mongoDatabase: db});

    require("./routes/todos.router")(router, repository);

    const app = express();
    app.use(cors({
        origin: '*',
        allowedHeaders: ["Content-Type", "Authorization"],
        exposedHeaders: "Location"
    }));

    app.options('*', cors())

    app.all('', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        next();
    });

    app.use(express.json());
    app.use('/', router);
    app.set('port', configuration.port);
    return app;
}
module.exports = createApplication;
