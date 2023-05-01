import { Peca } from "./pecas";
import { Cor } from "./enums";
import { Desenhavel, Jogo } from "./";

export class Quadrante implements Desenhavel {
    private linha: number;
    private coluna: number;
    private cor: Cor;
    private corSelecionado: Cor = Cor.VERDE;
    private peca: Peca | null;
    private selecionado: boolean = false;

    constructor(linha: number, coluna: number, cor: Cor, peca: Peca | null) {
        this.linha = linha;
        this.coluna = coluna;
        this.peca = peca;
        this.cor = cor;
    }

    public getPeca(): Peca | null {
        return this.peca;
    }

    public setPeca(peca: Peca): void {
        this.peca = peca;
    }

    public desenhar(ctx: CanvasRenderingContext2D) {

        // Renderiza o quadrante

        let largura = Quadrante.getLarguraDesenho(ctx);
        ctx.fillStyle = this.cor;

        if (Jogo.isometrico) {

            ctx.fill();

        } else {

            ctx.fillRect(0, 0, largura, largura);

        }

        if (this.selecionado) {

            let espessura: number = Jogo.isometrico ? 5 : 10;
            let offset: number = espessura / 2;
            ctx.lineWidth = espessura;
            ctx.strokeStyle = this.corSelecionado;
            ctx.globalAlpha = 0.8;

            if (Jogo.isometrico) {

                ctx.fillStyle = this.corSelecionado;
                Desenho.desenharLosango(ctx,
                    0 + ctx.lineWidth - 2 * offset,
                    0 + offset,
                    (largura - ctx.lineWidth - 2 * offset),
                    (largura - ctx.lineWidth - 2 * offset)/2
                );
                ctx.stroke();

            } else {

                ctx.strokeRect(0 + ctx.lineWidth - offset, 0 + offset, largura - 2 * offset, largura - 2 * offset);

            }

            ctx.globalAlpha = 1;

        }

        // Renderiza a peça, se houver

        this.peca?.desenhar(ctx);

    }
    public selecionar(): void {
        this.selecionado == true ? this.selecionado = false : this.selecionado = true;
        this.corSelecionado = Cor.VERDE;
    }
    public selecionarComCor(cor: Cor): void {
        // console.log(this.getPeca());
        let peca = this.peca;
        this.corSelecionado = cor;
        this.selecionado = true;

    }


    public static getLarguraDesenho(ctx: CanvasRenderingContext2D) {

        return Math.round(ctx.canvas.width * (10/100));

    }
    public removerPeca(): void {
        this.peca = null
    }

}