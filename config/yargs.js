const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripcion de la tarea por hacer'
};

const completado = {
    default: true,
    alias: 'c',
    desc: 'Marca como completado o pendiente la tarea'
};


const argv = require('yargs')
    .command('crear','Crea una nueva tarea',{
        descripcion
    })
    .command('actualizar','Actualiza el estado completo de una tarea',{
        descripcion,
        completado
    })
    .command('borrar','Borra una tarea por hacer',{
        descripcion
    })
    .help()
    .argv;

/** Exportar los argumentos */
module.exports =  {
    argv
}