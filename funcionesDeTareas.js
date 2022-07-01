
const fs = require('fs');
const jsonData = JSON.parse(fs.readFileSync('./tareas.json', 'utf-8'))

let accion = process.argv[2];
switch(accion){
    case 'listar':
        console.log("Listado de Tareas")
      
        jsonData.tareas.forEach(tarea => {
            console.log(tarea.titulo + ' - ' + tarea.estado)
        });
       
        break;
    case undefined:
        console.log("Atención - tenés que pasar una acción, las acciones disponibles son: 'Listar'");    
        break;
    case 'crear':
        let nuevaTarea = {
            titulo: process.argv[3],
            estado: process.argv[4],  
        }           
          escribirJSON(nuevaTarea)
          break;
    case 'filtrar':
        let estado= process.argv[3];
            filtrarPorEstado(estado)
        break;
    default:
        console.log("No se entiende que deseas haces");    
       
    }


    function escribirJSON(nuevaTarea)  {
        let jsonData = JSON.parse(fs.readFileSync('./tareas.json', 'utf-8'))
          

        jsonData.tareas.push(nuevaTarea)
        jsonData = JSON.stringify(jsonData); //lo convierto a json
        
        fs.writeFileSync('./tareas.json', jsonData);

        //FIN LLAMO A GUARDAR TAREA
        console.log('Nueva tarea creada')
        console.log('===================')
        const newParse = JSON.parse(jsonData);
        console.log(newParse)
    }

    function filtrarPorEstado(estado){
        let jsonData = JSON.parse(fs.readFileSync('./tareas.json', 'utf-8'))//array js
        let tareasFiltradas =[]

        tareasFiltradas = jsonData.tareas.filter(tarea => tarea.estado === estado)
        console.log(tareasFiltradas)
    }

module.exports = accion
