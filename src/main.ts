import { Jogo } from "./xadrez";

// Define a classe Jogo como um elemento HTML <jogo-xadrez>

window.customElements.define("jogo-xadrez", Jogo);

// Cria uma instância da classe Jogo e a insere na página

let jogo = document.createElement("jogo-xadrez");
document.body.appendChild(jogo);

// Configuração do jogo

let opcao_isometrico: HTMLInputElement = document.getElementsByName("opcao_isometrico")[0] as HTMLInputElement;
opcao_isometrico.addEventListener("change", (event) => {
    
    if (event != null) {

        if ((event.currentTarget as HTMLInputElement).checked) {

            Jogo.isometrico = true;

        } else {

            Jogo.isometrico = false;

        }

    }
    
});