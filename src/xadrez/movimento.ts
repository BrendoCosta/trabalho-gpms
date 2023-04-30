import { Posicao } from ".";
import { Peca } from "./pecas";

export interface Movimento{
    posicaoAtual: Posicao;
    posicaoAnterior: Posicao;
    pecaMovimentada: Peca;
    pecaCapturada:Peca;
  }