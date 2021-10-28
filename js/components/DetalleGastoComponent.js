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
        console.log('Connected Callback DetalleGastoComponent');
    }
    disconnectedCallback(){
        super.disconnectedCallback();
        console.log('Disconnected Callback DetalleGastoComponent');
    }

    render(){
        return html`
            <style>
                #DetalleGastoComponent{
                    position:fixed;
                    z-index: 99;

                    height: 100vh;
                    width: 100vw;

                    background-color: rgb(1, 113, 189);

                    top: 0;
                    left: 0;

                    font-family:monospace;
                    font-weight:bold;
                    text-align:center;
                }
                #DetalleGastoComponent *{
                    margin:0;
                    padding:0;
                }
                #DetalleGastoComponent h3{
                    font-size:40px;
                    margin-top:20px;
                    margin-bottom:20px;
                    color:rgb(31, 31, 31);
                }
                #DetalleGastoComponent h4{
                    color: rgb(246, 252, 248);
                    font-size:20px;
                    margin-bottom:20px;
                }
                #DetalleGastoComponent p{
                    font-size:15px;
                    margin-bottom:20px;
                    padding-top:10px;
                    padding-bottom:10px;
                    background-color: rgb(131, 204, 253);

                }
                #DetalleGastoComponent #buttonX{
                    position:absolute;
                    right:10px;
                    top:10px;
                    height:30px;
                    width:30px;

                    cursor:pointer;

                    -webkit-box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.75);
                    -moz-box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.75);
                    box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.75);
                }
                #DetalleGastoComponent #buttonX:active{
                    -webkit-box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.75);
                    -moz-box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.75);
                    box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.75);
                    transition:0.1s;
                }
                #contenedorBoton{
                    position:absolute;
                    bottom:40px;
                    width:100vw;
                    display:flex;
                    justify-content:center;
                    flex-wrap:wrap;
                }
                #botonModificarGasto{
                    width:80vw;
                    height:50px;
                    font-size:22px;
                    font-family: monospace;
                    font-weight:bold;

                    cursor:pointer;

                    background-color: rgb(37, 182, 117);
                    color: rgb(246, 252, 248);

                    -webkit-box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.75);
                    -moz-box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.75);
                    box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.75);
                }
                @media screen and (min-width: 768px){
                    #DetalleGastoComponent #buttonX{
                        position:absolute;
                        right:30px;
                    }
                } 
            </style>
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

    _quitarComponenteDetalleGastoComponent(){
        let OverArticle = document.getElementById('OverArticle');
        setTimeout(() => {
                OverArticle.innerHTML = ``;
        }, 300);
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
}
customElements.define('detalle-gasto', DetalleGastoComponent);