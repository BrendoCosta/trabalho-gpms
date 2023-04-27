import { Tabuleiro } from ".";

export class Jogo extends HTMLElement {

    private _tabuleiro: Tabuleiro = new Tabuleiro();
    private _shadowRoot: ShadowRoot;
    private _canvas: HTMLCanvasElement;
    public get canvas() { return this._canvas }
    
    constructor() {
        
        super();

        // Inicialização do canvas

        this._canvas = document.createElement("canvas");
        this._canvas.width  = 800;
        this._canvas.height = 800;
        
        let ctx: CanvasRenderingContext2D | null = this._canvas.getContext("2d");

        // Desenha a cor de fundo
        
        if (ctx != null) {

            ctx.fillStyle = "lightgray";
            ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);

        }

        // Será renderizado a parte e o canvas será o elemento filho imediato

        this._shadowRoot = this.attachShadow({ mode: "open" });
        this._shadowRoot.appendChild(this._canvas);

        // Chama o método de desenho das classes filhas

        if (ctx != null) {

            this._tabuleiro.desenhar(ctx);

        }
    
    }

}