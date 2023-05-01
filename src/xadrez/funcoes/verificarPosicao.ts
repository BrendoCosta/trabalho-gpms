import { Posicao } from "..";


export function VerificarPosicao(posicao: Posicao): boolean {
  return posicao.linha >= 0 && posicao.linha <= 7 && posicao.coluna >= 0 && posicao.coluna <= 7;
}
