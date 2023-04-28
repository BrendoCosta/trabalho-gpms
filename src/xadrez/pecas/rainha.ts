import { Peca } from ".";
import { Cor, Jogador, Posicao, verificarPosicao, Imagem } from "..";

export class Rainha extends Peca {

    protected imagem: HTMLImageElement = Imagem.getInstancia().RAINHA;

    constructor(cor: Cor, jogador: Jogador){
        super(cor,jogador);
    }


    possiveisMovimento(posicao: Posicao): Posicao[] {
        let movimentosPossiveis: Posicao[] = [];


        return movimentosPossiveis;
    }

}
    

