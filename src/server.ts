import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import indexRoutes from "./routes/indexRoutes";
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors'; 
import userRoutes from "./routes/userRoutes";


class Server{

    app : express.Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(){
        const MONGO_URI = 'mongodb://localhost/TP2-TPFinal'
        mongoose.set('useFindAndModify', true);
        mongoose.connect(MONGO_URI || process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }).then(db => console.log('DB is connected'))
        //Setting
        this.app.set('port', process.env.PORT || 3000);
        //MiddleWares
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        //Para soportar envios desde formularios
        this.app.use(express.urlencoded({extended: false}))
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors())
    }

    routes(){
        this.app.use(indexRoutes);
        this.app.use('/users',userRoutes);
    }

    start(){
        this.app.listen(this.app.get('port'), ()=>{
            console.log('Server on port', this.app.get('port'))
        })
    }

}
import indesRoutes from "./routes/indexRoutes";
const server = new Server()
server.start()