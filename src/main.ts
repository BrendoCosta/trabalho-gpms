import { Jogo } from "./xadrez";

// Define a classe Jogo como um elemento HTML <jogo-xadrez>

window.customElements.define("jogo-xadrez", Jogo);

// Cria uma instância da classe Jogo e a insere na página

let jogo = document.createElement("jogo-xadrez");
document.body.appendChild(jogo);