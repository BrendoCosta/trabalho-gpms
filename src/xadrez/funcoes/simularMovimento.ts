import { cloneDeep } from "lodash";
import { Posicao, Quadrante } from "..";
import { Peca } from "../pecas";
import { PegarQuadrante } from ".";

export function SimularMovimento(quadrantesOriginal:Quadrante[][],posicaoAtual:Posicao,posicaoAlvo:Posicao,peca:Peca):Quadrante[][] {
    const quadrantes: Quadrante[][] = cloneDeep(quadrantesOriginal);
    const quadranteAtual = PegarQuadrante(quadrantes, posicaoAtual)
    const quadranteAlvo = PegarQuadrante(quadrantes, posicaoAlvo)
    quadranteAlvo.setPeca(peca);
    quadranteAtual.removerPeca();
    return quadrantes;
}