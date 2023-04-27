import { Peca } from "./peca";
import { Cor } from "./";
import { Desenhavel } from "./";

export class Quadrante implements Desenhavel {
    public linha: number;
    public coluna: number;
    public cor: Cor
    public peca: Peca | null;

    constructor(linha: number, coluna: number, cor: Cor, peca: Peca | null) {
        this.linha = linha;
        this.coluna = coluna;
        this.peca = peca;
        this.cor = cor;
    }

    public desenhar(ctx: CanvasRenderingContext2D) {

        // Renderiza o quadrante
        
        let largura = Quadrante.getLarguraDesenho(ctx);
        ctx.fillStyle = this.cor.toString();
        ctx.fillRect(0, 0, largura, largura);

        // Renderiza a peça, se houver

        this.peca?.desenhar(ctx);

    }

    public selecionar(): void {

        this.cor = Cor.VERDE;

    }

    public static getLarguraDesenho(ctx: CanvasRenderingContext2D) {

        return Math.round(ctx.canvas.width / 8);

    }

}