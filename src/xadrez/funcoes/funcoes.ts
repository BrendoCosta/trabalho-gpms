import { Posicao } from "..";

export function converterPosicao(posicao:[number,number]):Posicao {
  let posicaoC : Posicao = {linha:posicao[0], coluna:posicao[1]}
  return posicaoC;
}
