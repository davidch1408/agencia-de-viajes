import {Testimonial} from '../models/testimoniales.js'

const guardarTestimoniales = async (req, res) => {
    const errores = []

    //validar mensaje
    const {nombre, correo, mensaje} = req.body
    if(nombre.trim() === ''){
        errores.push({mensaje : 'el nombre esta vacio'});
    }

    if(correo.trim() === ''){
        errores.push({mensaje : 'el nombre esta vacio'});
    }

    if(mensaje.trim() === ''){
        errores.push({mensaje : 'el nombre esta vacio'});
    }

    if(errores.length > 0){
        //consultar testimoniales existentes
        const testimoniales = await Testimonial.findAll()

        //mostrar vista con errores
        res.render('testimoniales',{
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    }else{
        //almacenarlo en la base de datos
        try{
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            })
            res.redirect('/testimoniales')
        }catch(error){
            console.log(error);
        }
    }
}

export {
    guardarTestimoniales
}