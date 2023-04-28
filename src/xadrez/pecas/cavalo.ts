import { Peca } from ".";
import { Cor, Jogador, Posicao, verificarPosicao } from "..";

export class Cavalo extends Peca {

    constructor(cor: Cor, jogador: Jogador){
        super(cor,jogador);
    }

    possiveisMovimento(posicao: Posicao): Posicao[] {
        let movimentosPossiveis: Posicao[] = [];

        return movimentosPossiveis;
    }

    public override desenhar(ctx: CanvasRenderingContext2D) {

        // Todo

    }

}
    

