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
            <style>

                #AñadirNuevoGastoComponent{
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
                #AñadirNuevoGastoComponent h3{
                    font-size:40px;
                    margin-bottom:0;
                    color:rgb(31, 31, 31);
                }
                #AñadirNuevoGastoComponent #buttonX{
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
                #AñadirNuevoGastoComponent #buttonX:active{
                    -webkit-box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.75);
                    -moz-box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.75);
                    box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.75);
                    transition:0.1s;
                }

                #formAñadirNuevoGasto{
                        display:flex;
                    justify-content:center;
                    flex-wrap:wrap;
                }
                #formAñadirNuevoGasto label, #formAñadirNuevoGasto input{
                    position:relative;
                    display:block;
                    width:80vw;
                    margin-top:30px;
                    text-align:center;
                }
                #formAñadirNuevoGasto label{
                    color: rgb(246, 252, 248);
                    font-size:20px;

                }
                #formAñadirNuevoGasto input{
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
                    #AñadirNuevoGastoComponent #buttonX{
                        position:absolute;
                        right:30px;
                    }
                } 
            </style>
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