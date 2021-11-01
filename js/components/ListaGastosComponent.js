import { LitElement, html } from 'https://unpkg.com/lit-element?module';
import {listaDeGastosLocalStorage} from './../LocalStorage.js';

export class ListaGastosComponent extends LitElement{
    constructor(){
        super();
        this.gastosLocalStorage = listaDeGastosLocalStorage;

        addEventListener('localStorageActualizado', (data)=>{
            this._pintarComponentesGasto();
        })
        
        addEventListener('EliminarDatosGasto', (data)=>{
                this._despintarComponenteGasto(data.detail.data);
        })
        
    }

    static get Properties(){
        return {
            gastosLocalStorage: {type:Array}
        }
    }

    render(){
        return html `
            <div id="listaGastos">
            </div>
            `
    }

    firstUpdated() {
        // Después del render
        if (this.gastosLocalStorage == null) {
            console.log('No hay gastos');
        } else{
            this._pintarComponentesGasto();
        }
    }
    
    _pintarComponentesGasto(){
        let listaGastos = this.shadowRoot.getElementById('listaGastos');
        //Limpiar la lista en pantalla
        listaGastos.innerHTML = "";
        //Imprimir con nueva data
        for (let i = 0; i < this.gastosLocalStorage.length; i++) {
            listaGastos.innerHTML += `
            <gasto-en-lista tituloGastoActual="${this.gastosLocalStorage[i].tituloGastoActual}" 
            descripcionGastoActual="${this.gastosLocalStorage[i].descripcionGastoActual}" 
            cantidadGastoActual="${this.gastosLocalStorage[i].cantidadGastoActual}" 
            id="${this.gastosLocalStorage[i].id}"></gasto-en-lista>
            `;
        }
    }

    _despintarComponenteGasto(id){
        let listaGastos = this.shadowRoot.getElementById('listaGastos');
        let gastoAEliminar = this.shadowRoot.getElementById(`${id}`);
        listaGastos.removeChild(gastoAEliminar);
    }

}
customElements.define('lista-gastos', ListaGastosComponent);