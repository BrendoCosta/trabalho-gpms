import { Peca } from ".";
import { Cor, Jogador, verificarPosicao } from "..";

export class Cavalo extends Peca {

    constructor(cor: Cor, jogador: Jogador){
        super(cor,jogador);
    }

    possiveisMovimento(posicao: [number,number]): [number, number][] {
        let movimentosPossiveis: [number, number][] = [];

        return movimentosPossiveis;
    }

    public override desenhar(ctx: CanvasRenderingContext2D) {

        // Todo

    }

}
    

