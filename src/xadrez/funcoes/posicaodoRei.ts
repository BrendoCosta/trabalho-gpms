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
