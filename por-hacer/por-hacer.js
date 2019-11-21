
const fs = require('fs');

let listadoPorHacer = [];


/** Crear una tarea */
const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado:false
    };

    listadoPorHacer.push(porHacer);
    guardarDB();

    return porHacer;
    
}

// carga la base
const cargarDB = () => {

    try{
        listadoPorHacer = require('../db/data.json');
    }  catch(error){
        listadoPorHacer = [];
    }

}

// devuelve el listado
const getListado = () => {
    
    cargarDB();
    return listadoPorHacer;

}

/** Guarda los datos  */
const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json',data,err => {
        if(err) throw new Error('No se pudo grabar',err);
    });
}

// actualiza un elemento del listado
const actualizar = (descripcion,completado=true) => {
    
    cargarDB();

    // buscar lo que coincida con la descripcion enviada
    // devuelve el resultado en tarea cuando la condicion se cumple
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })

    if(index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }

}

/** Eliminar una tarea por hacer */
const borrar = (descripcion) => {
    
    // cargar la base
    cargarDB();

    // crea un nuevo array con los elementos distintos al enviado (quita el enviado)
    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion
    })

    // una forma loca de comprobar si elimine alguno
    if(nuevoListado.length == listadoPorHacer.length){
        return true;
    }else{
        listadoPorHacer = nuevoListado;
        guardarDB();
        return false;
    }


    // // buscar
    // let index = listadoPorHacer.findIndex(tarea => tarea.descripcion == descripcion);

    // if(index>=0){
    //     listadoPorHacer.splice(index,1);
    //     guardarDB();
    //     return true;
    // }else{
    //     return false;
    // }
}


const listar = () => {

    // cargar la base
    cargarDB();

    let listado = getListado();

    // cabecera
    let s = 'Hay ' + listado.length + ' tareas por hacer';
    console.log(s.red);

    for(let tarea of listado){
        console.log('======== Por Hacerlo  ========='.green);
        console.log(tarea.descripcion);
        console.log('Estado: ',tarea.completado);
        console.log('============================'.green);
    }
    return true;
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar,
    listar
}