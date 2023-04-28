import { Peca } from ".";
import { Cor, Jogador, Posicao, verificarPosicao, Imagem } from "..";

export class Cavalo extends Peca {

    protected imagem: HTMLImageElement = Imagem.getInstancia().CAVALO;

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
    

