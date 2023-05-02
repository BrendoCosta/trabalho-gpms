import { cloneDeep } from "lodash";
import { Posicao, Tabuleiro } from "..";
import { Jogador } from "../enums";
import { TransformarPosicao } from "../funcoes";

export function IaPensando(tabuleiro: Tabuleiro, grau: number, grauMax: number): [number, Posicao | null, Posicao | null] {
    let posPont: [number, Posicao | null, Posicao | null] = [0, null, null];
    let posPont2: [number, Posicao | null, Posicao | null] = [0, null, null];

    let posicoes: Posicao[];
    let click1: Posicao;
    const turno = tabuleiro.getTurno() == Jogador.COMPUTADOR ? 1 : -1;
    let tabuleiroCopia: Tabuleiro;
    let tabuleiroCopia2: Tabuleiro;
    let jogou = false;
    let pontuacao: number;
    if (grau != grauMax) {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                tabuleiroCopia = cloneDeep(tabuleiro);
                click1 = TransformarPosicao(i, j);
                tabuleiroCopia.click(click1);
                posicoes = tabuleiroCopia.getMovimentosPossiveis();
                if (posicoes.length != 0) {
                    posicoes.forEach(posicaoLoop => {
                        pontuacao = Math.random() * 0.001;
                        jogou = true;
                        tabuleiroCopia2 = cloneDeep(tabuleiroCopia);
                        tabuleiroCopia2.click(posicaoLoop);
                        let peca = tabuleiroCopia2.getUltimoMovimento().pecaCapturada;
                        if (peca != null) {
                            pontuacao = peca.getPontuacao() * turno;
                            console.log(peca);
                            console.log(pontuacao);
                        }
                        posPont2 = IaPensando(tabuleiroCopia2, grau + 1, grauMax);
                        pontuacao += posPont2[0];
                        console.log("teste");
                        if (posPont[0] == 0) {

                            posPont[0] = pontuacao;
                            posPont[1] = click1;
                            posPont[2] = posicaoLoop;
                        }
                        if (turno == 1) {
                            if (pontuacao > posPont[0]) {


                                posPont[0] = pontuacao;
                                posPont[1] = click1;
                                posPont[2] = posicaoLoop;
                            }
                        }
                        else {
                            if (pontuacao < posPont[0]) {


                                posPont[0] = pontuacao;
                                posPont[1] = click1;
                                posPont[2] = posicaoLoop;
                            }
                        }
                    });
                }
            }
        }
        if (!jogou) {

            posPont[0] = 9999 * turno;;
        }
    }
    else {
        posPont[0] = 0;
    }
    console.log(jogou);
    console.log(posPont[0]);
    console.log(posPont[1]);
    console.log(posPont[2]);
    console.log("grau é " + grau);
    return posPont;
}
