import { Quadrante, SituacaoQuadrante } from ".";
import { isEqual } from 'lodash'


export function ChecarMovimento(quadranteatk: Quadrante, quadranteAlvo: Quadrante): SituacaoQuadrante {
    let situacaoQuadrante: SituacaoQuadrante;
    let pecaAtk = quadranteatk.getPeca();
    let pecaAlvo = quadranteAlvo.getPeca()
    if (pecaAtk == null || pecaAlvo == null) {
        situacaoQuadrante = SituacaoQuadrante.VAZIO;
    } else {
        if (isEqual(pecaAtk.getjogador(), pecaAlvo.getjogador())) {
            situacaoQuadrante = SituacaoQuadrante.ALIADO;

        } else {
            situacaoQuadrante = SituacaoQuadrante.INIMIGO;
        }


    }
    console.log(situacaoQuadrante);

    return situacaoQuadrante;

}