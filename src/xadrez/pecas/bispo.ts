import { Peca } from ".";
import { Cor, Jogador, Posicao, verificarPosicao, Imagem } from "..";

export class Bispo extends Peca {

    protected imagem: HTMLImageElement = Imagem.getInstancia().BISPO;

    constructor(cor: Cor, jogador: Jogador){
        super(cor,jogador);
    }
    


}
    

