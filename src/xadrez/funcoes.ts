import { Posicao } from ".";

export function verificarPosicao(posicao: Posicao): boolean {
    return posicao.linha >= 0 && posicao.linha <= 7 && posicao.coluna >= 0 && posicao.coluna <= 7;
  }
export function converterPosicao(posicao:[number,number]):Posicao {
  let posicaoC : Posicao = {linha:posicao[0], coluna:posicao[1]}
  return posicaoC;
}
