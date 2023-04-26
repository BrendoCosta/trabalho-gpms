import { Peca } from "./peca";
import { Cor } from "../enums";

export class Bispo implements Peca {
    cor: Cor;
    constructor(cor: Cor) {
        this.cor = cor;
        
      }

      possiveisMovimento(coluna: number, linha: number): [number, number][] {
        let movimentosPossiveis: [number, number][] = [];

        return movimentosPossiveis;
      }
}
    

