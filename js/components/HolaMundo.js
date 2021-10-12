import { LitElement, html } from 'https://unpkg.com/lit-element?module';
export class HolaMundo extends LitElement {
    static get properties(){
        return{
            quien: {type:String}
        }
    }
    constructor(){
        super();
        this.quien = "Mundo"
    }
    render(){
        console.log(this.quien);
        return html`
    <style>
        h1{
            border: white 5px outset;
                background-color: rgb(227, 228, 228);
            display: flex;
            align-items: center;
            justify-content: center;
            margin:0;
            padding:0;
            width:200px;
        }
    </style>
        <h1 title="Componente que muestra un título según el atributo 'quien'">Hola ${this.quien}</h1>
        `
    }
    
}
customElements.define('hola-mundo', HolaMundo);