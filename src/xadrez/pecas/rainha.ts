import { Peca } from ".";
import { Cor, Jogador, Posicao, verificarPosicao } from "..";

export class Rainha extends Peca {

    constructor(cor: Cor, jogador: Jogador){
        super(cor,jogador);
    }

    possiveisMovimento(posicao : Posicao):Posicao[]  {
        let movimentosPossiveis: Posicao[]=[];

        return movimentosPossiveis;
    }


    public override desenhar(ctx: CanvasRenderingContext2D) {

        // Todo

    }

}
    

