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
            <style>

                #modificaGastoComponent{
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
                #modificaGastoComponent h3{
                    font-size:40px;
                    margin-bottom:0;
                    color:rgb(31, 31, 31);
                }
                #modificaGastoComponent #buttonX{
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
                #modificaGastoComponent #buttonX:active{
                    -webkit-box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.75);
                    -moz-box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.75);
                    box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.75);
                    transition:0.1s;
                }

                #formModificaGasto{
                    display:flex;
                    justify-content:center;
                    flex-wrap:wrap;
                }
                #formModificaGasto label, #formModificaGasto input{
                    display:block;
                    width:80vw;
                    margin-top:30px;
                    text-align:center;
                }
                #formModificaGasto label{
                    color: rgb(246, 252, 248);
                    font-size:20px;

                }
                #formModificaGasto input{
                    height:30px;
                    border-radius: 20px 20px 20px 20px;
                    -moz-border-radius: 20px 20px 20px 20px;
                    -webkit-border-radius: 20px 20px 20px 20px;
                    border: 0px solid #000000;
                }
                #botonEnviarFormulario{
                    margin-top:40px;

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
                    #modificaGastoComponent #buttonX{
                        position:absolute;
                        right:30px;
                    }
                }                    
            </style>
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