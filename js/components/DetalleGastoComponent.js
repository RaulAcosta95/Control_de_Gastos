import { LitElement, html } from 'https://unpkg.com/lit-element?module';
export class DetalleGastoComponent extends LitElement{

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
        return html`
            <link rel="stylesheet" href="./css/DetalleGasto.css">
            <div id="DetalleGastoComponent">
                <button @click=${this._quitarComponenteDetalleGastoComponent} id="buttonX">X</button>
                    <h3>GASTO</h3>
                    <h4>TÍTULO</h4>
                    <p>${this.tituloGastoActual}</p>
                    <h4>DESCRIPCIÓN</h4>
                    <p>${this.descripcionGastoActual}</p>
                    <h4>CANTIDAD</h4>
                    <p>$${this.cantidadGastoActual}</p>
                <div id="contenedorBoton">
                    <button @click=${this._modificarGasto} id="botonModificarGasto">Modificar</button>
                </div>
        </div>
        `
    }

    _modificarGasto(){
        let OverArticle = document.getElementById('OverArticle');
        setTimeout(() => {            
            OverArticle.innerHTML = ``;
            OverArticle.innerHTML = `
            <modificar-gasto tituloGastoActual="${this.tituloGastoActual}" descripcionGastoActual="${this.descripcionGastoActual}" cantidadGastoActual="${this.cantidadGastoActual}" id="${this.id}"></modificar-gasto>
            `;
        }, 500);
    }

    _quitarComponenteDetalleGastoComponent(){
        let OverArticle = document.getElementById('OverArticle');
        setTimeout(() => {
                OverArticle.innerHTML = ``;
        }, 300);
    }
}
customElements.define('detalle-gasto', DetalleGastoComponent);