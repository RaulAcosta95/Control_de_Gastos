import { LitElement, html } from 'https://unpkg.com/lit-element?module';
export class AniadirNuevoGastoComponent extends LitElement{
    constructor(){
        super();
    }

    static get Properties(){
        return {
            tituloGastoActual: {type: String},
            descripcionGastoActual: {type: String},
            cantidadGastoActual: {type: String}
        }
    }

    connectedCallback(){
        super.connectedCallback();
        // console.log('Connected Callback AniadirNuevoGastoComponent');
    }
    disconnectedCallback(){
        super.disconnectedCallback();
        // console.log('Disconnected Callback AniadirNuevoGastoComponent');
    }

    render(){
        return html `
            <link rel="stylesheet" href="./css/AniadirNuevoGasto.css">
            <div id="AñadirNuevoGastoComponent">
                <button @click=${this._quitarComponenteAñadirNuevoGastoComponent} id="buttonX">X</button>
                <h3>GASTO</h3>
                <div id="formAñadirNuevoGasto">
                    <form action="" id="formDatosNuevoGasto">
                        <label for="tituloGasto">TÍTULO</label>
                        <input  @change="${this._cambiarTituloGastoActual}" type="text" id="tituloGasto" placeholder="Título del gasto">
                        <label for="descripcionGasto">DESCRIPCIÓN</label>
                        <input  @change="${this._cambiarDescripcionGastoActual}" type="text" id="descripcionGasto" placeholder="Descripción del gasto">
                        <label for="cantidadGasto">CANTIDAD</label>
                        <input  @change="${this._cambiarCantidadGastoActual}" type="number" id="cantidadGasto" placeholder="$000">
                    </form>
                    <button @click=${this._añadirNuevoGasto} id="botonEnviarFormulario">Enviar</button>
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

    _añadirNuevoGasto(){
        if(this.cantidadGastoActual == null){
            alert("Por favor, añade una cantidad");
            return false;
        }

        if (this.tituloGastoActual == null) {
            this.tituloGastoActual = "Titulo Gasto";
        }

        if (this.descripcionGastoActual == null) {
            this.descripcionGastoActual = this.tituloGastoActual;
        }

        let data = {
            tituloGastoActual: this.tituloGastoActual,
            descripcionGastoActual: this.descripcionGastoActual,
            cantidadGastoActual: this.cantidadGastoActual,
            id: Math.floor((Math.random() * (100000 - 0 + 1)) + 0)
        };

        this.dispatchEvent( new CustomEvent('EnvioDatosNuevoGasto', {
            detail: {data: data},
            bubbles: true,
            composed:true
        }));

        this._quitarComponenteAñadirNuevoGastoComponent();

    }
    
    _quitarComponenteAñadirNuevoGastoComponent(){
        let OverArticle = document.getElementById('OverArticle');

        setTimeout(() => {
                OverArticle.innerHTML = ``;
        }, 300);

    }

}
customElements.define('añadir-nuevo-gasto', AniadirNuevoGastoComponent);