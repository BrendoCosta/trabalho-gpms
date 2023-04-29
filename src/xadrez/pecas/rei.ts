import { Peca } from ".";
import { Cor, Jogador, Posicao, verificarPosicao, Imagem } from "..";

export class Rei extends Peca {

    protected imagem: HTMLImageElement = Imagem.getInstancia().REI;

    constructor(cor: Cor, jogador: Jogador){
        super(cor,jogador);
    }



    
}
    

