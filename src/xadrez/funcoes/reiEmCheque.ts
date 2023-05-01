import { cloneDeep } from "lodash";
import { Quadrante, Posicao } from "..";
import { MovimentosPossiveis } from "./movimentosPossiveis";
import { Peca } from "../pecas";
import { PosicaodoRei } from "./posicaodoRei";
import {  PegarQuadrante, TransformarPosicao } from "../funcoes";
import { Jogador } from "../enums";

export function ReiEmCheque(quadrantesOriginal: Quadrante[][], posicaoAtual: Posicao, posicaoAlvo: Posicao, turno: Jogador): Boolean {

   
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
                  
                    let movimentosPossiveis = MovimentosPossiveis(quadrantes, posicao)
                    let numero = movimentosPossiveis.findIndex((posicaoPossivel) => {

                        return posicaoPossivel.linha == posicaoDoRei.linha && posicaoPossivel.coluna == posicaoDoRei.coluna;})
                    resultado = resultado ||(numero==-1?false:true);
                    



                }
            }
        }
    }
    
    return resultado;

}