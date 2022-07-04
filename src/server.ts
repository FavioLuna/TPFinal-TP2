import express from "express";
//Morgan es un modulo permite ver por consola las peticiones que lleguen, permitiendo tener más información
import morgan from "morgan";
//Modulo para conectarse a MongoDB
import mongoose from 'mongoose';
//Modulo que comprime los body del response para los request que pasen por el mismo.
import compression from 'compression';
//Con Cors permitimos requests de cualquier origen. Permitiendo configurar las politicas CORS.
import cors from 'cors'; 
import userRoutes from "./routes/userRoutes";
import shirtRoutes from "./routes/shirtRoutes";
import leagueRoutes from "./routes/leagueRoutes";
import teamRoutes from "./routes/teamRoutes";


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
        //Le estamos diciendo que si encuentra un puerto en el sistema que lo use, en su defecto usara el puerto 3000
        this.app.set('port', process.env.PORT || 3000);
        //MiddleWares
        this.app.use(morgan('dev')); 
        this.app.use(express.json());
        //Para soportar envios desde formularios
        this.app.use(express.urlencoded({extended: true}))
        this.app.use(compression());
        this.app.use(cors())
    }

    routes(){
        this.app.use(userRoutes);
        this.app.use(shirtRoutes)
        this.app.use(teamRoutes)
        this.app.use(leagueRoutes)
        
    }

    start(){
        this.app.listen(this.app.get('port'), ()=>{
            console.log('Server on port', this.app.get('port'))
        })
    }

}
const server = new Server()
server.start()