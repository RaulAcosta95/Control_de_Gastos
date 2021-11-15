import { LitElement, html } from 'https://unpkg.com/lit-element?module';
export class ModificarGastoComponent extends LitElement{
    static get properties(){ //Importante revisar mayusculas...
        return {
            tituloGastoActual: {type: String},
            descripcionGastoActual: {type: String},
            cantidadGastoActual: {type: Number},
            id: {type: String}
        }
    }

    constructor(){
        super();
    }

    connectedCallback(){
        super.connectedCallback();
        // console.log('Connected Callback DetalleGastoComponent');
    }
    disconnectedCallback(){
        super.disconnectedCallback();
        // console.log('Disconnected Callback DetalleGastoComponent');
    }
    render(){
        return html `
            <link rel="stylesheet" href="./css/ModificarGasto.css">
            <div id="modificaGastoComponent">
                <button @click=${this._quitarComponente} id="buttonX">X</button>
                <h3>Modifica Gasto</h3>
                <div id="formModificaGasto">
                    <form action="" id="formDatosNuevoGasto">
                        <label for="tituloGasto">TÍTULO</label>
                        <input  @change="${this._cambiarTituloGastoActual}" type="text" id="tituloGasto" placeholder="Título del gasto" value="${this.tituloGastoActual}">
                        <label for="descripcionGasto">DESCRIPCIÓN</label>
                        <input  @change="${this._cambiarDescripcionGastoActual}" type="text" id="descripcionGasto" placeholder="Descripción del gasto" value="${this.descripcionGastoActual}">
                        <label for="cantidadGasto">CANTIDAD</label>
                        <input  @change="${this._cambiarCantidadGastoActual}" type="number" id="cantidadGasto" placeholder="$000" value="${this.cantidadGastoActual}">
                    </form>
                    <button @click=${this._modificarGasto} id="botonEnviarFormulario">Enviar</button>
                </div>
                
            </div>
        `
    }

    _cambiarTituloGastoActual(e){
        this.tituloGastoActual = e.target.value;
    }
    _cambiarDescripcionGastoActual(e){
        this.descripcionGastoActual = e.target.value;
    }
    _cambiarCantidadGastoActual(e){
        this.cantidadGastoActual = e.target.value;
    }
    
    _modificarGasto(){
        
        let dataModificar = {
            nuevoTituloGasto: this.tituloGastoActual,
            nuevoDescripciónGasto: this.descripcionGastoActual,
            nuevoCantidadGasto: this.cantidadGastoActual,
            idAModificar: this.id
        }
        
        this.dispatchEvent( new CustomEvent('ModificarDatosGasto', {
            detail: {data: dataModificar},
            bubbles: true,
            composed:true
        }));
        
        this._quitarComponente();
    }

    _quitarComponente(){
        let OverArticle = document.getElementById('OverArticle');

        setTimeout(() => {
                OverArticle.innerHTML = ``;
        }, 300);

    }
}
customElements.define('modificar-gasto', ModificarGastoComponent);