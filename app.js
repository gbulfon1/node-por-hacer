const argv = require('./config/yargs').argv;
const colors = require('colors');

const porHacer = require('./por-hacer/por-hacer');

let comando  = argv._[0];

switch(comando){
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion); 
        console.log(tarea);
        porHacer.listar();
    break;
    case 'listar':
        porHacer.listar();
    break;
    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        porHacer.listar();
        break;
    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion);
        console.log(borrado);
        porHacer.listar();
        break;
    default:
        console.log('comando no reconocido');
}