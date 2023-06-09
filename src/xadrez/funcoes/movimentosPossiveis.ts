import { VerificarPosicao, ChecarMovimento, PegarQuadrante, TransformarPosicao } from "../funcoes"
import { Movimento, Posicao, Quadrante } from "..";
import { Bispo, Cavalo, Peao, Peca, Rainha, Rei, Torre } from "../pecas";
import { Jogador, SituacaoQuadrante } from "../enums"
import { isEqual } from "lodash";



export function MovimentosPossiveis(quadrantes: Quadrante[][], posicaoPeca: Posicao, movimento: Movimento, turno: Jogador): Posicao[] {
    const peca = PegarQuadrante(quadrantes, TransformarPosicao(posicaoPeca.linha, posicaoPeca.coluna)).getPeca()
    let movimentosPossiveis: Posicao[] = [];

    if (peca == null) {
        return movimentosPossiveis;
    }

    if (peca instanceof Peao) { movimentosPossiveis = MovimentosPeao(peca, quadrantes, posicaoPeca, movimento, turno) }
    if (peca instanceof Torre) { movimentosPossiveis = MovimentosTorre(peca, quadrantes, posicaoPeca) }
    if (peca instanceof Bispo) { movimentosPossiveis = MovimentosBispo(peca, quadrantes, posicaoPeca) }
    if (peca instanceof Rainha) { movimentosPossiveis = MovimentosBispo(peca, quadrantes, posicaoPeca).concat(MovimentosTorre(peca, quadrantes, posicaoPeca)) }
    if (peca instanceof Cavalo) { movimentosPossiveis = MovimentosCavalo(peca, quadrantes, posicaoPeca) }
    if (peca instanceof Rei) { movimentosPossiveis = MovimentosRei(peca, quadrantes, posicaoPeca) }
    return movimentosPossiveis;



}
function MovimentosPeao(peca: Peca, quadrantes: Quadrante[][], posicaoPeca: Posicao, movimento: Movimento, turno: Jogador): Posicao[] {

    const movimentosPossiveis: Posicao[] = [];
    const posicaoAtual: Posicao = posicaoPeca;
    const direcao = peca.getjogador() == Jogador.JOGADOR ? -1 : 1;
    const posicaoInicial = peca.getjogador() == Jogador.JOGADOR ? 6 : 1;
    let posicaoAlvo: Posicao;
    let quadranteAlvo: Quadrante;
    let quadranteAtual: Quadrante;
    let checagem: SituacaoQuadrante;



    for (let i = (posicaoAtual.coluna - 1); i < (posicaoAtual.coluna + 2); i++) {
        posicaoAlvo = TransformarPosicao(posicaoAtual.linha + direcao, i)

        if (VerificarPosicao(posicaoAlvo)) {
            quadranteAlvo = PegarQuadrante(quadrantes, TransformarPosicao(posicaoAlvo.linha, posicaoAlvo.coluna))
            quadranteAtual = PegarQuadrante(quadrantes, TransformarPosicao(posicaoAtual.linha, posicaoAtual.coluna))
            checagem = ChecarMovimento(quadranteAlvo, quadranteAtual)


            if (posicaoAtual.coluna != i) {
                if (checagem == SituacaoQuadrante.INIMIGO) {
                    movimentosPossiveis.push(posicaoAlvo);
                }
                if (movimento !== undefined) {
                    let posicaoAbaixoAlvo = TransformarPosicao(posicaoAtual.linha, posicaoAlvo.coluna)
                    let quadranteAbaixoAlvo = PegarQuadrante(quadrantes, posicaoAbaixoAlvo)
                    let pecaAlvoAbaixo = quadranteAbaixoAlvo.getPeca()
                    let pecaMovimento = movimento.pecaMovimentada;
                    let numero1 = Math.abs(movimento.posicaoAtual.linha-movimento.posicaoAnterior.linha)
                    if (pecaAlvoAbaixo instanceof Peao &&
                        pecaMovimento instanceof Peao&&
                        pecaAlvoAbaixo == pecaMovimento&&
                        numero1==2)
                       
                        //Math.abs(movimento.posicaoAnterior.coluna-posicaoAlvo.coluna)==2)
                        {
                            

                            movimentosPossiveis.push(posicaoAlvo);


                    }

                }
            }
        
        else {
            if (checagem == SituacaoQuadrante.VAZIO) {
                movimentosPossiveis.push(posicaoAlvo);
               let posicao2 = TransformarPosicao(posicaoAlvo.linha + direcao, posicaoAlvo.coluna)
               if(VerificarPosicao(posicao2)){
                quadranteAlvo = PegarQuadrante(quadrantes,posicao2)
                checagem = ChecarMovimento(quadranteAlvo, quadranteAtual)
                if (checagem == SituacaoQuadrante.VAZIO && posicaoAtual.linha == posicaoInicial) {
                    posicaoAlvo = { linha: (posicaoAtual.linha + 2 * direcao), coluna: posicaoAtual.coluna }
                    movimentosPossiveis.push(posicaoAlvo);
                }
            }
            }
        }
    }


}


return movimentosPossiveis;
}
function MovimentosTorre(peca: Peca, quadrantes: Quadrante[][], posicaoPeca: Posicao): Posicao[] {
    const movimentosPossiveis: Posicao[] = [];
    const posicaoAtual: Posicao = posicaoPeca;
    let posicaoAlvo: Posicao;
    let quadranteAlvo: Quadrante;
    let quadranteAtual: Quadrante;
    let i = 0;
    let checagem;


    //if( VerificarPosicao(posicaoAlvo)){}

    do {
        i++

        posicaoAlvo = { linha: posicaoAtual.linha, coluna: posicaoAtual.coluna + i }
        if (VerificarPosicao(posicaoAlvo)) {
            quadranteAlvo = PegarQuadrante(quadrantes, posicaoAlvo)

            quadranteAtual = PegarQuadrante(quadrantes, posicaoAtual)
            checagem = ChecarMovimento(quadranteAlvo, quadranteAtual)
            if (checagem != SituacaoQuadrante.ALIADO) { movimentosPossiveis.push(posicaoAlvo) }
        } else { break; }
    } while (checagem == SituacaoQuadrante.VAZIO)
    i = 0;
    do {
        i++
        posicaoAlvo = { linha: posicaoAtual.linha + i, coluna: posicaoAtual.coluna }
        if (VerificarPosicao(posicaoAlvo)) {
            quadranteAlvo = PegarQuadrante(quadrantes, posicaoAlvo)

            quadranteAtual = PegarQuadrante(quadrantes, posicaoAtual)
            checagem = ChecarMovimento(quadranteAlvo, quadranteAtual)
            if (checagem != SituacaoQuadrante.ALIADO) { movimentosPossiveis.push(posicaoAlvo) }
        } else { break; }
    }
    while (checagem == SituacaoQuadrante.VAZIO)
    i = 0;

    do {
        i--
        posicaoAlvo = { linha: posicaoAtual.linha, coluna: posicaoAtual.coluna + i }
        if (VerificarPosicao(posicaoAlvo)) {
            quadranteAlvo = PegarQuadrante(quadrantes, posicaoAlvo)
            quadranteAtual = PegarQuadrante(quadrantes, posicaoAtual)
            checagem = ChecarMovimento(quadranteAlvo, quadranteAtual)
            if (checagem != SituacaoQuadrante.ALIADO) { movimentosPossiveis.push(posicaoAlvo) }
        } else { break; }
    }
    while (checagem == SituacaoQuadrante.VAZIO)
    i = 0;
    do {
        i--
        posicaoAlvo = { linha: posicaoAtual.linha + i, coluna: posicaoAtual.coluna }
        if (VerificarPosicao(posicaoAlvo)) {
            quadranteAlvo = PegarQuadrante(quadrantes, posicaoAlvo)
            quadranteAtual = PegarQuadrante(quadrantes, posicaoAtual)
            checagem = ChecarMovimento(quadranteAlvo, quadranteAtual)
            if (checagem != SituacaoQuadrante.ALIADO) { movimentosPossiveis.push(posicaoAlvo) }
        }
        else { break; }
    }
    while (checagem == SituacaoQuadrante.VAZIO)



    return movimentosPossiveis;
}

function MovimentosBispo(peca: Peca, quadrantes: Quadrante[][], posicaoPeca: Posicao): Posicao[] {
    const movimentosPossiveis: Posicao[] = [];
    const posicaoAtual: Posicao = posicaoPeca;
    let posicaoAlvo: Posicao;
    let quadranteAlvo: Quadrante;
    let quadranteAtual: Quadrante;
    let i = 0;
    let checagem;
    do {
        i++;
        posicaoAlvo = { linha: posicaoAtual.linha + i, coluna: posicaoAtual.coluna + i }
        if (VerificarPosicao(posicaoAlvo)) {

            quadranteAlvo = PegarQuadrante(quadrantes, posicaoAlvo)
            quadranteAtual = PegarQuadrante(quadrantes, posicaoAtual)
            checagem = ChecarMovimento(quadranteAlvo, quadranteAtual)
            if (checagem != SituacaoQuadrante.ALIADO) {
                movimentosPossiveis.push(posicaoAlvo)
            }

        } else { break; }
    } while (checagem == SituacaoQuadrante.VAZIO)
    i = 0
    do {
        i++;
        posicaoAlvo = { linha: posicaoAtual.linha - i, coluna: posicaoAtual.coluna - i }
        if (VerificarPosicao(posicaoAlvo)) {

            quadranteAlvo = PegarQuadrante(quadrantes, posicaoAlvo)
            quadranteAtual = PegarQuadrante(quadrantes, posicaoAtual)
            checagem = ChecarMovimento(quadranteAlvo, quadranteAtual)
            if (checagem != SituacaoQuadrante.ALIADO) {
                movimentosPossiveis.push(posicaoAlvo)
            }
        } else { break; }
    } while (checagem == SituacaoQuadrante.VAZIO)
    i = 0
    do {
        i++;
        posicaoAlvo = { linha: posicaoAtual.linha + i, coluna: posicaoAtual.coluna - i }
        if (VerificarPosicao(posicaoAlvo)) {

            quadranteAlvo = PegarQuadrante(quadrantes, posicaoAlvo)
            quadranteAtual = PegarQuadrante(quadrantes, posicaoAtual)
            checagem = ChecarMovimento(quadranteAlvo, quadranteAtual)

            if (checagem != SituacaoQuadrante.ALIADO) {
                movimentosPossiveis.push(posicaoAlvo)
            }
        } else { break; }
    } while (checagem == SituacaoQuadrante.VAZIO)
    i = 0
    do {
        i++;
        posicaoAlvo = { linha: posicaoAtual.linha - i, coluna: posicaoAtual.coluna + i }
        if (VerificarPosicao(posicaoAlvo)) {

            quadranteAlvo = PegarQuadrante(quadrantes, posicaoAlvo)
            quadranteAtual = PegarQuadrante(quadrantes, posicaoAtual)
            checagem = ChecarMovimento(quadranteAlvo, quadranteAtual)
            if (checagem != SituacaoQuadrante.ALIADO) {
                movimentosPossiveis.push(posicaoAlvo)
            }
        } else { break; }
    } while (checagem == SituacaoQuadrante.VAZIO)


    return movimentosPossiveis;
}
function MovimentosCavalo(peca: Peca, quadrantes: Quadrante[][], posicaoPeca: Posicao): Posicao[] {
    const movimentosPossiveis: Posicao[] = [];
    const posicaoAtual: Posicao = posicaoPeca;
    const quadranteAtual = PegarQuadrante(quadrantes, posicaoAtual)
    let quadranteAlvo: Quadrante;
    let posicaoAlvo: Posicao;


    for (let i = -2; i < 3; i++) {
        for (let j = -2; j < 3; j++) {
            if (Math.abs(i) != Math.abs(j) && [1, 2].includes(Math.abs(i)) && [1, 2].includes(Math.abs(j))) {
                posicaoAlvo = { linha: posicaoAtual.linha + i, coluna: posicaoAtual.coluna + j }

                if (VerificarPosicao(posicaoAlvo)) {
                    quadranteAlvo = PegarQuadrante(quadrantes, posicaoAlvo)
                    if (ChecarMovimento(quadranteAlvo, quadranteAtual) != SituacaoQuadrante.ALIADO) movimentosPossiveis.push(posicaoAlvo)
                }

            }
        }
    }


    return movimentosPossiveis;
}

function MovimentosRei(peca: Peca, quadrantes: Quadrante[][], posicaoPeca: Posicao): Posicao[] {
    const movimentosPossiveis: Posicao[] = [];
    const posicaoAtual: Posicao = posicaoPeca;
    const quadranteAtual = PegarQuadrante(quadrantes, posicaoAtual)
    let posicaoAlvo: Posicao;
    let quadranteAlvo: Quadrante;

    for (let i = -1; i < 2; i++) {

        for (let j = -1; j < 2; j++) {

            if (!(i == 0 && j == 0)) {

                posicaoAlvo = { linha: posicaoAtual.linha + i, coluna: posicaoAtual.coluna + j }

                if (VerificarPosicao(posicaoAlvo)) {

                    quadranteAlvo = PegarQuadrante(quadrantes, posicaoAlvo)
                    if (ChecarMovimento(quadranteAlvo, quadranteAtual) != SituacaoQuadrante.ALIADO) {
                        movimentosPossiveis.push(posicaoAlvo)
                        if ((!peca.getMovido()) && i == 0) {
                            let z = j;
                            let pecaRock;
                            let n = z > 0 ? 1 : -1;
                            do {
                                z += n
                                posicaoAlvo = { linha: posicaoAlvo.linha, coluna: posicaoAtual.coluna + z }
                                if (VerificarPosicao(posicaoAlvo)) {
                                    pecaRock = PegarQuadrante(quadrantes, TransformarPosicao(posicaoAtual.linha, posicaoAtual.coluna + z)).getPeca();
                                    if (pecaRock instanceof Torre && !pecaRock.getMovido()) {
                                        posicaoAlvo = { linha: posicaoAtual.linha, coluna: posicaoAtual.coluna + 2 * n }
                                        movimentosPossiveis.push(posicaoAlvo)
                                        break;

                                    }

                                }

                            } while (pecaRock == null && VerificarPosicao(posicaoAlvo))


                        }
                    }
                }

            }
        }
    }


    return movimentosPossiveis;
}




