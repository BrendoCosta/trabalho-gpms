import { TemplateSettings } from "lodash";
import { Quadrante, Tabuleiro, Posicao, Desenhavel } from ".";
import { InteligenciaArtificial } from "./IA/intengenciaArtificial";


interface ScreenConfig {
    screenSize: number,
    x: number,
    y: number,
}
export class Jogo extends HTMLElement implements Desenhavel {

    private _tabuleiro: Tabuleiro = new Tabuleiro();

    private _shadowRoot: ShadowRoot;
    private _canvas: HTMLCanvasElement;
    private _executando: boolean = false;
    private dificuldadeIA: number=2
    public get canvas() { return this._canvas }
    private _taxaDeQuadros: number = 12;
    private static _isometrico: boolean = false;
    public static get isometrico() { return this._isometrico }
    public static set isometrico(opcao: boolean) { this._isometrico = opcao; }

    private static _iaActive: boolean = true;
    public static get ia_active() { return this._iaActive }
    public static set ia_active(opcao: boolean) { this._iaActive = opcao; }

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

    private iaTurno(): void {
        console.log("IA VAI JOGAAAAAAAAAAAAAAAAAAR")
        let posicoes = InteligenciaArtificial(this._tabuleiro,this.dificuldadeIA)
        if(posicoes[0]!= null&&posicoes[1]!==null){
            this._tabuleiro.click(posicoes[0]);
            this._tabuleiro.click(posicoes[1]);
        }
        console.log("a posicao[0] é!!")
        console.log(posicoes[0])
    }

    private isometricView(screenConfig: ScreenConfig, pos: Posicao): Posicao {
        // Compensa o offset definido em Tabuleiro.desenhar()

        let offsetX: number = screenConfig.x - (screenConfig.x - (this._canvas.width / 2));
        let offsetY: number = (screenConfig.y - (screenConfig.y - (this._canvas.height / 2))) / 2;

        // https://clintbellanger.net/articles/isometric_math/

        let posX: number = (( (screenConfig.x - offsetX) / (screenConfig.screenSize/2) + (screenConfig.y - offsetY) / (screenConfig.screenSize/4)) / 2) | 0;
        let posY: number = (((screenConfig.y - offsetY) / (screenConfig.screenSize/4) - ( (screenConfig.x - offsetX) / (screenConfig.screenSize/2))) / 2) | 0;

        pos.linha = posY;
        pos.coluna = posX;
        return pos
    }

    private getScreenConfig(ctx: CanvasRenderingContext2D, ev: MouseEvent): ScreenConfig{
        return {
            screenSize: Quadrante.getLarguraDesenho(ctx),
            x: ev.clientX - this._canvas.getBoundingClientRect().left,
            y: ev.clientY - this._canvas.getBoundingClientRect().top,
        }
    }

    public eventoClick(ev: MouseEvent): void {

        let ctx: CanvasRenderingContext2D | null = this._canvas.getContext("2d");

        if (ctx != null) {
            let screenConfig = this.getScreenConfig(ctx, ev)

            let pos: Posicao = { linha: 0, coluna: 0 };

            if (Jogo.isometrico) {
                pos = this.isometricView(screenConfig, pos)
            } else {
                pos.linha = (screenConfig.y / screenConfig.screenSize) | 0;
                pos.coluna = (screenConfig.x / screenConfig.screenSize) | 0;
            }

            console.log(`${pos.coluna}, ${pos.linha}`)
            let turno = this._tabuleiro.getTurno();
            this._tabuleiro.click(pos);
            
            if(turno!=this._tabuleiro.getTurno() && Jogo.ia_active){
                this.iaTurno()
            }

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