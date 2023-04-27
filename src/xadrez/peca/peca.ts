import { Cor } from "../enums";
export interface Peca {
  cor: Cor;





  possiveisMovimento(coluna: number, linha: number): [number, number][]
}