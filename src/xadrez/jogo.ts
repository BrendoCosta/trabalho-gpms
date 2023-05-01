import { Quadrante, Tabuleiro, Posicao, Desenhavel } from ".";


export class Jogo extends HTMLElement implements Desenhavel {

    private _tabuleiro: Tabuleiro = new Tabuleiro();

    private _shadowRoot: ShadowRoot;
    private _canvas: HTMLCanvasElement;
    private _executando: boolean = false;
    public get canvas() { return this._canvas }
    private _taxaDeQuadros: number = 12;
    private static _isometrico: boolean = false;
    public static get isometrico() { return this._isometrico }
    public static set isometrico(opcao: boolean) { this._isometrico = opcao; }
    
    constructor() {

        super();

        // Inicialização do canvas

        this._canvas = document.createElement("canvas");
        this._canvas.width = 800;
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

            this._executando = true;
            setInterval(() => this.desenhar(ctx), (1000 / this._taxaDeQuadros));

        }

    }

    public eventoClick(ev: MouseEvent): void {

        let ctx: CanvasRenderingContext2D | null = this._canvas.getContext("2d");

        if (ctx != null) {

            let largura: number = Quadrante.getLarguraDesenho(ctx);
            let x: number = ev.clientX - this._canvas.getBoundingClientRect().left;
            let y: number = ev.clientY - this._canvas.getBoundingClientRect().top;

            let pos: Posicao = { linha: 0, coluna: 0 };

            if (Jogo.isometrico) {

                // Compensa o offset definido em Tabuleiro.desenhar()

                let offsetX: number = x - (x - (this._canvas.width / 2));
                let offsetY: number = (y - (y - (this._canvas.height / 2))) / 2;
                
                // https://clintbellanger.net/articles/isometric_math/

                let posX: number = (( (x - offsetX) / (largura/2) + (y - offsetY) / (largura/4)) / 2) | 0;
                let posY: number = (((y - offsetY) / (largura/4) - ( (x - offsetX) / (largura/2))) / 2) | 0;

                pos.linha = posY;
                pos.coluna = posX;

            } else {

                pos.linha = (y / largura) | 0;
                pos.coluna = (x / largura) | 0;

            }

            console.log(`${pos.coluna}, ${pos.linha}`)

            this._tabuleiro.click(pos);

        }

    }

    public desenhar(ctx: CanvasRenderingContext2D | null): void {

        if (this._executando) {

            ctx?.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            // Chama o método de desenho das classes filhas

            if (ctx != null) {

                this._tabuleiro.desenhar(ctx);

            }

        }

    }

}