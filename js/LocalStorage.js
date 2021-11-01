let listaDeGastosLocalStorage = [];
export {listaDeGastosLocalStorage};

if (localStorage.getItem('listaDeGastosLocalStorage') != null) { //Si NO está vacío el Local Storage
    listaDeGastosLocalStorage = JSON.parse(localStorage.getItem('listaDeGastosLocalStorage'));
    console.log('Lista de gastos de Local Storage:');
    console.log(listaDeGastosLocalStorage);
} else{
    console.log('No hay alarmas');
}

addEventListener('EnvioDatosNuevoGasto', (data)=>{  //Añadir Nuevo Gasto Component
    agregarGastoALocalStorage(data.detail.data);
})

addEventListener('EliminarDatosGasto', (data)=>{ //Gasto en Lista Component
    eliminaGastoDeLocaStorage(data.detail.data);
})

addEventListener('ModificarDatosGasto', (data)=>{ //Modificar Gasto Component
    modificaGastoDeLocaStorage(data.detail.data);
});

function agregarGastoALocalStorage (data) {
    console.log('agregarGastoALocalStorage');

    let tituloGastoActual = data.tituloGastoActual;
    let descripcionGastoActual = data.descripcionGastoActual;
    let cantidadGastoActual = data.cantidadGastoActual;
    let id = data.id;

    //Añade a listaDeGastosLocalStorage
    listaDeGastosLocalStorage.push({
        tituloGastoActual,
        descripcionGastoActual,
        cantidadGastoActual,
        id
    });

    console.log(listaDeGastosLocalStorage);

    //Actualiza el storage
    localStorage.setItem('listaDeGastosLocalStorage',JSON.stringify(listaDeGastosLocalStorage));
    console.log('localStorage Actualizado');

    dispatchEvent( new CustomEvent('localStorageActualizado', {
        bubbles: true,
        composed:true
    }));
}

function eliminaGastoDeLocaStorage(id) {
    console.log('Eliminar de Local Storage: ' + id);

    for (let i = 0; i < listaDeGastosLocalStorage.length; i++) {
        if(listaDeGastosLocalStorage[i].id == id){
            listaDeGastosLocalStorage.splice(i,1)
            break;
        }
    }

    localStorage.setItem('listaDeGastosLocalStorage',JSON.stringify(listaDeGastosLocalStorage));
    console.log('localStorage Actualizado');
}

function modificaGastoDeLocaStorage(data) {
    console.log('modificaGastoDeLocaStorage');

    let tituloGastoActual = data.nuevoTituloGasto;
    let descripcionGastoActual = data.nuevoDescripciónGasto;
    let cantidadGastoActual = data.nuevoCantidadGasto;
    let id = data.idAModificar;

    for (let i = 0; i < listaDeGastosLocalStorage.length; i++) {
        if(listaDeGastosLocalStorage[i].id == id){
            listaDeGastosLocalStorage[i].tituloGastoActual = tituloGastoActual;
            listaDeGastosLocalStorage[i].descripcionGastoActual = descripcionGastoActual;
            listaDeGastosLocalStorage[i].cantidadGastoActual = cantidadGastoActual;
            break;
        }
    }
    
    localStorage.setItem('listaDeGastosLocalStorage',JSON.stringify(listaDeGastosLocalStorage));
    console.log('localStorage Actualizado');
    
    dispatchEvent( new CustomEvent('localStorageActualizado', {
        detail: {data: listaDeGastosLocalStorage},
        bubbles: true,
        composed:true
    }));

}