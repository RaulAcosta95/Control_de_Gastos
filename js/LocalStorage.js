let listaDeGastosLocalStorage = [];

if (localStorage.getItem('listaDeGastosLocalStorage') != null) {
    listaDeGastosLocalStorage = JSON.parse(localStorage.getItem('listaDeGastosLocalStorage'));
    console.log(listaDeGastosLocalStorage);
} else{
    console.log('No hay alarmas');
}

addEventListener('EnvioDatosNuevoGasto', (data)=>{
    agregarGastoALocalStorage(data.detail.data);
})

function agregarGastoALocalStorage (data) {
    console.log('agregarGastoALocalStorage');

    let tituloGastoActual = data.tituloGastoActual;
    let descripcionGastoActual = data.descripcionGastoActual;
    let cantidadGastoActual = data.cantidadGastoActual;
    let id = data.id;

    console.log("tituloGastoActual = " + tituloGastoActual);
    console.log("descripcionGastoActual = " + descripcionGastoActual);
    console.log("cantidadGastoActual = " + cantidadGastoActual);
    console.log("id = " + id);

    //Actualiza el storage
    localStorage.setItem('listaDeGastosLocalStorage',JSON.stringify(listaDeGastosLocalStorage));
}