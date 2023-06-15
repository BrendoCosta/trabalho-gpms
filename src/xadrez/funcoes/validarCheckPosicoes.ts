import {ReiEmCheque} from "."
import {Quadrante,Posicao,Movimento} from ".."
import {Jogador} from "../enums"

export function ValidarCheckPosicoes(posicoessemCheck:Posicao[],quadrantes:Quadrante[][],pos:Posicao,ultimoMovimento:Movimento,turno:Jogador): Posicao[] {
    let posicoes: Posicao[] = [];
    posicoessemCheck.forEach(posicao => {
        if (!ReiEmCheque(quadrantes, pos, posicao,ultimoMovimento, turno)) {
            posicoes.push(posicao);
        }
    })
    return posicoes;
  }
