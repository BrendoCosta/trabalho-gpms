import { cloneDeep } from "lodash";
import { Quadrante, Posicao, Movimento } from "..";
import { MovimentosPossiveis } from "./movimentosPossiveis";
import { Peca } from "../pecas";
import { PosicaodoRei } from "./posicaodoRei";
import {  PegarQuadrante, SimularMovimento, TransformarPosicao } from "../funcoes";
import { Jogador } from "../enums";

export function ReiEmCheque(quadrantesOriginal: Quadrante[][], posicaoAtual: Posicao, posicaoAlvo: Posicao,movimento:Movimento, turno: Jogador): boolean {

   
    const quadrantes: Quadrante[][] = cloneDeep(quadrantesOriginal);
    const quadranteAtual = PegarQuadrante(quadrantes, posicaoAtual)
    const quadranteAlvo = PegarQuadrante(quadrantes, posicaoAlvo)
    const pecaAtual = quadranteAtual.getPeca()
    let posicaoDoReiAntes:Posicao;
    let posicaoDoRei:Posicao;
    let numero :number;
    let posicao :Posicao;

    let resultado = false;
    if (pecaAtual != null) {
        quadranteAlvo.setPeca(pecaAtual);
        quadranteAtual.removerPeca();
        posicaoDoReiAntes = PosicaodoRei(quadrantesOriginal, turno)
        posicaoDoRei = PosicaodoRei(quadrantes, turno)
       
        if(Math.abs(posicaoDoRei.coluna-posicaoDoReiAntes.coluna)==2){
            
            numero = (posicaoDoRei.coluna+posicaoDoReiAntes.coluna)/2
            posicao = TransformarPosicao(posicaoDoRei.linha,numero)
          
           
            resultado = resultado || ReiEmCheque(quadrantes,posicaoDoRei,posicao,movimento,turno)
            let quadrantesEsp =  SimularMovimento(quadrantes,posicaoDoRei,posicao,pecaAtual)
            resultado = resultado || ReiEmCheque(quadrantesEsp,posicao,posicaoAtual,movimento,turno)
        }
        
        for (let i = 0; i < quadrantes.length; i++) {
            for (let j = 0; j < quadrantes[i].length; j++) {
                posicao = TransformarPosicao(i, j);
                let quadrante = PegarQuadrante(quadrantes, posicao);
                let peca = quadrante.getPeca();
                
                if (peca instanceof Peca && peca.getjogador() != turno) {
                  
                    let movimentosPossiveis = MovimentosPossiveis(quadrantes, posicao,movimento,turno)
                    let numero = movimentosPossiveis.findIndex((posicaoPossivel) => {

                        return posicaoPossivel.linha == posicaoDoRei.linha && posicaoPossivel.coluna == posicaoDoRei.coluna;})
                    resultado = resultado ||(numero==-1?false:true);
                    



                }
            }
        }
    }
    
    return resultado;

}