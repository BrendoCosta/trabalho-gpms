import { Peca } from ".";
import { Cor, Jogador, Posicao, verificarPosicao, Imagem, Quadrante } from "..";

export class Peao extends Peca {

    protected imagem: HTMLImageElement = Imagem.getInstancia().PEAO;

    constructor(cor: Cor, jogador: Jogador) {
        super(cor, jogador);
    }




}


