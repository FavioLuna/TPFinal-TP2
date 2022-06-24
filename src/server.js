"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//Morgan es un modulo permite ver por consola las peticiones que lleguen, permitiendo tener más información
const morgan_1 = __importDefault(require("morgan"));
//Modulo para conectarse a MongoDB
const mongoose_1 = __importDefault(require("mongoose"));
//Modulo que comprime los body del response para los request que pasen por el mismo.
const compression_1 = __importDefault(require("compression"));
//Con Cors permitimos requests de cualquier origen. Permitiendo configurar las politicas CORS.
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
//import shirtRoutes from "./routes/shirtRoutes";
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        const MONGO_URI = 'mongodb://localhost/TP2-TPFinal';
        mongoose_1.default.set('useFindAndModify', true);
        mongoose_1.default.connect(MONGO_URI || process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }).then(db => console.log('DB is connected'));
        //Setting
        //Le estamos diciendo que si encuentra un puerto en el sistema que lo use, en su defecto usara el puerto 3000
        this.app.set('port', process.env.PORT || 3000);
        //MiddleWares
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(express_1.default.json());
        //Para soportar envios desde formularios
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use((0, compression_1.default)());
        this.app.use((0, cors_1.default)());
    }
    routes() {
        this.app.use(userRoutes_1.default);
        //this.app.use(shirtRoutes)
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
