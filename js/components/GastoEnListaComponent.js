import { LitElement, html } from 'https://unpkg.com/lit-element?module';

export class GastoEnListaComponent extends LitElement{
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
        // console.log('Connected Callback GastoEnListaComponent');
    }
    disconnectedCallback(){
        super.disconnectedCallback();
        // console.log('Disconnected Callback GastoEnListaComponent');
    }

    render(){
        return html `
            <link rel="stylesheet" href="./css/GastoEnLista.css">
            <link rel="stylesheet" href="./css/GastoEnListaDesktop.css">

            <div class="gastoEnListaComponent">
                <div @click=${this._mostrarComponenteVerDetalleGasto} class="contenedorInfo">
                    <h3>${this.tituloGastoActual}</h3>
                    <p>$${this.cantidadGastoActual}</p>
                </div>
                <div class="contenedorBoton">
                    <button @click=${this._eliminarGasto}>
                        <img src="./images/delete.png"alt="Botón borrar" title="Boton borrar">
                    </button>
                </div>
            </div>
        `
    }

    _eliminarGasto(){
        this._añadeEfectoBorrar();

        setTimeout(() => {
            
            this.dispatchEvent( new CustomEvent('EliminarDatosGasto', {
                detail: {data: this.id},
                bubbles: true,
                composed:true
            }));

        }, 500);
    }

    _añadeEfectoBorrar(){
        let gastoEnListaComponent = this.shadowRoot.querySelector('.gastoEnListaComponent');

        this.tituloGastoActual="";
        this.descripcionGastoActual="";
        this.cantidadGastoActual="";

        gastoEnListaComponent.setAttribute("style", `
            width:0px;
            height:20px;
            background-color:rgba(172, 128, 128,.0);
            transition:0.5s;
        `);

    }
    _mostrarComponenteVerDetalleGasto(){
        let OverArticle = document.getElementById('OverArticle');

        //Aparece el componente que muestra el detalle del gasto
        setTimeout(() => {            
            if (OverArticle.hasChildNodes()){
                OverArticle.innerHTML = ``;
            }else {
                OverArticle.innerHTML = `
                <detalle-gasto tituloGastoActual="${this.tituloGastoActual}" descripcionGastoActual="${this.descripcionGastoActual}" cantidadGastoActual="${this.cantidadGastoActual}" id="${this.id}"></detalle-gasto>
                `;
            }
        }, 500);
    }
}
customElements.define('gasto-en-lista', GastoEnListaComponent);