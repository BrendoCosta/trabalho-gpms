import { Peca } from ".";
import { Cor, Jogador, Posicao, verificarPosicao } from "..";

export class Peao extends Peca {

    constructor(cor: Cor, jogador: Jogador){
        super(cor,jogador);
    }
    
    possiveisMovimento(posicao:Posicao): Posicao[] {
        const movimentosPossiveis: Posicao[]=[];
        const posicaoAtual = posicao;
        const direcao = this.jogador == Jogador.JOGADOR ? 1 : -1;
        const posicaoInicial = this.jogador == Jogador.JOGADOR ? 1 : 6;
        

        // varre as 3 possiveis movimentações do peão, comer pra esquerda andar 1 e comer pra direita
        for (let i = posicaoAtual.linha-1; i < posicaoAtual.coluna+1; i++) {
            let posicaoAlvo: Posicao = { linha:i, coluna: posicaoAtual.coluna+direcao };

            verificarPosicao( posicaoAlvo ) ? movimentosPossiveis.push(posicaoAlvo):null;
        }
        // varre a movimentação inicial de poder pular 2 casas 
        if(posicao.coluna == posicaoInicial){
           
            let posicaoAlvo = { linha:posicaoAtual.linha, coluna: posicaoAtual.coluna+2*direcao }; ;
            movimentosPossiveis.push(posicaoAlvo)

        }


        return movimentosPossiveis;
    }

    public override desenhar(ctx: CanvasRenderingContext2D) {

        // Todo

    }

}
    

