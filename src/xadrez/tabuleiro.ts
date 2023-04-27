import { Peca } from "./peca";
import { Cor, Quadrante } from "./";
import { Desenhavel } from "./";
export class Tabuleiro implements Desenhavel {
    private quadrantes: Quadrante[][];

    constructor() {
        this.quadrantes = [];
        for (let i = 0; i < 8; i++) {
          this.quadrantes[i] = [];
          for (let j = 0; j < 8; j++) {
            const cor = (i + j) % 2 === 0 ? Cor.BRANCO : Cor.PRETO;
            const quadrante = new Quadrante(i, j, cor,null);
            this.quadrantes[i][j] = quadrante;
          }
        }
      }
    //metodo responsavel por colocar uma peca em um quadrante especifico
    public setPeca(linha: number, coluna: number, peca: Peca) : void {
        if (linha < 0 ||linha > 7 ||coluna < 0 || coluna > 7) {
            throw new Error("Posição fora do tabuleiro");
        }
        this.quadrantes[linha][coluna].peca = peca
    }

    //metodo responsavel por retornar a peça de um quadrante caso haja um, se não houver retorna null
    public getPeca(linha: number, coluna: number) {
        if (linha < 0 ||linha > 7 ||coluna < 0 || coluna > 7) {
            throw new Error("Posição fora do tabuleiro");
        }

        return this.quadrantes[linha][coluna].peca;
    }

    public desenhar(ctx: CanvasRenderingContext2D): void {

        let origemX: number = 0;
        let origemY: number = 0;
        let largura = Quadrante.getLarguraDesenho(ctx);

        for (let i = 0; i < 8; i++) {

            for (let j = 0; j < 8; j++) {

                // Move o ponto de origem da renderização
                
                ctx.translate(origemX + largura * i, origemY + largura * j);

                // Renderiza o quadrante no ponto
                
                this.quadrantes[i][j].desenhar(ctx);

                // Move o ponto e origem de volta a (0, 0)

                ctx.resetTransform();

            }

        }
        
    }

}