import { Peca } from "./pecas";
import { Cor } from "./";
import { Desenhavel } from "./";

export class Quadrante implements Desenhavel {
    private linha: number;
    private coluna: number;
    private cor: Cor
    private peca: Peca | null;

    constructor(linha: number, coluna: number, cor: Cor, peca: Peca | null) {
        this.linha = linha;
        this.coluna = coluna;
        this.peca = peca;
        this.cor = cor;
    }

    public getPeca(): Peca|null {
       return this.peca;
    }

    public setPeca(peca: Peca): void {
        this.peca = peca;
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
       // console.log(this.getPeca());
        let peca = this.peca;
        this.cor = Cor.VERDE;

    }

    public static getLarguraDesenho(ctx: CanvasRenderingContext2D) {

        return Math.round(ctx.canvas.width / 8);

    }

}