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
        console.log('Connected Callback GastoEnListaComponent');
    }
    disconnectedCallback(){
        super.disconnectedCallback();
        console.log('Disconnected Callback GastoEnListaComponent');
    }

    render(){
        return html `
            <style>
                .gastoEnListaComponent *{
                    margin:0;
                    padding:0;
                    transition:0.5s;
                }
                .gastoEnListaComponent{
                    background-color: rgb(131, 204, 253);

                    width: 90vw;

                    margin-top: 20px;
                    margin-bottom: 20px;

                    font-family: sans-serif;

                    cursor:help;

                    border-radius: 10px 10px 10px 10px;
                    -moz-border-radius: 10px 10px 10px 10px;
                    -webkit-border-radius: 10px 10px 10px 10px;
                    border: 0px solid #000000;

                    -webkit-box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.75);
                    -moz-box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.75);
                    box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.75);

                    display: flex;
                    align-items: center;
                }
                .gastoEnListaComponent:active{
                    background-color: rgb(185, 222, 247);
                }
                .gastoEnListaComponent .contenedorInfo{
                    width: 80%;
                }
                .gastoEnListaComponent .contenedorInfo *{
                    margin:10px;
                }
                .gastoEnListaComponent .contenedorBoton{
                    width: 20%;
                    height: 100%;
                    display: flex;
                    justify-content:flex-end;
                    align-items:center;
                }
                .gastoEnListaComponent button{
                    background-color:rgba(172, 128, 128,.0);
                    margin: 10px;
                    border:none;
                    cursor:pointer;
                    width:25px;
                }
                .gastoEnListaComponent button img{
                    width:25px;
                }
            </style>
            <div class="gastoEnListaComponent">
                <div @click=${this._mostrarComponenteVerDetalleGasto} class="contenedorInfo">
                    <h3>${this.tituloGastoActual} </h3>
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
        console.log('Eliminando gasto ' +this.id);
        this._añadeEfectoBorrar()
        this.dispatchEvent( new CustomEvent('EliminarDatosGasto', {
            detail: {data: this.id},
            bubbles: true,
            composed:true
        }));
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