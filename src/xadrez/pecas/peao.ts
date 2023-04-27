import { Peca } from ".";
import { Cor, Jogador, verificarPosicao } from "..";

export class Peao extends Peca {

    constructor(cor: Cor, jogador: Jogador){
        super(cor,jogador);
    }
    
    possiveisMovimento(posicao): [number, number][] {
        const movimentosPossiveis: [number, number][] = [];
        const posicaoAtual:[number,number] = [coluna,linha];
        const direcao = this.jogador == Jogador.JOGADOR ? 1 : -1;
        const posicaoInicial = this.jogador == Jogador.JOGADOR ? 1 : 6;

        // varre as 3 possiveis movimentações do peão, comer pra esquerda andar 1 e comer pra direita
        for (let i = posicaoAtual[0]-1; i < posicaoAtual[0]+1; i++) {
            let posicaoAlvo:[number,number] = [i,posicaoAtual[0]+direcao,]
            verificarPosicao({ posicao: posicaoAlvo }) ? movimentosPossiveis.push(posicaoAlvo):null;
        }
        // varre a movimentação inicial de poder pular 2 casas 
        if(posicaoAtual[0] == posicaoInicial){
            let posicaoAlvo:[number,number] = [posicaoAtual[0],posicaoAtual[1]+2*direcao]
            movimentosPossiveis.push(posicaoAlvo)

        }


        return movimentosPossiveis;
    }

    public override desenhar(ctx: CanvasRenderingContext2D) {

        // Todo

    }

}
    

