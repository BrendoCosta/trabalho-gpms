import { Peca } from ".";
import { Cor, Jogador, Posicao, verificarPosicao, Imagem } from "..";

export class Torre extends Peca {

    protected imagem: HTMLImageElement = Imagem.getInstancia().TORRE;

    constructor(cor: Cor, jogador: Jogador){
        super(cor,jogador);
    }


    possiveisMovimento(posicao: Posicao): Posicao[] {
        let movimentosPossiveis: Posicao[] = [];


        return movimentosPossiveis;
    }

}
    

