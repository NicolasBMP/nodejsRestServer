const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

/* const corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200
}
 */
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.connectDB();
        this.middlewares();
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        //ACCESOS CORS
        this.app.use(cors());
        //LECTURA BODY
        this.app.use(express.json());
        //DIRECTORIO
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use('/api/users', require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`El webserver esta corriendo en el puerto ${this.port}`);
        });
    }
}

module.exports = Server;
