import { Peca } from "./pecasXadrez/peca";
import { Quadrante } from "./quadrante"
import { Cor } from "./enums";
export class Tabuleiro {
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


}