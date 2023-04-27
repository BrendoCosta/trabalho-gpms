import { Quadrante, Tabuleiro, Posicao, Desenhavel } from ".";

export class Jogo extends HTMLElement implements Desenhavel {

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

        // Adiciona os eventos de interação com o jogo

        this.addEventListener("click", this.eventoClick);

        // Desenha a cor de fundo
        
        if (ctx != null) {

            ctx.fillStyle = "lightgray";
            ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);

        }

        // Será renderizado a parte e o canvas será o elemento filho imediato

        this._shadowRoot = this.attachShadow({ mode: "open" });
        this._shadowRoot.appendChild(this._canvas);

        // Chama o método de desenho

        if (ctx != null) {

            this.desenhar(ctx);

        }
    
    }

    public eventoClick(ev: MouseEvent): void {

        let x: number = ev.clientX - this._canvas.getBoundingClientRect().left;
        let y: number = ev.clientY - this._canvas.getBoundingClientRect().top;

        let ctx: CanvasRenderingContext2D | null = this._canvas.getContext("2d");

        if (ctx != null) {

            let pos: Posicao = {

                linha: (y / Quadrante.getLarguraDesenho(ctx)) | 0,
                coluna: (x / Quadrante.getLarguraDesenho(ctx)) | 0

            };

            this._tabuleiro.click(pos);
            console.log(pos);

        }

        /* O método de desenho está sendo chamado
         * a cada clique, mas poderia ser chamado em
         * intervalos de tempo (frames) */

        this.desenhar(this._canvas.getContext("2d"));

    }

    public desenhar(ctx: CanvasRenderingContext2D | null): void {

        // Chama o método de desenho das classes filhas

        if (ctx != null) {

            this._tabuleiro.desenhar(ctx);

        }

    }

}