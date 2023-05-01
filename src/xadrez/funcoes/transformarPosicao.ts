import { Posicao } from "..";

export function TransformarPosicao(linha:number,coluna:number):Posicao {
    return {linha: linha, coluna:coluna};  
}