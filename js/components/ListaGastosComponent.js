import { LitElement, html } from 'https://unpkg.com/lit-element?module';

export class ListaGastosComponent extends LitElement{
    constructor(){
        super();
        this.allData = [];
        this.newData = {};

        addEventListener('EnvioDatosNuevoGasto', (data)=>{
            this.newData = data.detail.data;
            this._añadirALocalStorage(this.newData);
        })
        
        addEventListener('EliminarDatosGasto', (data)=>{
            this._despintarComponenteGasto(data.detail.data);
        })

        
    }

    static get Properties(){
        return {
            allData: {type: Array},
            newData: {type: Object}
        }
    }

    connectedCallback(){
        super.connectedCallback();
        console.log('Connected Callback ListaGastosComponent');
        //Demasiado pronto para pintar... aún no hace render(){}
    }

    disconnectedCallback(){
        super.disconnectedCallback();
        console.log('Disconnected Callback ListaGastosComponent');
    }

    render(){
        return html `
            <div id="listaGastos">
                </div>
                `
    }
    firstUpdated() {
        // Después del render
        this._traerLocalStorage();
    }
    _traerLocalStorage(){
        // localStorage.clear();//AQUI
        if (localStorage.getItem('gastosLocalStorage') == null) {
            console.log('No hay gastos');
        } else{
            this.allData = JSON.parse(localStorage.getItem('gastosLocalStorage'));
            console.log(this.allData);
            for (let i = 0; i < this.allData.length; i++) {
                this._pintarComponentesGasto(this.allData[i]);
            }
        }
    }

    _añadirALocalStorage(data){
        console.log(data);
        this.allData.push(data);
        console.log(this.allData);
        localStorage.setItem('gastosLocalStorage',JSON.stringify(this.allData));
        console.log(JSON.parse(localStorage.getItem('gastosLocalStorage')));
        this._pintarComponentesGasto(data);
    }

    _pintarComponentesGasto(data){
        let listaGastos = this.shadowRoot.getElementById('listaGastos');
        console.log(listaGastos);
        listaGastos.innerHTML += `
        <gasto-en-lista tituloGastoActual="${data.tituloGastoActual}" descripcionGastoActual="${data.descripcionGastoActual}" cantidadGastoActual="${data.cantidadGastoActual}" id="${data.id}"></gasto-en-lista>
        `;
    }

    _despintarComponenteGasto(id){
        console.log('Despintar ' +id);//3gastoId
        //Eliminar de this.allData el elemento cuyo id sea = id

        let listaGastos = this.shadowRoot.getElementById('listaGastos');
        let gastoAEliminar = this.shadowRoot.getElementById(`${id}`);

        listaGastos.removeChild(gastoAEliminar);
        console.log(id+' Eliminado');
        this._borrarDeLocalStorage(id)

    }
    _borrarDeLocalStorage(id){
        console.log('BORRAR ' +id);
        //borrar la posición id de allData
        
        for (let i = 0; i < this.allData.length; i++) {
            console.log(this.allData[i].id);
            if(this.allData[i].id == id){
                console.log(this.allData[i]);
                this.allData.splice(i,1)
                i = this.allData.length;
            }
        }

        localStorage.setItem('gastosLocalStorage',JSON.stringify(this.allData));
    }

}
customElements.define('lista-gastos', ListaGastosComponent);