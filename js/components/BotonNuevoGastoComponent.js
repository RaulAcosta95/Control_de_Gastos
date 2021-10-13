import { LitElement, html } from 'https://unpkg.com/lit-element?module';

export class BotonNuevoGastoComponent extends LitElement{
    constructor(){
        super();
    }
    static get Properties(){
        return {

        }
    }

    connectedCallback( funcion){
        super.connectedCallback();
        console.log('Connected Callback BotonNuevoGastoComponent');
    }
    disconnectedCallback(){
        super.disconnectedCallback();
        console.log('Disconnected Callback BotonNuevoGastoComponent');
    }

    render(){
        return html `

            <style>
                #BotonNuevoGastoComponent{
                    margin-top:20px;
                    width:100vw;
                    display:flex;
                    justify-content:center;
                }
                #BotonNuevoGastoComponent button{
                    width:80vw;
                    height:50px;
                    font-size:22px;
                    font-family: monospace;
                    font-weight:bold;

                    background-color: rgb(37, 182, 117);
                    color: rgb(246, 252, 248);

                    border-radius: 20px 20px 20px 20px;
                    -moz-border-radius: 20px 20px 20px 20px;
                    -webkit-border-radius: 20px 20px 20px 20px;
                    border: 0px solid #000000;

                    -webkit-box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.75);
                    -moz-box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.75);
                    box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.75);

                }
                #BotonNuevoGastoComponent button:hover{
                    border: 2px double #000;
                }
                #BotonNuevoGastoComponent button:active{
                    background-color: rgb(33, 216, 134);
                    transition: 0.1s;
                }
            </style>

            <div id="BotonNuevoGastoComponent">
                <button @click=${this._mostrarComponenteAñadirNuevoGastoComponent}>Nuevo Gasto</button>
            </div>
        `
    }

    _mostrarComponenteAñadirNuevoGastoComponent(){
        let OverArticle = document.getElementById('OverArticle');
        setTimeout(() => {            
            if (OverArticle.hasChildNodes()){
                OverArticle.innerHTML = ``;
            }else {
                OverArticle.innerHTML = `
                    <añadir-nuevo-gasto></añadir-nuevo-gasto>
                `;
            }
        }, 500);
    }
}
customElements.define('boton-nuevo-gasto', BotonNuevoGastoComponent);