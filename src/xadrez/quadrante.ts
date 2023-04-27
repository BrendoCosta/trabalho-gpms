import { Peca } from "./pecasXadrez/peca";
import { Cor } from "./enums";

export class Quadrante {
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
}