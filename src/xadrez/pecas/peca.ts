import { Cor, Desenhavel,Jogador, Posicao, Quadrante } from "..";

export abstract class Peca implements Desenhavel {
    private cor: Cor;
    private jogador: Jogador;
    protected abstract imagem: HTMLImageElement;
    constructor(cor: Cor, jogador: Jogador) { this.cor = cor ; this.jogador = jogador }

    public getCor():Cor{
        return this.cor;
    }
    public getjogador():Jogador{
        return this.jogador;
    }

    public abstract possiveisMovimento(posicao:Posicao): Posicao[];

    public desenhar(ctx: CanvasRenderingContext2D): void {

        let larguraQuadrante: number = Quadrante.getLarguraDesenho(ctx);
        let escala: number = Math.min(larguraQuadrante / this.imagem.width, larguraQuadrante / this.imagem.height) * 0.5;
        let larguraImagem: number = this.imagem.width * escala;
        let alturaImagem: number = this.imagem.height * escala;

        /* Se a peça for branca, é preciso inverter
         * a cor dos pixels da imagem. Isso funciona pois nas
         * imagens a serem utilizadas, a cor da peça é preta.
        */

        let filtroNormal: string = ctx.filter;
        
        if (this.cor == Cor.BRANCO) {

            ctx.filter = "invert(1)";

        }

        // Desenha a imagem da peça de forma centralizada no quadrante
        
        ctx.drawImage(this.imagem, (larguraQuadrante - larguraImagem) / 2, (larguraQuadrante - alturaImagem) / 2, larguraImagem, alturaImagem);

        // Restaura o filtro de inversão de cor para o estado anterior

        ctx.filter = filtroNormal;

    }
}