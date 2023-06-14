import {ReiEmCheque} from "."
import {Quadrante,Posicao,Movimento,Turno} from ".."

export function ValidarCheckPosicoes(posicoessemCheck:Posicao[],quadrantes:Quadrante[],pos:Posicao,ultimoMovimento:Movimento,turno:Turno): Posicao[] {
    let posicoes: Posicao[] = [];
    posicoessemCheck.forEach(posicao => {
        if (!ReiEmCheque(quadrantes, pos, posicao,ultimoMovimento, turno)) {
            posicoes.push(posicao);
        }
    })
    return posicoes;
  }
