import { cloneDeep} from "lodash";
import {  Movimento, Posicao, Quadrante  } from "..";
import { Peca, Rei } from "../pecas";
import { MovimentosPossiveis } from "./movimentosPossiveis";
import {TransformarPosicao, PegarQuadrante} from "../funcoes"
import { Jogador } from "../enums";

export function PosicaodoRei(quadrantes: Quadrante[][], turno: Jogador):Posicao {
    let posicao:Posicao=TransformarPosicao(8,8);
    for (let i = 0; i < quadrantes.length; i++) {
        for (let j = 0; j < quadrantes[i].length; j++) {
             posicao  =  TransformarPosicao(i, j);
            let quadrante = PegarQuadrante(quadrantes, posicao);
            let peca = quadrante.getPeca();
            if (peca != null && peca instanceof Rei && peca.getjogador() == turno) {
                return posicao;


            }

        };

    };
    return posicao;
    


}
export function ReiemCheque(quadrantesOriginal: Quadrante[][], posicaoAtual: Posicao, posicaoAlvo: Posicao, turno: Jogador,movimento:Movimento): boolean {

   
    const quadrantes: Quadrante[][] = cloneDeep(quadrantesOriginal);
    const quadranteAtual = PegarQuadrante(quadrantes, posicaoAtual)
    const quadranteAlvo = PegarQuadrante(quadrantes, posicaoAlvo)
    const pecaAtual = quadranteAtual.getPeca()
    let posicaoDoRei:Posicao;
    let resultado = false;
    if (pecaAtual != null) {
        quadranteAlvo.setPeca(pecaAtual);
        quadranteAtual.removerPeca();
        posicaoDoRei = PosicaodoRei(quadrantes, turno)
        for (let i = 0; i < quadrantes.length; i++) {
            for (let j = 0; j < quadrantes[i].length; j++) {
                let posicao = TransformarPosicao(i, j);
                let quadrante = PegarQuadrante(quadrantes, posicao);
                let peca = quadrante.getPeca();
                
                if (peca instanceof Peca && peca.getjogador() != turno) {
                    console.log(peca.constructor.name)
                    let movimentosPossiveis = MovimentosPossiveis(quadrantes, posicao,movimento,turno)
                    let numero = movimentosPossiveis.findIndex((posicaoPossivel) => {

                        return posicaoPossivel.linha == posicaoDoRei.linha && posicaoPossivel.coluna == posicaoDoRei.coluna;})
                    resultado = resultado ||(numero==-1?false:true);
                    console.log(numero)



                }
            }
        }
    }
    
    return resultado;

}
