import {Schema, model, Document} from 'mongoose';
import bcrypt from 'bcrypt';


//Esta dependencia formatea loe errorres de MongoDB
//relacionados al error por unique.
//De esta forma es más legible
const beautifyUnique = require('mongoose-beautiful-unique-validation');
/* Uso una Interface para manetener y seguir el tipo de informacion
    que estoy usando para este modelo en particular.
    De esta forma sé el tipo de dato que agarro de la DB
    y/o insertando.
    Para las validaciones es sumamente necesario implementarlas
    porque sino los metodos no saben qué tipo de información
    o de dónde salen los atributos
*/
export interface I_UserDoc extends Document {
    name: string,
    email: string,
    password: string,
    token: string,
    admin: {
        type: boolean,
        defautl: false
    },
    comparePassword: (password: string) => Promise<boolean>
}

//Schema define cómo sera el modelo en la BD
//Necesito aclarar para poder usar los atributos en los compare
//Sino me da un error de Documentacion y que no existe tal atributo
const userSchema: Schema<I_UserDoc> = new Schema({
    name: {
        type: String, //tipo de dato
        required: true, //si es requerido o no
        trim: true, //se usa para sacar espacios vacios adelante y detras
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,

    },
    password: {
        type: String,
        minLength: 8,
        trim: true,
        required:true,
    }, 
    admin:{
        type: Boolean,
        default: false,
    },
    token:{
        type: String,
    }
},{
    timestamps: true //Agrega el createdAT y updateAT en el model
});
userSchema.plugin(beautifyUnique);
//El método .pre() toma de parametro una acción
//en este caso es el 'save'
//Entonces antes de que se ejecute el save, el metodo cifrará
//Como password es un campo required, cuando el user haga una
//modificacion del mismo, entrará al if y ejecutara el cifrado.
//Para que funcione debo indicarle qué tipo de documento será el que va a analizar
userSchema.pre<I_UserDoc>('save', async function(next){
    const user = this
    //Consulto si el user modifica la contraseña
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8) //Guardo el hash, password cifrado, en la pass del user.
    }
    next()
});

//Defino un metodo para comparar contraseñas
userSchema.methods.comparePassword = async function(password: string): Promise<Boolean>{
    return await bcrypt.compare(password, this.password)
}

export default model<I_UserDoc>('User', userSchema) //Exporto el modelo, primer parametro nombre, segundo el shechma que usa.