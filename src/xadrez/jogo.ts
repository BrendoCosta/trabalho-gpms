import { TemplateSettings } from "lodash";
import { Quadrante, Tabuleiro, Posicao, Desenhavel } from ".";
import { InteligenciaArtificial } from "./IA/intengenciaArtificial";
import { Peca } from "./pecas";
import { EventHandler } from "../componentes";
import { Cor, Jogador } from "./enums";

interface ScreenConfig {
    screenSize: number,
    x: number,
    y: number,
}
export class Jogo implements Desenhavel {

    private _tabuleiro: Tabuleiro;
    public get Tabuleiro(): Tabuleiro { return this._tabuleiro; }
    public OnPecaCap: EventHandler<Peca> = new EventHandler<Peca>();
    public OnVitoria: EventHandler<Jogador> = new EventHandler<Jogador>();
    public OnEmpate: EventHandler<void> = new EventHandler<void>();

    private _canvas: HTMLCanvasElement;
    private _executando: boolean = false;
    private dificuldadeIA: number = 2
    public get canvas() { return this._canvas }
    private _taxaDeQuadros: number = 12;

    private static _delay_ia: number = 2000;
    public static get delayIa() { return this._delay_ia }
    public static set delayIa(valor: number) { this._delay_ia = valor; }

    private static _isometrico: boolean = false;
    public static get isometrico() { return this._isometrico }
    public static set isometrico(opcao: boolean) { this._isometrico = opcao; }

    private static _iaActive: boolean = true;
    public static get ia_active() { return this._iaActive }
    public static set ia_active(opcao: boolean) { this._iaActive = opcao; }

    constructor(canvas: HTMLCanvasElement, corJogador: Cor) {

        // Inicialização do tabuleiro

        this._tabuleiro = new Tabuleiro(corJogador);

        // Inicialização do canvas

        this._canvas = canvas;

        let ctx: CanvasRenderingContext2D | null = this._canvas.getContext("2d");

        // Chama o método de desenho

        if (ctx != null) {

            this._executando = true;
            setInterval(() => this.desenhar(ctx), (1000 / this._taxaDeQuadros));

        }

    }

    public novoJogo(corJogador: Cor) {

        this._tabuleiro = new Tabuleiro(corJogador);
        if (corJogador == Cor.PRETO && Jogo.ia_active) {
             this.iaTurno();
        }
    }

    private async iaTurno(): Promise<void> {

        await new Promise(resolve => setTimeout(resolve, Jogo.delayIa));

        //console.log("IA VAI JOGAAAAAAAAAAAAAAAAAAR")

        let posicoes = InteligenciaArtificial(this._tabuleiro, this.dificuldadeIA)
        if (posicoes[0] != null && posicoes[1] !== null) {
            this._tabuleiro.click(posicoes[0]);
            this._tabuleiro.click(posicoes[1]);
        }

        //console.log(posicoes[0])

    }

    private isometricView(screenConfig: ScreenConfig, pos: Posicao): Posicao {
        // Compensa o offset definido em Tabuleiro.desenhar()

        let offsetX: number = screenConfig.x - (screenConfig.x - (this._canvas.width / 2));
        let offsetY: number = (screenConfig.y - (screenConfig.y - (this._canvas.height / 2))) / 2;

        // https://clintbellanger.net/articles/isometric_math/

        let posX: number = (((screenConfig.x - offsetX) / (screenConfig.screenSize / 2) + (screenConfig.y - offsetY) / (screenConfig.screenSize / 4)) / 2) | 0;
        let posY: number = (((screenConfig.y - offsetY) / (screenConfig.screenSize / 4) - ((screenConfig.x - offsetX) / (screenConfig.screenSize / 2))) / 2) | 0;

        pos.linha = posY;
        pos.coluna = posX;
        return pos
    }

    private getScreenConfig(ctx: CanvasRenderingContext2D, ev: MouseEvent): ScreenConfig {
        return {
            screenSize: Quadrante.getLarguraDesenho(ctx),
            x: ev.clientX - this._canvas.getBoundingClientRect().left,
            y: ev.clientY - this._canvas.getBoundingClientRect().top,
        }
    }

    public async eventoClick(ev: MouseEvent): Promise<void> {

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

            let pecaCap: Peca | null = null;

            if (this._tabuleiro.click(pos)) {

                pecaCap = this._tabuleiro.getUltimoMovimento().pecaCapturada;

                if (pecaCap) {

                    console.warn(pecaCap)
                    this.OnPecaCap.Invoke(this, pecaCap);

                }

            }

            console.log(this._tabuleiro.getUltimoMovimento());

            if (turno != this._tabuleiro.getTurno() && Jogo.ia_active) {

                await this.iaTurno();
                console.log(this._tabuleiro.getUltimoMovimento());

                pecaCap = this._tabuleiro.getUltimoMovimento().pecaCapturada;

                if (pecaCap) {

                    console.warn(pecaCap);
                    this.OnPecaCap.Invoke(this, pecaCap);

                }

            }

        }
        if (this._tabuleiro.ImpossiveldeMover()) {
            if (this._tabuleiro.getUltimoMovimento().check) {
                this._tabuleiro.passaTurno();
                let vencedor = this._tabuleiro.getTurno();
                console.log("check mate!, " + vencedor + " venceu!");
                this.OnVitoria.Invoke(this, vencedor);
            }
            else {
                console.log("empate!");
                this.OnEmpate.Invoke(this);
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