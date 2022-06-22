import pdf from 'html-pdf'

class Pdf {

    crear( html: string , archivo : string  ) : Promise<any> {

        return new Promise( (resolve, reject) => {

            pdf.create(html).toFile( archivo , function(err,res) {
                if( err) { reject("Error al crear archivo pdf") }
                else { resolve("Archivo creado") }            
            });
        });
    }

}

export { Pdf }