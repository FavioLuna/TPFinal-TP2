import nodemailer from 'nodemailer'

class Email {

    enviar(para: string, asunto: string, cuerpoMensaje: string, pathArchivoAdjunto: string) : Promise<any> {
        return new Promise( (resolve,reject) => {
            var transporter = nodemailer.createTransport({
                host: 'smtp.mail.yahoo.com',
                port: 465,
                service:'yahoo',
                secure: false,                
                auth: {
                    user: 'tp2.test@yahoo.com',
                    pass: '136H90mnAD'    
                },
                debug: false,
                logger: true 
            });
            const mailOptions = {
                from : 'tp2.test@yahoo.com',
                to: para,
                subject: asunto,
                text: cuerpoMensaje,
                attachments : [{path:pathArchivoAdjunto}]
            }
            transporter.sendMail(mailOptions,function(err,info) {
                if(err) {
                    throw err;
                } else {
                    console.log(info);
                    
                }
            });    
        })
    }

}

export {Email}